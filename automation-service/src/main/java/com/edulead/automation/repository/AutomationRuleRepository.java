package com.edulead.automation.repository;

import com.edulead.automation.model.AutomationRule;
import com.edulead.automation.model.EventType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AutomationRuleRepository extends JpaRepository<AutomationRule, Long> {
    List<AutomationRule> findByEventType(EventType eventType);
}
