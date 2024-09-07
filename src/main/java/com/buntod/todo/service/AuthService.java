package com.buntod.todo.service;

import com.buntod.todo.dto.LoginDto;
import com.buntod.todo.dto.RegisterDto;

public interface AuthService {
    /** Register. */
    String register(RegisterDto registerDto);

    /** Login. */
    String login(LoginDto loginDto);
}
