package io.committed.gazetteer.repositories;

import io.committed.gazetteer.model.Keyword;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Repository;

@Repository
public interface KeywordRepository extends CrudRepository<Keyword, String> {

  void deleteByTypeId(String type);

  void deleteByTypeIdAndValue(String typeId, String v);

  Streamable<Keyword> findByTypeId(String typeId, Sort sort);
}
