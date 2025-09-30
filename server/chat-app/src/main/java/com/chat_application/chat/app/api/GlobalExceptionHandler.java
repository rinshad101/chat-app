package com.chat_application.chat.app.api;
import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import java.util.NoSuchElementException;
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(SecurityException.class)
    public ResponseEntity<ApiError> forbidden(SecurityException ex){
        return
                ResponseEntity.status(HttpStatus.FORBIDDEN).body(ApiError.of("Forbidden",
                        ex.getMessage(), 403));
    }
    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ApiError> notFound(NoSuchElementException ex){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiError.of("Not Found", ex.getMessage(), 404));
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> validation(MethodArgumentNotValidException
                                                       ex){
        var msg =
                ex.getBindingResult().getAllErrors().stream().findFirst().map(e ->
                        e.getDefaultMessage()).orElse("Validation error");
        return ResponseEntity.badRequest().body(ApiError.of("Bad Request", msg,
                400));
    }
}