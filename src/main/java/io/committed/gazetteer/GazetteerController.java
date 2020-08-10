package io.committed.gazetteer;

import static io.committed.gazetteer.exception.NotFoundException.notFound;
import static java.util.stream.Collectors.toList;
import static java.util.stream.Collectors.toMap;
import static java.util.stream.Collectors.toSet;

import com.google.common.collect.Streams;
import io.committed.gazetteer.dto.Match;
import io.committed.gazetteer.dto.TypeConfig;
import io.committed.gazetteer.exception.NotFoundException;
import io.committed.gazetteer.model.Keyword;
import io.committed.gazetteer.model.KeywordId;
import io.committed.gazetteer.model.Type;
import io.committed.gazetteer.repositories.KeywordRepository;
import io.committed.gazetteer.repositories.TypeRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/v1")
public class GazetteerController {

  private final GazetteerService service;

  private final TypeRepository typeRepository;

  private final KeywordRepository keywordRepository;

  public GazetteerController(
      GazetteerService service,
      TypeRepository typeRepository,
      KeywordRepository keywordRepository) {
    this.service = service;
    this.typeRepository = typeRepository;
    this.keywordRepository = keywordRepository;
  }

  @PostConstruct
  public void initialize() {
    updateGazetteer();
  }

  @GetMapping(value = "/types")
  @Operation(description = "Get all the types for which there are keywords")
  @ApiResponse(responseCode = "200", description = "Successful")
  public Iterable<Type> getTypes() {
    return typeRepository.findAll();
  }

  @PostMapping(value = "/types", consumes = MediaType.APPLICATION_JSON_VALUE)
  @Operation(description = "Create the type with given configuration")
  @ApiResponse(responseCode = "200", description = "Successful")
  public String createType(@RequestBody TypeConfig typeConfig) {
    Type created = typeRepository.save(typeConfig.create());
    updateGazetteer();
    return created.getId();
  }

  @GetMapping(value = "/types/{typeId}")
  @Operation(description = "Get the type with the given id")
  @ApiResponse(responseCode = "200", description = "Successful")
  @ApiResponse(responseCode = "404", description = "Type not found")
  public Type getType(@PathVariable String typeId) throws Exception {
    return typeRepository.findById(typeId).orElseThrow(notFound("Type not found"));
  }

  @PutMapping(value = "/types/{typeId}", consumes = MediaType.APPLICATION_JSON_VALUE)
  @Operation(description = "Create the type with given configuration")
  @ApiResponse(responseCode = "200", description = "Successful")
  @ApiResponse(responseCode = "404", description = "Type not found")
  public void updateType(@PathVariable String typeId, @RequestBody TypeConfig typeConfig)
      throws Exception {
    Type type = getType(typeId);
    typeConfig.apply(type);
    typeRepository.save(type);
    updateGazetteer();
  }

  @Transactional
  @DeleteMapping(value = "/types/{typeId}")
  @Operation(description = "Delete the type, and all keywords for the given typeId")
  @ApiResponse(responseCode = "200", description = "Successful")
  public void deleteType(@PathVariable String typeId) {
    keywordRepository.deleteByTypeId(typeId);
    typeRepository.deleteById(typeId);
    updateGazetteer();
  }

  @GetMapping(value = "/types/{typeId}/keywords")
  @Operation(description = "Get all the keywords for the given type")
  @ApiResponse(responseCode = "200", description = "Successful")
  public Map<String, Integer> getKeywords(@PathVariable String typeId) {
    return keywordRepository.findByTypeId(typeId, Sort.by("value").ascending()).stream()
        .collect(toMap(Keyword::getValue, Keyword::getCount));
  }

  @PostMapping(value = "/types/{typeId}/keywords", consumes = MediaType.APPLICATION_JSON_VALUE)
  @Operation(description = "Add the given keywords associated with the given type")
  @ApiResponse(responseCode = "200", description = "Successful")
  public void addKeywords(@PathVariable String typeId, @RequestBody List<String> values) {
    if (!typeRepository.existsById(typeId)) {
      throw new NotFoundException(String.format("Type id %s not found", typeId));
    }
    keywordRepository.saveAll(
        values.stream()
            .map(v -> new KeywordId(typeId, v))
            .filter(id -> !keywordRepository.existsById(id.toString()))
            .map(id -> new Keyword(id, 0))
            .collect(Collectors.toList()));
    updateGazetteer();
  }

  @DeleteMapping(value = "/types/{typeId}/keywords", consumes = MediaType.APPLICATION_JSON_VALUE)
  @Operation(description = "Delete the given keywords for the given type")
  @ApiResponse(responseCode = "200", description = "Successful")
  public void deleteKeywords(@PathVariable String typeId, @RequestBody List<String> values) {
    List<String> ids = values.stream().map(v -> new Keyword(typeId, v).getId()).collect(toList());
    keywordRepository.deleteAll(keywordRepository.findAllById(ids));
    updateGazetteer();
  }

  @PostMapping("/gazetteer")
  @Operation(description = "Find the keywords in the given text")
  @ApiResponse(responseCode = "200", description = "Successful")
  public List<Match> find(@RequestBody String text) {
    return service.findInText(text).stream().map(Match::new).collect(toList());
  }

  public void updateGazetteer() {
    Map<Type, Collection<String>> gazetteers =
        Streams.stream(typeRepository.findAll())
            .collect(
                Collectors.toMap(
                    Function.identity(),
                    type ->
                        keywordRepository.findByTypeId(type.getId(), Sort.unsorted()).stream()
                            .map(Keyword::getValue)
                            .collect(toSet())));
    service.updateGazetteers(gazetteers);
    log.info(
        "Gazetteers updated types:{}, values:{}",
        gazetteers.size(),
        gazetteers.values().stream().flatMap(Collection::stream).count());
  }
}
