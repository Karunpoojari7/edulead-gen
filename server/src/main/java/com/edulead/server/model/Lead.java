package com.edulead.server.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "leads")
public class Lead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String phone;
    private String source;
    
    @Enumerated(EnumType.STRING)
    private LeadStatus status;
    
    @Enumerated(EnumType.STRING)
    private LeadScore score;

    private String comments;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "assigned_to_id")
    private User assignedTo;


    public Lead() {}

    public Lead(String name, String email, String phone, String source, LeadStatus status, LeadScore score, String comments, LocalDateTime createdAt) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.source = source;
        this.status = status;
        this.score = score;
        this.comments = comments;
        this.createdAt = createdAt;
    }

    public Lead(Long id, String name, String email, String phone, String source, LeadStatus status, LeadScore score, String comments, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.source = source;
        this.status = status;
        this.score = score;
        this.comments = comments;
        this.createdAt = createdAt;
    }


    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (status == null) status = LeadStatus.NEW;
        if (score == null) score = LeadScore.COLD;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }
    public LeadStatus getStatus() { return status; }
    public void setStatus(LeadStatus status) { this.status = status; }
    public LeadScore getScore() { return score; }
    public void setScore(LeadScore score) { this.score = score; }
    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public User getAssignedTo() { return assignedTo; }
    public void setAssignedTo(User assignedTo) { this.assignedTo = assignedTo; }


    public enum LeadStatus {
        NEW, CONTACTED, FOLLOW_UP, APPLIED, ADMITTED, DROPPED
    }

    public enum LeadScore {
        HOT, WARM, COLD
    }

    public static LeadBuilder builder() {
        return new LeadBuilder();
    }

    public static class LeadBuilder {
        private String name;
        private String email;
        private String phone;
        private String source;
        private LeadStatus status;
        private LeadScore score;

        public LeadBuilder name(String name) { this.name = name; return this; }
        public LeadBuilder email(String email) { this.email = email; return this; }
        public LeadBuilder phone(String phone) { this.phone = phone; return this; }
        public LeadBuilder source(String source) { this.source = source; return this; }
        public LeadBuilder status(LeadStatus status) { this.status = status; return this; }
        public LeadBuilder score(LeadScore score) { this.score = score; return this; }
        public Lead build() {
            Lead lead = new Lead();
            lead.setName(name);
            lead.setEmail(email);
            lead.setPhone(phone);
            lead.setSource(source);
            lead.setStatus(status);
            lead.setScore(score);
            return lead;
        }
    }
}
