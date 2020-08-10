package io.committed.gazetteer;

import static java.util.stream.Collectors.toList;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.reset;

import com.google.common.collect.Streams;
import io.committed.gazetteer.dto.Match;
import io.committed.gazetteer.dto.TypeConfig;
import io.committed.gazetteer.exception.NotFoundException;
import io.committed.gazetteer.model.Keyword;
import io.committed.gazetteer.model.Type;
import io.committed.gazetteer.repositories.KeywordRepository;
import io.committed.gazetteer.repositories.TypeRepository;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.data.domain.Sort;

@SpringBootTest
class GazetteerControllerTest {

  private static final String OTHER = "Other";

  private static final String TEST = "TEST";

  private static final String TEXT = "This is test1, test2, test3 and test4";

  @Autowired private TypeRepository typeRepository;
  @Autowired private KeywordRepository keywordRepository;

  @SpyBean private GazetteerService service;

  @Autowired private GazetteerController controller;

  private String testId;

  private String otherId;

  @BeforeEach
  void setup() {
    typeRepository.deleteAll();
    keywordRepository.deleteAll();
    testId = typeRepository.save(new Type(TEST)).getId();
    otherId = typeRepository.save(new Type(OTHER)).getId();
    keywordRepository.save(new Keyword(testId, "test0"));
    keywordRepository.save(new Keyword(testId, "test1"));
    keywordRepository.save(new Keyword(testId, "test2"));
    keywordRepository.save(new Keyword(otherId, "test2"));
    keywordRepository.save(new Keyword(otherId, "test3"));
    controller.updateGazetteer();
    reset(service);
  }

  @Test
  void canGetTypes() {
    List<String> types =
        Streams.stream(controller.getTypes()).map(Type::getValue).collect(toList());
    assertTrue(types.contains(TEST));
    assertTrue(types.contains(OTHER));
  }

  @Test
  void canGetType() throws Exception {
    Type type = controller.getType(testId);
    assertEquals(TEST, type.getValue());
  }

  @Test
  void canNotGetMissingType() {
    assertThrows(
        NotFoundException.class,
        () -> {
          controller.getType("missing");
        });
  }

  @Test
  void canCreateType() {
    String type = "new";
    String id = controller.createType(TypeConfig.builder().value(type).build());
    assertEquals(type, typeRepository.findById(id).orElseThrow().getValue());
  }

  @Test
  void canUpdateType() throws Exception {
    TypeConfig config =
        TypeConfig.builder().value(OTHER).ignoreCase(true).ignoreOverlaps(true).build();
    controller.updateType(testId, config);
    assertEquals(OTHER, typeRepository.findById(testId).orElseThrow().getValue());
    assertEquals(
        config.getIgnoreCase(), typeRepository.findById(testId).orElseThrow().isIgnoreCase());
  }

  @Test
  void canGetForType() {
    Map<String, Integer> byType = controller.getKeywords(testId);
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
    assertEquals(testId, mention.getTypeId());
    assertEquals("test0", mention.getValue());
    assertEquals(8, mention.getOffset());
    assertEquals(5, mention.getLength());
  }

  @Test
  void canAddToType() {
    controller.addKeywords(testId, Arrays.asList("test3", "test4"));

    assertTrue(keywordRepository.existsById(String.format("%s:test3", testId)));
    assertTrue(keywordRepository.existsById(String.format("%s:test4", testId)));

    List<Match> find = controller.find(TEXT);
    assertEquals(6, find.size());

    Map<String, Integer> byType = controller.getKeywords(testId);
    assertEquals(0, byType.get("test0"));
    assertEquals(1, byType.get("test1"));
    assertEquals(1, byType.get("test2"));
  }

  @Test
  void canDeleteType() {
    controller.deleteType(testId);

    assertTrue(keywordRepository.findByTypeId(testId, Sort.unsorted()).isEmpty());
    assertTrue(typeRepository.findById(testId).isEmpty());

    List<Match> find = controller.find(TEXT);
    assertEquals(2, find.size());
  }

  @Test
  void canDeleteKeywords() {
    controller.deleteKeywords(testId, Arrays.asList("test1", "test2"));

    assertFalse(keywordRepository.findByTypeId(testId, Sort.unsorted()).isEmpty());
    assertTrue(typeRepository.findById(testId).isPresent());

    List<Match> find = controller.find(TEXT);
    assertEquals(2, find.size());
  }

  @Test
  void canDeleteAllType() {
    controller.deleteKeywords(testId, Arrays.asList("test0", "test1", "test2"));

    assertTrue(keywordRepository.findByTypeId(testId, Sort.unsorted()).isEmpty());
    // Does not delete the type
    assertTrue(typeRepository.findById(testId).isPresent());

    List<Match> find = controller.find(TEXT);
    assertEquals(2, find.size());
  }

  @Test
  void readdingDoesNotResetCount() {
    controller.find(TEXT);
    assertEquals(1, controller.getKeywords(testId).get("test1"));
    controller.addKeywords(testId, Arrays.asList("test1"));
    controller.find(TEXT);
    assertEquals(2, controller.getKeywords(testId).get("test1"));
  }
}
