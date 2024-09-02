package com.buntod.todo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.buntod.todo.dto.TodoDto;
import com.buntod.todo.service.TodoService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("api/todos")
@AllArgsConstructor
public class TodoController {

    private TodoService todoService;

    /** Build add todo rest api. */
    @PostMapping
    public ResponseEntity<TodoDto> addTodo(@RequestBody TodoDto todoDto) {

        /** Call add todo service. */
        TodoDto savedTodo = todoService.addTodo(todoDto);

        /** Return something. */
        return new ResponseEntity<>(savedTodo, HttpStatus.CREATED);
    }

    /** Build get todo rest api. */
    @GetMapping("{id}")
    public ResponseEntity<TodoDto> getTodoById(@PathVariable("id") Long todoId) {
        /** Call get todo service. */
        TodoDto todoDto = todoService.getTodoById(todoId);

        /** Return something. */
        return ResponseEntity.ok(todoDto);
    }

    /** Build get todos rest api. */
    @GetMapping
    public ResponseEntity<List<TodoDto>> getAllTodos() {
        /** Get all todos. */
        List<TodoDto> todos = todoService.getAllTodos();

        /** Return something. */
        return ResponseEntity.ok(todos);
    }

    /** Build update todo rest api. */
    @PutMapping("{id}")
    public ResponseEntity<TodoDto> updateTodo(@PathVariable("id") Long todoId, @RequestBody TodoDto updatedTodo) {
        /** Call update todo service. */
        TodoDto todoDto = todoService.updateTodo(todoId, updatedTodo);

        /** Return something. */
        return ResponseEntity.ok(todoDto);
    }

    /** Build delete todo rest api. */
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable("id") Long todoId) {
        /** Call delete todo service. */
        todoService.deleteTodo(todoId);

        /** Return something. */
        return ResponseEntity.ok("Todo deleted successfully.");
    }

    /** Build complete todo rest api. */
    @PatchMapping("{id}/complete")
    public ResponseEntity<TodoDto> completeTodo(@PathVariable("id") Long todoId) {
        /** Call get todo service. */
        TodoDto todoDto = todoService.completeTodo(todoId);

        /** Return something. */
        return ResponseEntity.ok(todoDto);
    }

    /** Build incomplete todo rest api. */
    @PatchMapping("{id}/incomplete")
    public ResponseEntity<TodoDto> inCompleteTodo(@PathVariable("id") Long todoId) {
        /** Call get todo service. */
        TodoDto todoDto = todoService.inCompleteTodo(todoId);

        /** Return something. */
        return ResponseEntity.ok(todoDto);
    }
}
