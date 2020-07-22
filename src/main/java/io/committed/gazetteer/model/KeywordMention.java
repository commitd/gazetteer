package io.committed.gazetteer.model;

public interface KeywordMention {

  /**
   * @return the start of the mention.
   */
  int getOffset();

  /**
   * @return the length of the mention
   */
  int getLength();

  /**
   *
   * @return the id of the keyword
   */
  KeywordId getKeywordId();


}
