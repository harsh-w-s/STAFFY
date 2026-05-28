package com.staffy.app.dto;

import com.staffy.app.model.TaskStatus;
import lombok.Data;

@Data
public class TaskStatusUpdateRequest {

    private TaskStatus status;
}
