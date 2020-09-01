package io.committed.gazetteer;

import io.committed.gazetteer.dto.Match;
import io.committed.gazetteer.dto.TypeConfig;
import io.committed.gazetteer.model.Type;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import java.util.List;
import java.util.Map;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class GazetteerController {

  private final TypeService service;

  public GazetteerController(TypeService service) {
    this.service = service;
  }

  @GetMapping(value = "/types")
  @Operation(description = "Get all the types for which there are keywords")
  @ApiResponse(responseCode = "200", description = "Successful")
  public Iterable<Type> getTypes() {
    return service.getTypes();
  }

  @PostMapping(value = "/types", consumes = MediaType.APPLICATION_JSON_VALUE)
  @Operation(description = "Create the type with given configuration")
  @ApiResponse(responseCode = "200", description = "Successful")
  public String createType(@RequestBody TypeConfig typeConfig) {
    return service.createType(typeConfig);
  }

  @GetMapping(value = "/types/{typeId}")
  @Operation(description = "Get the type with the given id")
  @ApiResponse(responseCode = "200", description = "Successful")
  @ApiResponse(responseCode = "404", description = "Type not found")
  public Type getType(@PathVariable String typeId) throws Exception {
    return service.getType(typeId);
  }

  @PutMapping(value = "/types/{typeId}", consumes = MediaType.APPLICATION_JSON_VALUE)
  @Operation(description = "Create the type with given configuration")
  @ApiResponse(responseCode = "200", description = "Successful")
  @ApiResponse(responseCode = "404", description = "Type not found")
  public void updateType(@PathVariable String typeId, @RequestBody TypeConfig typeConfig)
      throws Exception {
    service.updateType(typeId, typeConfig);
  }

  @DeleteMapping(value = "/types/{typeId}")
  @Operation(description = "Delete the type, and all keywords for the given typeId")
  @ApiResponse(responseCode = "200", description = "Successful")
  public void deleteType(@PathVariable String typeId) {
    service.deleteType(typeId);
  }

  @GetMapping(value = "/types/{typeId}/keywords")
  @Operation(description = "Get all the keywords for the given type")
  @ApiResponse(responseCode = "200", description = "Successful")
  public Map<String, Integer> getKeywords(@PathVariable String typeId) {
    return service.getKeywords(typeId);
  }

  @PostMapping(value = "/types/{typeId}/keywords", consumes = MediaType.APPLICATION_JSON_VALUE)
  @Operation(description = "Add the given keywords associated with the given type")
  @ApiResponse(responseCode = "200", description = "Successful")
  public void addKeywords(@PathVariable String typeId, @RequestBody List<String> values) {
    service.addKeywords(typeId, values);
  }

  @DeleteMapping(value = "/types/{typeId}/keywords", consumes = MediaType.APPLICATION_JSON_VALUE)
  @Operation(description = "Delete the given keywords for the given type")
  @ApiResponse(responseCode = "200", description = "Successful")
  public void deleteKeywords(@PathVariable String typeId, @RequestBody List<String> values) {
    service.deleteKeywords(typeId, values);
  }

  @PostMapping("/gazetteer")
  @Operation(description = "Find the keywords in the given text")
  @ApiResponse(responseCode = "200", description = "Successful")
  public List<Match> find(@RequestBody String text) {
    return service.find(text);
  }
}
