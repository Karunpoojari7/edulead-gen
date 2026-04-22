package com.edulead.server.service;

import com.edulead.server.model.Lead;
import com.edulead.server.model.FollowUp;
import com.edulead.server.repository.FollowUpRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;

@Service
public class AiAutomationService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final FollowUpRepository followUpRepository;
    private static final String ML_SERVICE_URL = "http://localhost:8000/ml/predict";

    public AiAutomationService(FollowUpRepository followUpRepository) {
        this.followUpRepository = followUpRepository;
    }

    public MlResult getPrediction(Lead lead) {
        try {
            Map<String, Object> request = new HashMap<>();
            request.put("lead_id", lead.getId());
            request.put("source", lead.getSource());
            
            long daysSinceCreated = 0;
            if (lead.getCreatedAt() != null) {
                daysSinceCreated = ChronoUnit.DAYS.between(lead.getCreatedAt(), LocalDateTime.now());
            }
            request.put("days_since_created", daysSinceCreated);
            
            long interactionCount = followUpRepository.countByLeadId(lead.getId());
            request.put("interaction_count", interactionCount);
            request.put("status", lead.getStatus().name());

            ResponseEntity<MlResult> response = restTemplate.postForEntity(ML_SERVICE_URL, request, MlResult.class);
            return response.getBody();
        } catch (Exception e) {
            System.err.println("AI Service Error: " + e.getMessage());
            return null;
        }
    }

    public static class MlResult {
        private int score;
        private String category;
        private String action;

        public int getScore() { return score; }
        public void setScore(int score) { this.score = score; }
        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }
        public String getAction() { return action; }
        public void setAction(String action) { this.action = action; }
    }
}
