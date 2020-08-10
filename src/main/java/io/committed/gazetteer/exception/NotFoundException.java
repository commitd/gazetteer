package io.committed.gazetteer.exception;

import java.util.function.Supplier;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NotFoundException extends RuntimeException {

  public NotFoundException(String message) {
    super(message);
  }

  public static Supplier<Exception> notFound(String message) {
    return () -> new NotFoundException(message);
  }
}
