package io.committed.gazetteer.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.google.common.collect.ImmutableList;
import io.committed.gazetteer.dto.TypeConfig;
import io.committed.gazetteer.model.Gazetteer;
import io.committed.gazetteer.model.KeywordMention;
import io.committed.gazetteer.model.Type;
import java.util.List;
import org.junit.jupiter.api.Test;

class TrieGazetteerTest {

  private static String TEST_MATCH = "Test test TEST testtest testing pretest 12";

  @Test
  void testEmpty() {
    Gazetteer gazetteer = new TrieGazetteer(new Type("type"), ImmutableList.of());
    List<KeywordMention> entityMentions = gazetteer.find(TEST_MATCH);
    assertEquals(0, entityMentions.size());
  }

  @Test
  void testKeyword() {
    Gazetteer gazetteer = new TrieGazetteer(new Type("type"), ImmutableList.of("test"));
    List<KeywordMention> entityMentions = gazetteer.find(TEST_MATCH);
    assertEquals(1, entityMentions.size());
  }

  @Test
  void testCase() {
    Gazetteer gazetteer =
        new TrieGazetteer(
            TypeConfig.builder().value("type").ignoreCase(true).build().create(),
            ImmutableList.of("test"));
    List<KeywordMention> entityMentions = gazetteer.find(TEST_MATCH);
    assertEquals(3, entityMentions.size());
    assertEquals(0, entityMentions.get(0).getOffset());
    assertEquals(4, entityMentions.get(0).getLength());
    assertEquals(5, entityMentions.get(1).getOffset());
    assertEquals(4, entityMentions.get(1).getLength());
  }

  @Test
  void testWhole() {
    Gazetteer gazetteer =
        new TrieGazetteer(
            TypeConfig.builder().value("type").onlyWholeWords(false).build().create(),
            ImmutableList.of("test"));
    List<KeywordMention> entityMentions = gazetteer.find(TEST_MATCH);
    assertEquals(5, entityMentions.size());
    assertEquals(5, entityMentions.get(0).getOffset());
    assertEquals(4, entityMentions.get(0).getLength());
    assertEquals(15, entityMentions.get(1).getOffset());
    assertEquals(4, entityMentions.get(1).getLength());
  }

  @Test
  void testWholeWhiteSpaceSeparated() {
    Gazetteer gazetteer =
        new TrieGazetteer(
            TypeConfig.builder()
                .value("type")
                .onlyWholeWordsWhiteSpaceSeparated(true)
                .build()
                .create(),
            ImmutableList.of("test"));
    List<KeywordMention> entityMentions = gazetteer.find(TEST_MATCH);
    assertEquals(1, entityMentions.size());
    assertEquals(5, entityMentions.get(0).getOffset());
    assertEquals(4, entityMentions.get(0).getLength());
  }

  @Test
  void testIngoreOverlap() {
    Gazetteer gazetteer =
        new TrieGazetteer(
            TypeConfig.builder().value("type").ignoreOverlaps(true).build().create(),
            ImmutableList.of("test", "testing"));
    List<KeywordMention> entityMentions = gazetteer.find(TEST_MATCH);
    assertEquals(2, entityMentions.size());
    assertEquals(5, entityMentions.get(0).getOffset());
    assertEquals(4, entityMentions.get(0).getLength());
    assertEquals(24, entityMentions.get(1).getOffset());
    assertEquals(7, entityMentions.get(1).getLength());
  }

  @Test
  void testOverlap() {
    Gazetteer gazetteer =
        new TrieGazetteer(
            TypeConfig.builder().value("type").ignoreOverlaps(false).build().create(),
            ImmutableList.of("test", "testing"));
    List<KeywordMention> entityMentions = gazetteer.find(TEST_MATCH);
    assertEquals(2, entityMentions.size());
    assertEquals(5, entityMentions.get(0).getOffset());
    assertEquals(4, entityMentions.get(0).getLength());
    assertEquals(24, entityMentions.get(1).getOffset());
    assertEquals(7, entityMentions.get(1).getLength());
  }

  @Test
  void testWholeNoCase() {
    Gazetteer gazetteer =
        new TrieGazetteer(
            TypeConfig.builder()
                .value("type")
                .onlyWholeWords(false)
                .ignoreCase(true)
                .build()
                .create(),
            ImmutableList.of("test"));
    List<KeywordMention> entityMentions = gazetteer.find(TEST_MATCH);
    assertEquals(7, entityMentions.size());
  }
}
