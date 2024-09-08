package com.buntod.todo.security;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.time.Duration;
import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtTokenProvider {
    @Value("${app.jwt-secret}")
    private String jwtSecret;

    @Value("${app.jwt-expiration-milliseconds}")
    private String jwtExpirationDate;

    /** Generate jwt token. */
    public String generateToken(Authentication authentication) {
        /** Set auth username. */
        String username = authentication.getName();

        /** Set current date. */
        LocalDateTime currentDate = LocalDateTime.now();

        /** Set expiration date. */
        LocalDateTime expireDate = currentDate.plus(Duration.ofMillis(Integer.parseInt(jwtExpirationDate)));

        /** Convert local date time to Date */
        Date iat = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
        Date exp = Date.from(expireDate.atZone(ZoneId.systemDefault()).toInstant());

        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes());

        /** Create jwt token. */
        String token = Jwts.builder()
                .subject(username)
                .issuedAt(iat)
                .expiration(exp)
                .signWith(key)
                .compact();

        /** Return token. */
        return token;
    }

    /** Helper method to extract claims from the token */
    public String getUsername(String token) {
        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes());

        Claims claims = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        String username = claims.getSubject();

        return username;
    }

    /** Validate jwt token. */
    public boolean validateToken(String token) {
        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes());

        Jwts.parser()
            .verifyWith(key)
            .build()
            .parseSignedClaims(token);

        return true;
    }
}
