package io.committed.gazetteer.repositories;

import io.committed.gazetteer.model.Type;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeRepository extends PagingAndSortingRepository<Type, String> {}
