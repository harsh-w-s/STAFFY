package com.staffy.app.controller;

import com.staffy.app.dto.CurrentUserResponse;
import com.staffy.app.dto.TaskRequest;
import com.staffy.app.dto.TaskResponse;
import com.staffy.app.dto.TaskStatusUpdateRequest;
import com.staffy.app.exception.ForbiddenException;
import com.staffy.app.model.Role;
import com.staffy.app.model.User;
import com.staffy.app.security.CustomUserDetails;
import com.staffy.app.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

  @Autowired private TaskService taskService;

  // GET ALL TASKS CREATED BY MANAGER/ADMIN
  @GetMapping
  @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
  public ResponseEntity<Page<TaskResponse>> getCreatedTasks(
      Authentication authentication,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size,
      @RequestParam(defaultValue = "id") String sortBy) {

    User currentUser = ((CustomUserDetails) authentication.getPrincipal()).getUser();

    if (currentUser.getRole() == Role.MANAGER) {
      return ResponseEntity.ok(taskService.getCreatedTasks(currentUser, page, size, sortBy));
    } else {
      return ResponseEntity.ok(taskService.getAllTasks(page, size, sortBy));
    }
  }

  // GET ALL TASKS OF AN EMPLOYEE BY PAGE
  @GetMapping("/my-tasks")
  @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN', 'EMPLOYEE')")
  public ResponseEntity<Page<TaskResponse>> getMyTasks(
      Authentication authentication,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size,
      @RequestParam(defaultValue = "id") String sortBy) {

    User currentUser = ((CustomUserDetails) authentication.getPrincipal()).getUser();

    return ResponseEntity.ok(taskService.getTasksByPage(currentUser, page, size, sortBy));
  }

  // GET A TASK BY ID
  @GetMapping("/{taskId}")
  @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN', 'EMPLOYEE')")
  public ResponseEntity<TaskResponse> getTaskById(@PathVariable Long taskId, Authentication authentication) {
    User currentUser = ((CustomUserDetails) authentication.getPrincipal()).getUser();

    return ResponseEntity.ok(taskService.getTaskById(taskId, currentUser));
  }

  // CREATE A NEW TASK
  @PostMapping
  @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
  public ResponseEntity<TaskResponse> createTask(
      @Valid @RequestBody TaskRequest request, Authentication authentication) {

    User currentUser = ((CustomUserDetails) authentication.getPrincipal()).getUser();

    TaskResponse response = taskService.createTask(request, currentUser);

    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  // UPDATE TASK STATUS FOR EMPLOYEE(OPEN -> IN_PROGRESS -> RESOLVED)
  @PatchMapping("/{taskId}/status")
  @PreAuthorize("hasAnyRole('EMPLOYEE', 'MANAGER', 'ADMIN')")
  public ResponseEntity<TaskResponse> updateTaskStatus(@PathVariable Long taskId,
                                                       @RequestBody TaskStatusUpdateRequest req, Authentication authentication) {
    User currentUser = ((CustomUserDetails) authentication.getPrincipal()).getUser();

    return ResponseEntity.ok(taskService.updateTaskStatus(taskId, req, currentUser));
  }


}
