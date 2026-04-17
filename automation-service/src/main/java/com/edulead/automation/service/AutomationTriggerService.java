package com.edulead.automation.service;

import com.edulead.automation.model.AutomationRule;
import com.edulead.automation.model.AutomationTask;
import com.edulead.automation.model.EventType;
import com.edulead.automation.repository.AutomationRuleRepository;
import com.edulead.automation.repository.AutomationTaskRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AutomationTriggerService {

    private final AutomationRuleRepository ruleRepository;
    private final AutomationTaskRepository taskRepository;

    public AutomationTriggerService(AutomationRuleRepository ruleRepository, AutomationTaskRepository taskRepository) {
        this.ruleRepository = ruleRepository;
        this.taskRepository = taskRepository;
    }

    public void triggerEvent(EventType event, Long leadId) {
        List<AutomationRule> rules = ruleRepository.findByEventType(event);
        for (AutomationRule rule : rules) {
            AutomationTask task = new AutomationTask(
                    leadId,
                    rule.getActionType(),
                    LocalDateTime.now().plusDays(rule.getDelayDays())
            );
            taskRepository.save(task);
        }
    }

    public List<AutomationTask> getAllTasks() {
        return taskRepository.findAll();
    }
}

