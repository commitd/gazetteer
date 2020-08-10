package io.committed.gazetteer.model;

import lombok.Value;

@Value
public class KeywordId {

  String typeId;

  String value;

  public KeywordId(String typeId, String value) {
    this.typeId = typeId;
    this.value = value;
  }

  @Override
  public String toString() {
    return String.format("%s:%s", typeId, value);
  }
}
