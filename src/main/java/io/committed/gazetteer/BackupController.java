package io.committed.gazetteer;

import io.committed.gazetteer.dto.Backup;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import javax.sql.DataSource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/v1/admin")
public class BackupController {

  private final JdbcTemplate template;

  @Value("${gazetter.backup.timeout:300}")
  private int timeout;

  public BackupController(JdbcTemplate template) {
    this.template = template;
  }

  @PostMapping(value = "/backup")
  @Operation(description = "Write a backup file")
  @ApiResponse(responseCode = "200", description = "Successful")
  public void createBackup(@RequestBody Backup backup) throws SQLException {
    log.info("Creating backup {}", backup.getFile());
    try (PreparedStatement statement = getConnection().prepareStatement("SCRIPT TO ?")) {
      statement.setQueryTimeout(timeout);
      statement.setString(1, backup.getFile());
      statement.execute();
    }
  }

  @PostMapping(value = "/restore")
  @Operation(description = "Restore from backup file")
  @ApiResponse(responseCode = "200", description = "Successful")
  public void restoreBackup(@RequestBody Backup backup) throws SQLException {
    log.info("Restoring from backup {}", backup.getFile());
    Connection connection = getConnection();
    try (PreparedStatement preparedStatement = connection.prepareStatement("DROP ALL OBJECTS;")) {
      preparedStatement.executeUpdate();
      try (PreparedStatement statement = connection.prepareStatement("RUNSCRIPT FROM ?")) {
        statement.setQueryTimeout(timeout);
        statement.setString(1, backup.getFile());
        statement.execute();
      }
    }
  }

  private Connection getConnection() throws SQLException {
    DataSource dataSource = template.getDataSource();
    if (dataSource == null) {
      throw new SQLException("Cannot connect to database.");
    }
    return dataSource.getConnection();
  }
}
