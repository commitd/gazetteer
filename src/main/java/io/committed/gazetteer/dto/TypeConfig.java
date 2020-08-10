package io.committed.gazetteer.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.committed.gazetteer.model.Type;
import javax.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TypeConfig {

  /** The string value of the type */
  @Nullable String value;

  /** Configure the Trie to ignore overlapping keywords. */
  @Nullable @Builder.Default Boolean ignoreOverlaps = true;

  /** Configure the Trie to match whole keywords in the text. */
  @Nullable @Builder.Default Boolean onlyWholeWords = true;

  /**
   * Configure the Trie to match whole keywords that are separated by whitespace in the text. For
   * example, "this keyword thatkeyword" would only match the first occurrence of "keyword".
   */
  @Nullable @Builder.Default Boolean onlyWholeWordsWhiteSpaceSeparated = false;

  /** Configure the type to ignore case when searching for keywords in the text. */
  @Nullable @Builder.Default Boolean ignoreCase = false;

  @JsonIgnore
  public void apply(Type type) {
    if (value != null) {
      type.setValue(value);
    }
    if (ignoreCase != null) {
      type.setIgnoreCase(ignoreCase);
    }
    if (ignoreOverlaps != null) {
      type.setIgnoreOverlaps(ignoreOverlaps);
    }
    if (onlyWholeWords != null) {
      type.setOnlyWholeWords(onlyWholeWords);
    }
    if (onlyWholeWordsWhiteSpaceSeparated != null) {
      type.setOnlyWholeWordsWhiteSpaceSeparated(onlyWholeWordsWhiteSpaceSeparated);
    }
  }

  public Type create() {
    Type type = new Type();
    apply(type);
    return type;
  }
}
