package io.committed.gazetteer.impl;

import com.google.common.collect.ImmutableList;
import io.committed.gazetteer.model.Gazetteer;
import io.committed.gazetteer.model.KeywordMention;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class DelegatingGazetteer implements Gazetteer {

  public final List<Gazetteer> delegates;

  public DelegatingGazetteer(Collection<Gazetteer> gazetteers) {
    delegates = ImmutableList.copyOf(gazetteers);
  }

  @Override
  public List<KeywordMention> find(String text) {
    return delegates.stream().flatMap(d -> d.find(text).stream()).collect(Collectors.toList());
  }
}
