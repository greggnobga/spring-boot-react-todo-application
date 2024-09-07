package com.buntod.todo.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalException {

    @ExceptionHandler(TodoAPIException.class)
    public ResponseEntity<ErrorDetailsException> handleTodoAPIExceptoion(TodoAPIException exception,
            WebRequest webRequest) {

        /** Handle the error. */
        ErrorDetailsException errorDetailsException = new ErrorDetailsException(
            LocalDateTime.now(),
            exception.getMessage(),
            webRequest.getDescription(false)
        );

        /** Return something. */
        return new ResponseEntity<>(errorDetailsException, HttpStatus.BAD_REQUEST);
    }

}
