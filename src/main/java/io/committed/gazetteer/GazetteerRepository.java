package io.committed.gazetteer;

import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Repository;
import io.committed.gazetteer.model.Keyword;

@Repository
public interface GazetteerRepository extends CrudRepository<Keyword, String> {

  void deleteByType(String type);

  void deleteByTypeAndValue(String type, String v);

  @Query("select distinct type from Keyword")
  List<String> getTypes();

  Streamable<Keyword> findByType(String type, Sort sort);
}
