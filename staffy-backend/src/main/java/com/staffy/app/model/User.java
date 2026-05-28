package com.staffy.app.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {

    // @Id(mandatory, each JPA entity must have one) sets the variable as primary key of a JPA entity in the db
    // @GeneratedValue used to automatically set values of ids for each entity created
    // strategy types -
    // 1. IDENTITY => uses db's identity column to autoincrement ids
    // 2. SEQUENCE =>  uses a db sequence to generate ids
    // 3. TABLE => uses a separate table to maintain and generate unique identifiers
    // 4. AUTO => lets JPA automatically select generation strategy based on the underlying db
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(unique = true, nullable = false)
    private String username;

    private String password;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name = "manager_id")
    private Long managerId;
}


/*
flags parameter used in @Pattern and @Email annotations-
used to modify regex behavious.
Ex- @Pattern(
    regexp = "abc",
    flags = Pattern.Flag.CASE_INSENSITIVE
)
This matches for abc, ABC, AbC...
 */