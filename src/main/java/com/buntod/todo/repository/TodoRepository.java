package com.buntod.todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.buntod.todo.entity.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long> {

}
