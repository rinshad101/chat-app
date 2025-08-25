package com.chatApp.user_service.controller;

import com.chatApp.user_service.dto.AuthenticationRequest;
import com.chatApp.user_service.exception.UserAlredyExistException;
import com.chatApp.user_service.model.User;
import com.chatApp.user_service.repository.UserRepository;
import com.chatApp.user_service.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService service;

    @Autowired
    private UserRepository repository;

    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody User user) {
        Map<String, String> response = new HashMap<>();
        try {
            User newuser = service.saveUser(user);
            return ResponseEntity.ok(newuser);
        } catch (UserAlredyExistException e) {
            response.put("error", "user already exist");
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest request, HttpServletResponse response) {

        System.out.println("received email :" + request.getEmail());
        System.out.println("received password:" + request.getPassword());
        return service.login(request, response);
    }

    @PostMapping("/admin-login")
    public ResponseEntity<?> adminLogin(@RequestBody AuthenticationRequest request, HttpServletResponse response) {

        System.out.println("received email :" + request.getEmail());
        System.out.println("received password:" + request.getPassword());
        return service.adminLogin(request, response);
    }



    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response){
        return ResponseEntity.ok(service.logout(response));
    }

    @PostMapping("/refresh-token")
    public void refreshToken(HttpServletRequest request,HttpServletResponse response) throws IOException{
        service.refreshToken(request,response);
    }

    @GetMapping("/current-user")
    public ResponseEntity<String> getCurrentUser(@CookieValue(name = "jwt", required = false) String token) {
        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("no token found");
        }
        return ResponseEntity.ok(service.extractEmailFromToken(token));
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<User> getUserDetails(@PathVariable String email){
        User user = repository.findByEmail(email).orElseThrow(
                ()-> new RuntimeException("user not found")
        );
        return ResponseEntity.ok(user);
    }



}