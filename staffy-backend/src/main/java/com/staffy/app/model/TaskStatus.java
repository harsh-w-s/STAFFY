package com.staffy.app.model;

public enum TaskStatus {
    OPEN,
    IN_PROGRESS,
    IN_REVIEW,
    RESOLVED,
    DONE,
    CLOSED
}

// DONE => Work finished by employee.
// CLOSED => Manager/admin verified and finalized.