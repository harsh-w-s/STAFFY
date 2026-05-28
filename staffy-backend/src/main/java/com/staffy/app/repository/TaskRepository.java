package com.staffy.app.repository;

import com.staffy.app.model.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {

    Page<Task> findByAssignedEmployeeId(Long employeeId, Pageable pageable);

    Page<Task> findByAssignedById(Long employeeId, Pageable pageable);
}
