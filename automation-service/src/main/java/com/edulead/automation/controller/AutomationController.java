package com.edulead.automation.controller;

import com.edulead.automation.model.EventType;
import com.edulead.automation.service.AutomationTriggerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/automation")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class AutomationController {


    private final AutomationTriggerService triggerService;

    public AutomationController(AutomationTriggerService triggerService) {
        this.triggerService = triggerService;
    }

    @GetMapping("/tasks")
    public ResponseEntity<java.util.List<com.edulead.automation.model.AutomationTask>> getAllTasks() {
        return ResponseEntity.ok(triggerService.getAllTasks());
    }

    @PostMapping("/trigger")

    public ResponseEntity<String> triggerAutomation(@RequestBody Map<String, Object> payload) {
        try {
            String eventStr = (String) payload.get("event");
            Long leadId = Long.valueOf(payload.get("leadId").toString());
            
            EventType event = EventType.valueOf(eventStr);
            triggerService.triggerEvent(event, leadId);
            
            return ResponseEntity.ok("Automation triggered for " + event);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}
