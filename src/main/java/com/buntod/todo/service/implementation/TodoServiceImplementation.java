package com.buntod.todo.service.implementation;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.buntod.todo.dto.TodoDto;
import com.buntod.todo.entity.Todo;
import com.buntod.todo.exception.ResourceNotFoundException;
import com.buntod.todo.repository.TodoRepository;
import com.buntod.todo.service.TodoService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TodoServiceImplementation implements TodoService {
    private TodoRepository todoRepository;
    private ModelMapper modelMapper;

    @Override
    public TodoDto addTodo(TodoDto todoDto) {
        /** Convert Todo dto to todo jpa entity using model mapper. */
        Todo todo = modelMapper.map(todoDto, Todo.class);

        /** Save todo to database. */
        Todo savedTodo = todoRepository.save(todo);

        /** Convert todo jpa entity to tododto object using model mapper. */
        TodoDto savedTodoDto = modelMapper.map(savedTodo, TodoDto.class);

        /** Return saved todo. */
        return savedTodoDto;
    }

    @Override
    public TodoDto getTodoById(Long todoId) {
        /** Find todo in the database. */
        Todo todo = todoRepository.findById(todoId) .orElseThrow(() -> new ResourceNotFoundException(
                        "Todo not found with the id of: " + todoId));

        /** Return todo. */
        return modelMapper.map(todo, TodoDto.class);
    }

    @Override
    public List<TodoDto> getAllTodos() {
        /** Get all todos. */
        List<Todo> todos = todoRepository.findAll();

        /** Return list of todos. */
        return todos.stream().map((todo) -> modelMapper.map(todo, TodoDto.class)).collect(Collectors.toList());
    }

    @Override
    public TodoDto updateTodo(Long todoId, TodoDto updatedTodo) {
         /** Check if employee exist else throw exception. */
        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found with the id of: " + todoId));

        /** If found set the updated detail. */
        todo.setTitle(updatedTodo.getTitle());
        todo.setDescription(updatedTodo.getDescription());
        todo.setCompleted(updatedTodo.isCompleted());

        /** Save updated todo. */
        Todo updatedUpdatedObject = todoRepository.save(todo);

        /** Return updated todo. */
        return modelMapper.map(updatedUpdatedObject, TodoDto.class);
    }

    @Override
    public TodoDto deleteTodo(Long todoId) {
        /** Check if employee exist else throw exception. */
        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found with the id of: " + todoId));

        /** If found set the updated detail. */
        todoRepository.deleteById(todoId);

         /** Return updated todo. */
        return modelMapper.map(todo, TodoDto.class);
    }
}
