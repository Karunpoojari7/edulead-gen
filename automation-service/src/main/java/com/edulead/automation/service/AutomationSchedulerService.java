package com.edulead.automation.service;

import com.edulead.automation.model.AutomationTask;
import com.edulead.automation.model.TaskStatus;
import com.edulead.automation.repository.AutomationTaskRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AutomationSchedulerService {

    private final AutomationTaskRepository taskRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    public AutomationSchedulerService(AutomationTaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Scheduled(cron = "0 * * * * *") // Every minute
    public void processPendingTasks() {
        List<AutomationTask> tasks = taskRepository.findByStatusAndScheduledTimeBefore(
                TaskStatus.PENDING, LocalDateTime.now()
        );

        for (AutomationTask task : tasks) {
            try {
                // Call notification service (Mock endpoint)
                String endpoint = "/notify/" + task.getActionType().name().toLowerCase();
                // restTemplate.postForLocation("http://localhost:8083" + endpoint, task);
                System.out.println("Executing Automation Task " + task.getId() + ": " + task.getActionType() + " for Lead " + task.getLeadId());
                
                task.setStatus(TaskStatus.DONE);
            } catch (Exception e) {
                task.setStatus(TaskStatus.FAILED);
                System.err.println("Failed to execute task " + task.getId() + ": " + e.getMessage());
            }
            taskRepository.save(task);
        }
    }
}
