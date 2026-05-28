package com.staffy.app.dto;

import com.staffy.app.model.TaskStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskResponse {

    private Long id;

    private String title;

    private String description;

    private TaskStatus status;

    private LocalDate deadline;

    private String assignedEmployeeName;

    private String assignedByName;
}
