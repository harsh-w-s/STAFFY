package com.staffy.app.dto;

import com.staffy.app.model.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {

    private Long id;
    private String name;
    private String username;
    private String email;
    private Role role;
    private Long manager_id;
}
