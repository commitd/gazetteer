package io.committed.gazetteer;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import io.committed.gazetteer.dto.Backup;
import io.committed.gazetteer.model.Keyword;
import io.committed.gazetteer.model.Type;
import io.committed.gazetteer.repositories.KeywordRepository;
import io.committed.gazetteer.repositories.TypeRepository;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.SQLException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BackupControllerTest {

  private static final String OTHER = "Other";

  private static final String TEST = "TEST";

  @Autowired private TypeRepository typeRepository;
  @Autowired private KeywordRepository keywordRepository;
  @Autowired private BackupController controller;

  @BeforeEach
  void setup() {
    typeRepository.deleteAll();
    keywordRepository.deleteAll();
  }

  @Test
  void canCreateBackup(@TempDir Path tempDir) throws SQLException {
    String testId = typeRepository.save(new Type(TEST)).getId();
    String otherId = typeRepository.save(new Type(OTHER)).getId();
    keywordRepository.save(new Keyword(testId, "test0"));
    keywordRepository.save(new Keyword(testId, "test1"));
    keywordRepository.save(new Keyword(testId, "test2"));
    keywordRepository.save(new Keyword(otherId, "test2"));
    keywordRepository.save(new Keyword(otherId, "test3"));

    Path backupPath = tempDir.resolve("backup.sql");
    controller.createBackup(Backup.builder().file(backupPath.toString()).build());
    assertTrue(Files.exists(backupPath), "File should exist");
  }

  @Test
  void canRestoreBackup() throws SQLException {
    Path backupPath = Path.of("src", "test", "resources", "backup.sql");
    controller.restoreBackup(Backup.builder().file(backupPath.toAbsolutePath().toString()).build());
    assertAll(
        () -> assertEquals(2, typeRepository.count()),
        () -> assertEquals(5, keywordRepository.count()));
  }
}
