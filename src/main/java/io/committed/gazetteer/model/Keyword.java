package io.committed.gazetteer.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class Keyword {

  @Id String id;

  String typeId;

  String value;

  int count;

  public Keyword(String typeId, String value) {
    this(new KeywordId(typeId, value), 0);
  }

  public Keyword(KeywordId id, int count) {
    this.id = id.toString();
    this.typeId = id.getTypeId();
    this.value = id.getValue();
    this.count = 0;
  }

  public int found() {
    return this.count++;
  }
}
