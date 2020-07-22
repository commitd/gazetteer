package io.committed.gazetteer;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Sort;
import io.committed.gazetteer.model.Keyword;

@DataJpaTest
class GazetteerRepositoryTest {

  private static final String TEST = "TEST";
  private static final String OTHER = "OTHER";

  @Autowired
  private GazetteerRepository repository;

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

    repository.deleteByType(OTHER);

    assertEquals(2, repository.count());

    repository.deleteByTypeAndValue(TEST, "test1");
    repository.deleteByTypeAndValue(TEST, "test2");

    assertEquals(0, repository.count());
  }

  @Test
  void canGetByType() {
    List<Keyword> byType = repository.findByType(TEST, Sort.by("value")).toList();

    assertEquals(2, byType.size());
    assertEquals("test1", byType.get(0).getValue());
    assertEquals("test2", byType.get(1).getValue());
  }

  @Test
  void canGeTypes() {
    List<String> types = repository.getTypes();

    assertEquals(2, types.size());
    assertTrue(types.contains(TEST));
    assertTrue(types.contains(OTHER));
  }

}
