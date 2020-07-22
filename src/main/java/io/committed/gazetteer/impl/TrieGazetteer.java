package io.committed.gazetteer.impl;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.ahocorasick.trie.Trie;
import io.committed.gazetteer.model.KeywordMention;
import io.committed.gazetteer.model.Gazetteer;

public class TrieGazetteer implements Gazetteer {

  private final String type;
  private final Trie trie;

  public TrieGazetteer(String type, Collection<String> keywords) {
    this(type, Trie.builder().addKeywords(keywords).onlyWholeWords().build());
  }

  public TrieGazetteer(String type, Trie trie) {
    this.type = type;
    this.trie = trie;
  }

  @Override
  public List<KeywordMention> find(String text) {
    return trie.parseText(text)
        .stream()
        .map(e -> new EmitKeywordMention(e, type))
        .collect(Collectors.toList());
  }
}
