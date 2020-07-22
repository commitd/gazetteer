package io.committed.gazetteer.impl;

import static java.util.stream.Collectors.toList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import io.committed.gazetteer.model.Gazetteer;
import io.committed.gazetteer.model.GazetteerFactory;

@Service
public class TrieGazetteerFactory implements GazetteerFactory {

  @Override
  public Gazetteer create(Map<String, Collection<String>> values) {
    List<Gazetteer> gazetteers = values.entrySet().stream()
        .map(e -> new TrieGazetteer(e.getKey(), e.getValue())).collect(toList());
    return new DelegatingGazetteer(gazetteers);
  }
}
