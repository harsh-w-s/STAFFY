package com.staffy.app.dto;

import com.staffy.app.model.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequest {

    @NotBlank
    @Pattern(
            regexp = "^[a-zA-Z ]+$",
            message = "Name not valid"
    )
    private String name;

    @NotBlank
    @Email(
            message = "Email not valid"
    )
    private String email;

    @NotBlank
    @Pattern(
            regexp = "^[a-zA-Z0-9_]+$",
            message = "Username not valid"
    )
    private String username;

    @NotBlank
    @Pattern(
            regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@#$%^&+=]).{8,}$",
            message = "Password must be strong"
    )
    private String password;

    // enumtype string instead of ordinal, as ordinal stores values like (0,1,2...) (i.e. order in
    // which enums are written in the enum file, which can change and then cause issues later, so we
    // use enumtype string, which stores the exact value in db
    @NotNull
    private Role role;

    private Long managerId;
}
