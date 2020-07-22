package io.committed.gazetteer.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class Keyword {

  @Id
  String id;

  String type;

  String value;
  
  int count;
  
  public Keyword(String type, String value) {
    this(new KeywordId(type, value), 0);
  }
  
  public Keyword(KeywordId id, int count) {
    this.id = id.toString();
    this.type = id.getType();
    this.value = id.getValue();
    this.count = 0;
  }
  
  public int found() {
    return this.count++;
  }
}
