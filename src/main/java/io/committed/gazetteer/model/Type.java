package io.committed.gazetteer.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.ahocorasick.trie.Trie;
import org.ahocorasick.trie.Trie.TrieBuilder;
import org.hibernate.annotations.GenericGenerator;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Type {

  @Id
  @GeneratedValue(generator = "uuid")
  @GenericGenerator(name = "uuid", strategy = "uuid2")
  String id;

  /** The string value of the type */
  @Column(name = "`VALUE`")
  String value;

  /** Configure the Trie to ignore overlapping keywords. */
  boolean ignoreOverlaps = true;

  /** Configure the Trie to match whole keywords in the text. */
  boolean onlyWholeWords = true;

  /**
   * Configure the Trie to match whole keywords that are separated by whitespace in the text. For
   * example, "this keyword thatkeyword" would only match the first occurrence of "keyword".
   */
  boolean onlyWholeWordsWhiteSpaceSeparated = false;

  /** Configure the type to ignore case when searching for keywords in the text. */
  boolean ignoreCase = false;

  public Type(String value) {
    this(null, value, true, true, false, false);
  }

  @JsonIgnore
  public TrieBuilder trieBuilder() {
    TrieBuilder builder = Trie.builder();
    if (ignoreOverlaps) {
      builder.ignoreOverlaps();
    }
    if (onlyWholeWords) {
      builder.onlyWholeWords();
    }
    if (onlyWholeWordsWhiteSpaceSeparated) {
      builder.onlyWholeWordsWhiteSpaceSeparated();
    }
    if (ignoreCase) {
      builder.ignoreCase();
    }
    return builder;
  }
}
