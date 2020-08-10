package io.committed.gazetteer.impl;

import io.committed.gazetteer.model.KeywordId;
import io.committed.gazetteer.model.KeywordMention;
import org.ahocorasick.trie.Emit;

public class EmitKeywordMention implements KeywordMention {

  private final Emit emit;
  private final String typeId;
  private final String type;

  public EmitKeywordMention(Emit emit, String typeId, String type) {
    this.emit = emit;
    this.typeId = typeId;
    this.type = type;
  }

  @Override
  public int getOffset() {
    return emit.getStart();
  }

  @Override
  public int getLength() {
    return emit.getKeyword().length();
  }

  @Override
  public KeywordId getKeywordId() {
    return new KeywordId(typeId, emit.getKeyword());
  }

  @Override
  public String getType() {
    return type;
  }

  @Override
  public String toString() {
    return "EmitKeywordMention [type="
        + type
        + ", getOffset()="
        + getOffset()
        + ", getLength()="
        + getLength()
        + "]";
  }
}
