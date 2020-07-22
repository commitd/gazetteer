package io.committed.gazetteer;

import static java.util.stream.Collectors.toList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.stereotype.Service;
import io.committed.gazetteer.model.Gazetteer;
import io.committed.gazetteer.model.GazetteerFactory;
import io.committed.gazetteer.model.Keyword;
import io.committed.gazetteer.model.KeywordId;
import io.committed.gazetteer.model.KeywordMention;

@Service
public class GazetteerService {

  private final GazetteerRepository repository;

  private final GazetteerFactory factory;

  private Gazetteer gazetteer;


  public GazetteerService(GazetteerRepository repository, GazetteerFactory factory) {
    this.repository = repository;
    this.factory = factory;
  }

  protected synchronized void updateGazetteers(Map<String, Collection<String>> gazetteers) {
    gazetteer = factory.create(gazetteers);
  }

  @Transactional
  public List<KeywordMention> findInText(String text) {
    List<KeywordMention> found = gazetteer.find(text);

    Map<KeywordId, Optional<Keyword>> record = new HashMap<>();

    for (KeywordMention mention : found) {
      Optional<Keyword> keyword =
          record.computeIfAbsent(mention.getKeywordId(), id -> repository.findById(id.toString()));
      keyword.ifPresent(Keyword::found);
    }

    repository.saveAll(record.values().stream().flatMap(Optional::stream).collect(toList()));

    return found;
  }

}
