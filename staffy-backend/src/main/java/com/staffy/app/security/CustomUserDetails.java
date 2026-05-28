package com.staffy.app.security;

import com.staffy.app.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class CustomUserDetails implements UserDetails {

// This class acts as an adapter between our domain model and Spring Security's
// authentication system. Instead of making our actual User entity implement
// the UserDetails interface directly, we wrap the User object inside this class.
//
// We do this to keep our domain/business model independent from framework-specific
// code. The User entity should only represent business data and database structure,
// not Spring Security implementation details.
//
// If we directly implemented UserDetails inside User, our entity would become
// tightly coupled to Spring Security. This would mix business logic with security
// framework concerns and make the architecture harder to maintain or change later.
//
// CustomUserDetails translates/adapts our User entity into a format that Spring
// Security understands. This class also becomes the authenticated principal stored
// inside Spring Security's SecurityContext.

// Practices followed here:
//
// 1. Separation of Concerns
//    - User entity handles business/domain data
//    - CustomUserDetails handles security concerns
//
// 2. Single Responsibility Principle (SRP) from SOLID principles
//    - Each class has one clear responsibility
//
// 3. Loose Coupling
//    - Domain model is not tightly dependent on Spring Security
//
// 4. Adapter Pattern
//    - CustomUserDetails adapts User -> UserDetails
//
// 5. Encapsulation
//    - Spring Security interacts with UserDetails, not raw entity
//
// 6. Clean Architecture
//    - Framework-specific logic kept separate from business logic
//
// 7. Composition over Inheritance
//    - Wrapping User object instead of modifying/extending entity

    private final User user;

    public CustomUserDetails(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    //methods that must be implemented(getAuthorities, getPassword and getUsername)
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    //account status methods, not necessary to implement
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
