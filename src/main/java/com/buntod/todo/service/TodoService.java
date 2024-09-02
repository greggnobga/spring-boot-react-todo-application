package com.buntod.todo.service;

import java.util.List;

import com.buntod.todo.dto.TodoDto;

public interface TodoService {
    /** Add todo. */
    TodoDto addTodo(TodoDto todoDto);

    /** Get todo by id. */
    TodoDto getTodoById(Long todoId);

    /** Get all todos. */
    List<TodoDto> getAllTodos();

    /** Update todo. */
    TodoDto updateTodo(Long todoId, TodoDto updatedTodo);

    /** Delete todo. */
    void deleteTodo(Long todoId);

    /** Complete todo. */
    TodoDto completeTodo(Long todoId);

    /** Incomplete todo. */
    TodoDto inCompleteTodo(Long todoId);
}
