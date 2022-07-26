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
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class TypeService {

  private final GazetteerService service;

  private final TypeRepository typeRepository;

  private final KeywordRepository keywordRepository;

  public TypeService(
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

  public Iterable<Type> getTypes() {
    return typeRepository.findAll();
  }

  public String createType(TypeConfig typeConfig) {
    Type created = typeRepository.save(typeConfig.create());
    updateGazetteer();
    return created.getId();
  }

  public Type getType(String typeId) throws Exception {
    return typeRepository.findById(typeId).orElseThrow(notFound("Type not found"));
  }

  public void updateType(String typeId, TypeConfig typeConfig) throws Exception {
    Type type = getType(typeId);
    typeConfig.apply(type);
    typeRepository.save(type);
    updateGazetteer();
  }

  @Transactional
  public void deleteType(String typeId) {
    keywordRepository.deleteByTypeId(typeId);
    typeRepository.deleteById(typeId);
    updateGazetteer();
  }

  public Map<String, Integer> getKeywords(String typeId) {
    return keywordRepository.findByTypeId(typeId, Sort.by("value").ascending()).stream()
        .collect(toMap(Keyword::getValue, Keyword::getCount));
  }

  public void addKeywords(String typeId, List<String> values) {
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

  public void deleteKeywords(String typeId, List<String> values) {
    List<String> ids = values.stream().map(v -> new Keyword(typeId, v).getId()).collect(toList());
    keywordRepository.deleteAll(keywordRepository.findAllById(ids));
    updateGazetteer();
  }

  public List<Match> find(String text) {
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
