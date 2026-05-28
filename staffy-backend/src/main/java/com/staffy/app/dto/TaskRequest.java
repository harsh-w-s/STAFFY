package com.staffy.app.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotNull
    @Future
    private LocalDate deadline;

    @NotNull
    private Long assignedEmployeeId;
}
