package io.committed.gazetteer.dto;

import io.committed.gazetteer.model.KeywordMention;

/** A typed match to a keyword */
public class Match {

  private final KeywordMention mention;

  public Match(KeywordMention mention) {
    this.mention = mention;
  }

  /** @return the type of the match */
  public String getType() {
    return mention.getType();
  }

  /** @return the typeId of the match */
  public String getTypeId() {
    return mention.getKeywordId().getTypeId();
  }

  /** @return the value of the keyword matched */
  public String getValue() {
    return mention.getKeywordId().getValue();
  }

  /** @return the offset in the text where it was found */
  public int getOffset() {
    return mention.getOffset();
  }

  /** @return the length of the match */
  public int getLength() {
    return mention.getLength();
  }
}
