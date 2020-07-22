package io.committed.gazetteer.model;

import java.util.List;

public interface Gazetteer {

  List<KeywordMention> find(String text);
}
