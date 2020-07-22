package io.committed.gazetteer;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@DirtiesContext
@ActiveProfiles("test")
class GazetteerApplicationTest {

  @SpyBean
  private GazetteerService service;


  @Test
  void contextLoads() {
    assertNotNull(service);
  }


}
