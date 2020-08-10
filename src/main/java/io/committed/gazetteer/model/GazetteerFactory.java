package io.committed.gazetteer.model;

import java.util.Collection;
import java.util.Map;

public interface GazetteerFactory {
  Gazetteer create(Map<Type, Collection<String>> values);
}
