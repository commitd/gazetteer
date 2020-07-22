package io.committed.gazetteer.impl;

import org.ahocorasick.trie.Emit;
import io.committed.gazetteer.model.KeywordId;
import io.committed.gazetteer.model.KeywordMention;

public class EmitKeywordMention implements KeywordMention {

  private final Emit emit;
  private final String type;

  public EmitKeywordMention(Emit emit, String type) {
    this.emit = emit;
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
    return new KeywordId(type, emit.getKeyword());
  }

  @Override
  public String toString() {
    return "EmitKeywordMention [type=" + type + ", getOffset()=" + getOffset() + ", getLength()="
        + getLength() + "]";
  }


}
