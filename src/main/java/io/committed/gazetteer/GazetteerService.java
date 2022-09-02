package io.committed.gazetteer;

import static java.util.stream.Collectors.toList;

import io.committed.gazetteer.model.Gazetteer;
import io.committed.gazetteer.model.GazetteerFactory;
import io.committed.gazetteer.model.Keyword;
import io.committed.gazetteer.model.KeywordId;
import io.committed.gazetteer.model.KeywordMention;
import io.committed.gazetteer.model.Type;
import io.committed.gazetteer.repositories.KeywordRepository;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class GazetteerService {

  private final KeywordRepository repository;

  private final GazetteerFactory factory;

  private Gazetteer gazetteer;

  public GazetteerService(KeywordRepository repository, GazetteerFactory factory) {
    this.repository = repository;
    this.factory = factory;
  }

  protected synchronized void updateGazetteers(Map<Type, Collection<String>> gazetteers) {
    gazetteer = factory.create(gazetteers);
  }

  @Transactional
  public List<KeywordMention> findInText(String text) {
    List<KeywordMention> found = gazetteer.find(text);

    Map<KeywordId, Optional<Keyword>> recordMap = new HashMap<>();

    for (KeywordMention mention : found) {
      Optional<Keyword> keyword =
          recordMap.computeIfAbsent(
              mention.getKeywordId(), id -> repository.findById(id.toString()));
      keyword.ifPresent(Keyword::found);
    }

    repository.saveAll(recordMap.values().stream().flatMap(Optional::stream).collect(toList()));

    return found;
  }
}
