package com.buntod.todo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.buntod.todo.dto.RegisterDto;
import com.buntod.todo.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private AuthService authService;

    /** Make sure the auth service inject properly. */
    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /** Build auth register rest api. */
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        /** Call auth service register. */
        String response = authService.register(registerDto);

        /** Return something/ */
        return ResponseEntity.ok(response);
    }

}
