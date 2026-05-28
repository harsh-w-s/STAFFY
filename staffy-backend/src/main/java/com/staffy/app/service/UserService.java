package com.staffy.app.service;

import com.staffy.app.dto.LoginRequest;
import com.staffy.app.dto.LoginResponse;
import com.staffy.app.dto.UserRequest;
import com.staffy.app.dto.UserResponse;
import com.staffy.app.model.Role;
import com.staffy.app.model.User;
import com.staffy.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private JwtService jwtService;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public Page<UserResponse> getAllUsers(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));

        Page<User> users = repo.findAll(pageable);
        return users.map(this::mapToResponse);
    }

    public List<UserResponse> getAllEmployees() {
        return repo.findByRole(Role.EMPLOYEE).stream().map(this::mapToResponse).toList();
    }

    public UserResponse addUser(UserRequest request) {

        if(repo.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already present");
        }

        if(repo.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already present");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setPassword(encoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user.setManagerId(request.getManagerId());

        User savedUser = repo.save(user);

        return mapToResponse(savedUser);
    }

    public UserResponse getUserById(Long id) {
        User user = repo.findById(id).orElseThrow(() -> new RuntimeException("User not found by id: " + id));

        return mapToResponse(user);
    }

    public LoginResponse authenticate(LoginRequest request) {
        User user =
                repo.findByUsername(request.getUsername()).orElseThrow(() -> new RuntimeException("Username not found"));

        if(!encoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Incorrect Password");
        }

        LoginResponse response = new LoginResponse();

        response.setId(user.getId());
        response.setName(user.getName());
        response.setUsername(user.getUsername());
        response.setRole(user.getRole());

        //Jwt generation
        String token = jwtService.generateToken(user);
        response.setToken(token);

        return response;
    }

    public UserResponse mapToResponse(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());
        response.setManager_id(user.getManagerId());
        return response;
    }

    public List<UserResponse> getEmployeesUnderManager(Long managerId) {

        return repo.findByManagerId(managerId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
}
