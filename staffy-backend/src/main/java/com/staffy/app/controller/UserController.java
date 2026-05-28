package com.staffy.app.controller;

import com.staffy.app.dto.*;
import com.staffy.app.model.User;
import com.staffy.app.security.CustomUserDetails;
import com.staffy.app.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

  @Autowired private UserService service;

  // Get all users
  @GetMapping
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<Page<UserResponse>> getAllUsers(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size,
      @RequestParam(defaultValue = "id") String sortBy) {
    return ResponseEntity.ok().body(service.getAllUsers(page, size, sortBy));
  }

  // Get user by id
  @GetMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
    return ResponseEntity.ok().body(service.getUserById(id));
  }

  //GET ALL EMPLOYEES LIST FOR ASSIGNING TASK
  @GetMapping("/employees")
  @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
  public ResponseEntity<List<UserResponse>> getAllEmployees() {
    return ResponseEntity.ok(service.getAllEmployees());
  }

  // Add new user
  @PostMapping
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<UserResponse> addUser(@Valid @RequestBody UserRequest request) {
    UserResponse response = service.addUser(request);

    URI location =
        ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(response.getId())
            .toUri();

    return ResponseEntity.created(location)
        .body(response); // created() -> status(201, CREATED) // status 201 has a rule that when
    // you create a resource, you should tell the client where it exists now,
    // so you send back an uri of the created resource.
  }

  // Login request
  @PostMapping("/login")
  public ResponseEntity<LoginResponse> authenticateUser(@Valid @RequestBody LoginRequest request) {
    return ResponseEntity.ok().body(service.authenticate(request));
  }

  // Logout request
  @PostMapping("/logout")
  public ResponseEntity<?> logoutUser() {
    return ResponseEntity.ok("User Logged out.");
  }

  // dummy controller method to check the current user
  // spring automatically injects the current authenticated user context in the parameter
  // 'Authentication
  // authentication'
  @GetMapping("/me")
  public ResponseEntity<CurrentUserResponse> currentUser(Authentication authentication) {

    User user = ((CustomUserDetails) authentication.getPrincipal()).getUser();
    CurrentUserResponse currentUserResponse = new CurrentUserResponse();
    currentUserResponse.setId(user.getId());
    currentUserResponse.setUsername(user.getUsername());
    currentUserResponse.setName(user.getName());
    currentUserResponse.setRole(user.getRole());

    return ResponseEntity.ok(currentUserResponse);
  }

  @GetMapping("/team")
  @PreAuthorize("hasRole('MANAGER')")
  public ResponseEntity<?> getTeam(Authentication authentication) {

    CustomUserDetails currentUser = (CustomUserDetails) authentication.getPrincipal();

    return ResponseEntity.ok(service.getEmployeesUnderManager(currentUser.getUser().getId()));
  }
}

/*
# Controller vs RestController : RestController is a specialized version of Controller that combines Controller +
ResponseBody, designed for Rest apis. RestController returns JSON/XML resposnes, while Controller typically returns a
view (HTML) name, requiring @ResponseBody annotation on methods that want to return data in a ccontroller class
annotated by @Controller

# RequestParam : /url?id=1&name=harsh
# PathVariable : /url/{id}
 */
