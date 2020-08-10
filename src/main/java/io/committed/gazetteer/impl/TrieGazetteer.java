package io.committed.gazetteer.impl;

import io.committed.gazetteer.model.Gazetteer;
import io.committed.gazetteer.model.KeywordMention;
import io.committed.gazetteer.model.Type;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import org.ahocorasick.trie.Trie;

public class TrieGazetteer implements Gazetteer {

  private final Type type;
  private final Trie trie;

  public TrieGazetteer(Type type, Collection<String> keywords) {
    this(type, type.trieBuilder().addKeywords(keywords).build());
  }

  public TrieGazetteer(Type type, Trie trie) {
    this.type = type;
    this.trie = trie;
  }

  @Override
  public List<KeywordMention> find(String text) {
    return trie.parseText(text).stream()
        .map(e -> new EmitKeywordMention(e, type.getId(), type.getValue()))
        .collect(Collectors.toList());
  }
}
