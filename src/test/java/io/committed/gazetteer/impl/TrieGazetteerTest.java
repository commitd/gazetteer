package io.committed.gazetteer.impl;


import static org.junit.jupiter.api.Assertions.assertEquals;
import java.util.List;
import org.ahocorasick.trie.Trie;
import org.junit.jupiter.api.Test;
import io.committed.gazetteer.model.KeywordMention;
import io.committed.gazetteer.model.Gazetteer;

class TrieGazetteerTest {

  @Test
  void testEmpty() {
    Gazetteer gazetteer = new TrieGazetteer("type", Trie.builder().build());
    List<KeywordMention> entityMentions = gazetteer.find("Test test test testing 12");
    assertEquals(0, entityMentions.size());
  }

  @Test
  void testKeyword() {
    Gazetteer gazetteer = new TrieGazetteer("type", Trie.builder().addKeyword("test").build());
    List<KeywordMention> entityMentions = gazetteer.find("Test test test testing 12");
    assertEquals(3, entityMentions.size());
  }

  @Test
  void testCase() {
    Gazetteer gazetteer =
        new TrieGazetteer("type", Trie.builder().addKeyword("test").ignoreCase().build());
    List<KeywordMention> entityMentions = gazetteer.find("Test test test testing 12");
    assertEquals(4, entityMentions.size());
    assertEquals(0, entityMentions.get(0).getOffset());
    assertEquals(4, entityMentions.get(0).getLength());
    assertEquals(5, entityMentions.get(1).getOffset());
    assertEquals(4, entityMentions.get(1).getLength());
  }

  @Test
  void testWhole() {
    Gazetteer gazetteer =
        new TrieGazetteer("type", Trie.builder().addKeyword("test").onlyWholeWords().build());
    List<KeywordMention> entityMentions = gazetteer.find("Test test test testing 12");
    assertEquals(2, entityMentions.size());
    assertEquals(5, entityMentions.get(0).getOffset());
    assertEquals(4, entityMentions.get(0).getLength());
    assertEquals(10, entityMentions.get(1).getOffset());
    assertEquals(4, entityMentions.get(1).getLength());
  }

  @Test
  void testContained() {
    Gazetteer gazetteer = new TrieGazetteer("type", Trie.builder().addKeyword("test").build());
    List<KeywordMention> entityMentions = gazetteer.find("Testingtesttesting 12");
    assertEquals(2, entityMentions.size());
  }
}
