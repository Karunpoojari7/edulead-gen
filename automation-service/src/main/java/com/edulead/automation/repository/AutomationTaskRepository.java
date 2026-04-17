package com.edulead.automation.repository;

import com.edulead.automation.model.AutomationTask;
import com.edulead.automation.model.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface AutomationTaskRepository extends JpaRepository<AutomationTask, Long> {
    List<AutomationTask> findByStatusAndScheduledTimeBefore(TaskStatus status, LocalDateTime time);
}
