package com.edulead.server.service;

import com.edulead.server.model.Lead;
import com.edulead.server.repository.LeadRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class LeadService {

    private final LeadRepository leadRepository;

    public LeadService(LeadRepository leadRepository) {
        this.leadRepository = leadRepository;
    }

    public List<Lead> getAllLeads() {
        return leadRepository.findAll();
    }

    public Optional<Lead> getLeadById(Long id) {
        return leadRepository.findById(id);
    }

    private final org.springframework.web.client.RestTemplate restTemplate = new org.springframework.web.client.RestTemplate();


    private static final String AUTOMATION_SERVICE_URL = "http://localhost:8082/api/automation/trigger";

    public Lead createLead(Lead lead) {
        Lead savedLead = leadRepository.save(lead);
        
        // Trigger Automation Service
        try {
            java.util.Map<String, Object> payload = new java.util.HashMap<>();
            payload.put("event", "LEAD_CREATED");
            payload.put("leadId", savedLead.getId());
            restTemplate.postForEntity(AUTOMATION_SERVICE_URL, payload, String.class);
            System.out.println("Automation triggered for Lead ID: " + savedLead.getId());
        } catch (Exception e) {
            System.err.println("Failed to trigger automation: " + e.getMessage());
        }
        
        return savedLead;
    }


    public Lead updateLead(Long id, Lead leadDetails) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead not found with id: " + id));
        
        lead.setName(leadDetails.getName());
        lead.setEmail(leadDetails.getEmail());
        lead.setPhone(leadDetails.getPhone());
        lead.setSource(leadDetails.getSource());
        lead.setStatus(leadDetails.getStatus());
        lead.setScore(leadDetails.getScore());
        lead.setComments(leadDetails.getComments());
        
        return leadRepository.save(lead);
    }

    public void deleteLead(Long id) {
        leadRepository.deleteById(id);
    }
}
