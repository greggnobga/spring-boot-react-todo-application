package com.buntod.todo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.buntod.todo.dto.LoginDto;
import com.buntod.todo.dto.RegisterDto;
import com.buntod.todo.dto.Response;
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
    public ResponseEntity<Response> register(@RequestBody RegisterDto registerDto) {
        /** Call auth register service. */
        String message = authService.register(registerDto);

        /** Custom response. */
        Response response = new Response(message, true);

        System.out.println(response);

        /** Return something. */
        return ResponseEntity.ok(response);
    }

    /** Build auth login rest api. */
    @PostMapping("/login")
    public ResponseEntity<Response> login(@RequestBody LoginDto loginDto) {
        /** Call auth login service. */
        String message = authService.login(loginDto);

        /** Custom response. */
        Response response = new Response(message, true);

        System.out.println(response);

        /** Return something. */
        return ResponseEntity.ok(response);
    }
}
