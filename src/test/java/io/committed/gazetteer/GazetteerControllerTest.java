package io.committed.gazetteer;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.reset;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.SpyBean;
import io.committed.gazetteer.dto.Match;
import io.committed.gazetteer.model.Keyword;

@SpringBootTest
class GazetteerControllerTest {

  private static final String OTHER = "OTHER";

  private static final String TEST = "TEST";

  private static final String TEXT = "This is test1, test2, test3 and test4";

  @Autowired
  private GazetteerRepository repository;

  @SpyBean
  private GazetteerService service;

  @Autowired
  private GazetteerController controller;

  @BeforeEach
  void setup() {
    repository.deleteAll();
    repository.save(new Keyword(TEST, "test0"));
    repository.save(new Keyword(TEST, "test1"));
    repository.save(new Keyword(TEST, "test2"));
    repository.save(new Keyword(OTHER, "test2"));
    repository.save(new Keyword(OTHER, "test3"));
    controller.updateGazetteer();
    reset(service);
  }

  @Test
  void canGetTypes() {
    List<String> types = controller.getTypes();
    assertTrue(types.contains(TEST));
    assertTrue(types.contains(OTHER));
  }


  @Test
  void canGetForType() {
    Map<String, Integer> byType = controller.getByType(TEST);
    assertEquals(3, byType.size());
    assertTrue(byType.containsKey("test0"));
    assertTrue(byType.containsKey("test1"));
    assertTrue(byType.containsKey("test2"));
    assertEquals(0, byType.get("test0"));
    assertEquals(0, byType.get("test1"));
    assertEquals(0, byType.get("test2"));
  }

  @Test
  void canFindKeywords() {
    List<Match> find = controller.find(TEXT);
    assertEquals(4, find.size());
  }

  @Test
  void spanCorrectForKeywords() {
    List<Match> find = controller.find("This is test0!");
    assertEquals(1, find.size());
    Match mention = find.get(0);
    assertEquals(TEST, mention.getType());
    assertEquals("test0", mention.getValue());
    assertEquals(8, mention.getOffset());
    assertEquals(5, mention.getLength());
  }


  @Test
  void canAddToType() {
    controller.add(TEST, Arrays.asList("test3", "test4"));

    assertTrue(repository.existsById("TEST:test3"));
    assertTrue(repository.existsById("TEST:test4"));

    List<Match> find = controller.find(TEXT);
    assertEquals(6, find.size());

    Map<String, Integer> byType = controller.getByType(TEST);
    assertEquals(0, byType.get("test0"));
    assertEquals(1, byType.get("test1"));
    assertEquals(1, byType.get("test2"));
  }

  @Test
  void canDeleteByType() {
    controller.deleteByType(TEST);

    assertFalse(repository.getTypes().contains(TEST));

    List<Match> find = controller.find(TEXT);
    assertEquals(2, find.size());
  }

  @Test
  void canDelete() {
    controller.delete(TEST, Arrays.asList("test1", "test2"));

    assertTrue(repository.getTypes().contains(TEST));

    List<Match> find = controller.find(TEXT);
    assertEquals(2, find.size());
  }


  @Test
  void canDeleteType() {
    controller.delete(TEST, Arrays.asList("test0", "test1", "test2"));

    assertFalse(repository.getTypes().contains(TEST));

    List<Match> find = controller.find(TEXT);
    assertEquals(2, find.size());

  }

  @Test
  void readdingDoesNotResetCount() {
    controller.find(TEXT);
    assertEquals(1, controller.getByType(TEST).get("test1"));
    controller.add(TEST, Arrays.asList("test1"));
    controller.find(TEXT);
    assertEquals(2, controller.getByType(TEST).get("test1"));
  }
}
