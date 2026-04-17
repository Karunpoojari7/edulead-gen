package com.edulead.automation;

import com.edulead.automation.model.ActionType;
import com.edulead.automation.model.AutomationRule;
import com.edulead.automation.model.EventType;
import com.edulead.automation.repository.AutomationRuleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class AutomationServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AutomationServiceApplication.class, args);
	}

	@Bean
	public CommandLineRunner setupRules(AutomationRuleRepository repository) {
		return (args) -> {
			if (repository.count() == 0) {
				// Day 1 -> Welcome Email (Delay 0 for immediate/Day 1 logic)
				repository.save(new AutomationRule(EventType.LEAD_CREATED, 0, ActionType.EMAIL, "WELCOME_TEMPLATE"));
				// Day 2 -> Call Reminder
				repository.save(new AutomationRule(EventType.LEAD_CREATED, 1, ActionType.CALL_REMINDER, "CALL_TEMPLATE"));
				// Day 5 -> SMS
				repository.save(new AutomationRule(EventType.LEAD_CREATED, 4, ActionType.SMS, "SMS_FOLLOWUP"));
				
				System.out.println("Default Automation Rules Seeded.");
			}
		};
	}
}
