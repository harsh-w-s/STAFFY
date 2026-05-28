package com.staffy.app.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    private LocalDate deadline;

    @ManyToOne
    @JoinColumn(name = "assigned_employee_id")
    private User assignedEmployee;

    @ManyToOne
    @JoinColumn(name = "assigned_by_id")
    private User assignedBy;
}
