package com.chatApp.user_service.model;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@Entity
@Table(name = "Users")

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;


    public User() {
    }

}