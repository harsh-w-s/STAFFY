package com.staffy.app.service;

import com.staffy.app.dto.TaskRequest;
import com.staffy.app.dto.TaskResponse;
import com.staffy.app.dto.TaskStatusUpdateRequest;
import com.staffy.app.exception.ResourceNotFoundException;
import com.staffy.app.exception.ForbiddenException;
import com.staffy.app.model.Role;
import com.staffy.app.model.Task;
import com.staffy.app.model.TaskStatus;
import com.staffy.app.model.User;
import com.staffy.app.repository.TaskRepository;
import com.staffy.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class TaskService {

  @Autowired private TaskRepository taskRepository;

  @Autowired private UserRepository userRepository;

  private static final Map<TaskStatus, List<TaskStatus>> VALID_STATUS_TRANSITIONS =
      Map.of(
          TaskStatus.OPEN,
          List.of(TaskStatus.IN_PROGRESS),
          TaskStatus.IN_PROGRESS,
          List.of(TaskStatus.OPEN, TaskStatus.IN_REVIEW),
          TaskStatus.IN_REVIEW,
          List.of(TaskStatus.IN_PROGRESS, TaskStatus.RESOLVED),
          TaskStatus.RESOLVED,
          List.of(TaskStatus.DONE),
          TaskStatus.DONE,
          List.of(TaskStatus.CLOSED));

  private static final List<TaskStatus> EMPLOYEE_ALLOWED_STATUSES =
      List.of(TaskStatus.IN_PROGRESS, TaskStatus.OPEN, TaskStatus.IN_REVIEW, TaskStatus.RESOLVED);

  private static final List<TaskStatus> MANAGER_ALLOWED_STATUSES =
      List.of(TaskStatus.DONE, TaskStatus.CLOSED);

  private static final List<TaskStatus> ADMIN_ALLOWED_STATUSES =
      List.of(
          TaskStatus.IN_PROGRESS,
          TaskStatus.OPEN,
          TaskStatus.IN_REVIEW,
          TaskStatus.RESOLVED,
          TaskStatus.DONE,
          TaskStatus.CLOSED);

  private static final List<TaskStatus> HR_ALLOWED_STATUSES = List.of();

  public Page<TaskResponse> getAllTasks(int page, int size, String sortBy) {
    Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));

    Page<Task> tasks = taskRepository.findAll(pageable);
    return tasks.map(this::mapToResponse);
  }

  public Page<TaskResponse> getTasksByPage(User currentUser, int page, int size, String sortBy) {
    Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));

    Page<Task> tasks = taskRepository.findByAssignedEmployeeId(currentUser.getId(), pageable);
    return tasks.map(this::mapToResponse);
  }

  public Page<TaskResponse> getCreatedTasks(User currentUser, int page, int size, String sortBy) {
    Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));

    Page<Task> tasks = taskRepository.findByAssignedById(currentUser.getId(), pageable);
    return tasks.map(this::mapToResponse);
  }

  public TaskResponse getTaskById(Long taskId, User currentUser) {
    Task task =
        taskRepository
            .findById(taskId)
            .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

    if (currentUser.getRole() == Role.EMPLOYEE && !task.getAssignedEmployee().getId().equals(currentUser.getId())) {
      throw new ForbiddenException("Unauthorized to view this task.");
    }

//    if (currentUser.getRole() == Role.MANAGER && !task.getAssignedBy().getId().equals(currentUser.getId())) {
//      throw new ForbiddenException("Unauthorized to view this task.");
//    }

    return mapToResponse(task);
  }

  public TaskResponse createTask(TaskRequest taskRequest, User currentUser) {
    User assignedEmployee =
        userRepository
            .findById(taskRequest.getAssignedEmployeeId())
            .orElseThrow(() -> new ResourceNotFoundException("Employee not found."));

    Task task = new Task();

    task.setTitle(taskRequest.getTitle());
    task.setDescription(taskRequest.getDescription());
    task.setDeadline(taskRequest.getDeadline());

    task.setStatus(TaskStatus.OPEN);

    task.setAssignedEmployee(assignedEmployee);

    task.setAssignedBy(currentUser);

    Task savedTask = taskRepository.save(task);

    return mapToResponse(savedTask);
  }

  public TaskResponse updateTaskStatus(Long taskId, TaskStatusUpdateRequest req, User currentUser) {

    Task task =
        taskRepository
            .findById(taskId)
            .orElseThrow(() -> new ResourceNotFoundException("Task not found."));

    // ensure if user is employee, then can only update their own task only
    if (currentUser.getRole() == Role.EMPLOYEE
        && !task.getAssignedEmployee().getId().equals(currentUser.getId())) {
      throw new ForbiddenException("Unauthorized task status update");
    }

    TaskStatus currentStatus = task.getStatus();
    TaskStatus newStatus = req.getStatus();

    List<TaskStatus> allowedStatus = VALID_STATUS_TRANSITIONS.get(currentStatus);

    if (!allowedStatus.contains(newStatus)) {
      throw new ForbiddenException(
          "Invalid Status Change from " + currentStatus + " to " + newStatus);
    }

    Role role = currentUser.getRole();

    if (role == Role.EMPLOYEE && !EMPLOYEE_ALLOWED_STATUSES.contains(newStatus)) {
      throw new ForbiddenException("Employees cannot set status to " + newStatus);
    }

    if (role == Role.MANAGER && !MANAGER_ALLOWED_STATUSES.contains(newStatus)) {
      throw new ForbiddenException("Managers cannot set status to " + newStatus);
    }

    if (role == Role.ADMIN && !ADMIN_ALLOWED_STATUSES.contains(newStatus)) {
      throw new ForbiddenException("Admin cannot set status to " + newStatus);
    }

    if (role == Role.HR && !HR_ALLOWED_STATUSES.contains(newStatus)) {
      throw new ForbiddenException("HR cannot set status to " + newStatus);
    }

    task.setStatus(req.getStatus());

    Task savedTask = taskRepository.save(task);

    return mapToResponse(savedTask);
  }

  private TaskResponse mapToResponse(Task task) {
    TaskResponse taskResponse = new TaskResponse();

    taskResponse.setId(task.getId());

    taskResponse.setTitle(task.getTitle());

    taskResponse.setDescription(task.getDescription());

    taskResponse.setStatus(task.getStatus());

    taskResponse.setDeadline(task.getDeadline());

    taskResponse.setAssignedEmployeeName(task.getAssignedEmployee().getName());

    taskResponse.setAssignedByName(task.getAssignedBy().getName());

    return taskResponse;
  }
}
