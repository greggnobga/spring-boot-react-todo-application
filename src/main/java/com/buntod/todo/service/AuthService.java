package com.buntod.todo.service;

import com.buntod.todo.dto.RegisterDto;

public interface AuthService {
    String register(RegisterDto registerDto);
}
