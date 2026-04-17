package com.edulead.automation.model;

import jakarta.persistence.*;

@Entity
@Table(name = "automation_rules")
public class AutomationRule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private EventType eventType;

    private int delayDays;

    @Enumerated(EnumType.STRING)
    private ActionType actionType;

    private String templateId;

    public AutomationRule() {}

    public AutomationRule(EventType eventType, int delayDays, ActionType actionType, String templateId) {
        this.eventType = eventType;
        this.delayDays = delayDays;
        this.actionType = actionType;
        this.templateId = templateId;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public EventType getEventType() { return eventType; }
    public void setEventType(EventType eventType) { this.eventType = eventType; }
    public int getDelayDays() { return delayDays; }
    public void setDelayDays(int delayDays) { this.delayDays = delayDays; }
    public ActionType getActionType() { return actionType; }
    public void setActionType(ActionType actionType) { this.actionType = actionType; }
    public String getTemplateId() { return templateId; }
    public void setTemplateId(String templateId) { this.templateId = templateId; }
}
