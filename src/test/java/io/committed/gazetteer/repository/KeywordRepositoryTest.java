package io.committed.gazetteer.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;

import io.committed.gazetteer.model.Keyword;
import io.committed.gazetteer.repositories.KeywordRepository;
import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Sort;

@DataJpaTest
class KeywordRepositoryTest {

  private static final String TEST = "TEST";
  private static final String OTHER = "other type";

  @Autowired private KeywordRepository repository;

  @AfterEach
  void cleanUp() {
    repository.deleteAll();
  }

  @BeforeEach
  void setUp() {
    repository.save(new Keyword(TEST, "test1"));
    repository.save(new Keyword(TEST, "test2"));
    repository.save(new Keyword(OTHER, "test1"));
    repository.save(new Keyword(OTHER, "test2"));
  }

  @Test
  void canAddAndRemoveEntities() {
    assertEquals(4, repository.count());

    repository.deleteByTypeId(OTHER);

    assertEquals(2, repository.count());

    repository.deleteByTypeIdAndValue(TEST, "test1");
    repository.deleteByTypeIdAndValue(TEST, "test2");

    assertEquals(0, repository.count());
  }

  @Test
  void canGetByType() {
    List<Keyword> byType = repository.findByTypeId(TEST, Sort.by("value")).toList();

    assertEquals(2, byType.size());
    assertEquals("test1", byType.get(0).getValue());
    assertEquals("test2", byType.get(1).getValue());
  }
}
