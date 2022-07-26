package io.committed.gazetteer;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

import com.google.common.collect.ImmutableList;
import io.committed.gazetteer.dto.TypeConfig;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class GazetterControllerTest {

  private static final String TEST = "TEST";
  private static final List<String> VALUES = ImmutableList.of("test");
  private static final TypeConfig CONFIG = TypeConfig.builder().build();
  private static final String ID = "ID";
  private TypeService service;
  private GazetteerController controller;

  @BeforeEach
  void setup() {
    service = mock(TypeService.class);
    controller = new GazetteerController(service);
  }

  @Test
  void getTypesDelegates() {
    controller.getTypes();
    verify(service).getTypes();
  }

  @Test
  void createTypeDelegates() {
    controller.createType(CONFIG);
    verify(service).createType(CONFIG);
  }

  @Test
  void getTypeDelegates() throws Exception {
    controller.getType(ID);
    verify(service).getType(ID);
  }

  @Test
  void updateTypeDelegates() throws Exception {
    controller.updateType(ID, CONFIG);
    verify(service).updateType(ID, CONFIG);
  }

  @Test
  void addKeywordsDelegates() {
    controller.addKeywords(ID, VALUES);
    verify(service).addKeywords(ID, VALUES);
  }

  @Test
  void getKeywordsDelegates() {
    controller.getKeywords(ID);
    verify(service).getKeywords(ID);
  }

  @Test
  void deleteKeywordsDelegates() {
    controller.deleteKeywords(ID, VALUES);
    verify(service).deleteKeywords(ID, VALUES);
  }

  @Test
  void findDelegates() {
    controller.find(TEST);
    verify(service).find(TEST);
  }

  @Test
  void deleteTypeDelegates() throws Exception {
    controller.deleteType(ID);
    verify(service).deleteType(ID);
  }
}
