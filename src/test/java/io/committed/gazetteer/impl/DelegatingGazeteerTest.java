package io.committed.gazetteer.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;
import com.google.common.collect.ImmutableList;
import io.committed.gazetteer.model.KeywordMention;
import io.committed.gazetteer.model.Gazetteer;

class DelegatingGazeteerTest {

  @Test
  void testEmpty() {
    DelegatingGazetteer gazeteer = new DelegatingGazetteer(new ArrayList<>());
    List<KeywordMention> mentions = gazeteer.find("test");
    assertEquals(0, mentions.size());
  }

  @Test
  void testDelegates() {
    KeywordMention e1 = mock(KeywordMention.class, "e1");
    KeywordMention e2 = mock(KeywordMention.class, "e2");
    KeywordMention e3 = mock(KeywordMention.class, "e3");
    Gazetteer g1 = mock(Gazetteer.class, "g1");
    Gazetteer g2 = mock(Gazetteer.class, "g2");

    when(g1.find(anyString())).thenReturn(ImmutableList.of(e1));
    when(g2.find(anyString())).thenReturn(ImmutableList.of(e2, e3));

    DelegatingGazetteer gazeteer = new DelegatingGazetteer(ImmutableList.of(g1, g2));

    List<KeywordMention> mentions = gazeteer.find("This is a test");
    assertEquals(3, mentions.size());
    assertTrue(mentions.containsAll(ImmutableList.of(e1, e2, e3)));
  }
}
