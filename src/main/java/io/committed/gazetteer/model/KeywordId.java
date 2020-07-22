package io.committed.gazetteer.model;

import lombok.Value;

@Value
public class KeywordId {

  String type;

  String value;

  public KeywordId(String type, String value) {
    this.type = type.toUpperCase();
    this.value = value;
  }

  @Override
  public String toString() {
    return String.format("%s:%s", type, value);
  }

}
