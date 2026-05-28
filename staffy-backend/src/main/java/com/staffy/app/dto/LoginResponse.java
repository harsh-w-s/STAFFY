package com.staffy.app.dto;

import com.staffy.app.model.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {

    private Long id;
    private String name;
    private String username;
    private Role role;
    private String token;
}
