package com.buntod.todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.buntod.todo.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

}
