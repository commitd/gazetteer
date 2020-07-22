package io.committed.gazetteer;

import static java.util.stream.Collectors.toList;
import static java.util.stream.Collectors.toMap;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.google.common.collect.ImmutableMap;
import com.google.common.collect.Streams;
import io.committed.gazetteer.dto.Match;
import io.committed.gazetteer.model.Keyword;
import io.committed.gazetteer.model.KeywordId;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v1")
public class GazetteerController {

  private final GazetteerService service;

  private final GazetteerRepository repository;

  public GazetteerController(GazetteerService service, GazetteerRepository repository) {
    this.service = service;
    this.repository = repository;
  }

  @PostConstruct
  public void initialize() {
    updateGazetteer();
  }

  @GetMapping(value = "/types")
  @Operation(description = "Get all the types for which there are keywords")
  @ApiResponse(responseCode = "200", description = "Successful")
  public List<String> getTypes() {
    return repository.getTypes();
  }

  @GetMapping(value = "/keywords/{type}")
  @Operation(description = "Get all the keywords for the given type")
  @ApiResponse(responseCode = "200", description = "Successful")
  public Map<String, Integer> getByType(@PathVariable String type) {
    return repository.findByType(type.toUpperCase(), Sort.by("value").ascending()).stream()
        .collect(toMap(Keyword::getValue, Keyword::getCount));
  }

  @PostMapping(value = "/keywords/{type}", consumes = MediaType.APPLICATION_JSON_VALUE)
  @Operation(description = "Add the given keywords associated with the given type")
  @ApiResponse(responseCode = "200", description = "Successful")
  public void add(@PathVariable String type, @RequestBody List<String> values) {
    repository.saveAll(values.stream().map(v -> new KeywordId(type, v))
        .filter(id -> !repository.existsById(id.toString())).map(id -> new Keyword(id, 0))
        .collect(Collectors.toList()));
    updateGazetteer();
  }

  // not sure why transactional is required here, but not elsewhere
  @Transactional
  @DeleteMapping(value = "/keywords/{type}")
  @Operation(description = "Delete all keywords for the given type")
  @ApiResponse(responseCode = "200", description = "Successful")
  public void deleteByType(@PathVariable String type) {
    repository.deleteByType(type.toUpperCase());
    updateGazetteer();
  }

  @DeleteMapping(value = "/keywords/{type}", consumes = MediaType.APPLICATION_JSON_VALUE)
  @Operation(description = "Delete the given keywords for the given type")
  @ApiResponse(responseCode = "200", description = "Successful")
  public void delete(@PathVariable String type, @RequestBody List<String> values) {
    List<String> ids = values.stream().map(v -> new Keyword(type, v).getId()).collect(toList());
    repository.deleteAll(repository.findAllById(ids));
    updateGazetteer();
  }

  @PostMapping("/gazetteer")
  @Operation(description = "Find the keywords in the given text")
  @ApiResponse(responseCode = "200", description = "Successful")
  public List<Match> find(@RequestBody String text) {
    return service.findInText(text).stream().map(Match::new).collect(toList());
  }

  public void updateGazetteer() {
    Map<String, Set<String>> gazetteers = Streams.stream(repository.findAll()).collect(Collectors
        .groupingBy(Keyword::getType, Collectors.mapping(Keyword::getValue, Collectors.toSet())));
    service.updateGazetteers(ImmutableMap.copyOf(gazetteers));
    log.info("Gazetteers updated types:{}, values:{}", gazetteers.size(),
        gazetteers.values().stream().flatMap(Collection::stream).count());
  }
}
