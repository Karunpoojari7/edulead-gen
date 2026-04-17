# 🚀 EduLead CRM Implementation Plan

## 📌 Project Overview
A high-performance Lead Management & Admission CRM designed for educational institutions, featuring intelligent scoring, automated assignments, and real-time analytics.

---

## 🎨 Design System
- **Theme**: Modern Dark/Light mode support with a focus on "Glassmorphism".
- **Colors**: Deep Royal Blue (#1E3A8A), Slate Gray (#64748B), Soft Emerald (#10B981).
- **Typography**: Inter / Outfit (Google Fonts).
- **Components**: Sidebar Navigation, Glassy Cards, Interactive Tables, Status Badges (HOT/WARM/COLD).

---

## 🛠️ Phase 1: Core Foundation (Current)
- [ ] **Frontend**: Next.js 14 setup with Tailwind CSS.
- [ ] **Dashboard UI**: Sidebar, Stats Overview, and Lead Table.
- [ ] **Backend**: Spring Boot Monolith (Web, JPA, MySQL, Security).
- [ ] **Auth**: JWT-based login/signup for Roles: ADMIN, COUNSELLOR, MARKETING.
- [ ] **Lead CRUD**: Basic Create, Read, Update, Delete for Leads.

## 🧠 Phase 2: Intelligent Processing
- [ ] **Lead Ingestion**: REST API & Excel Import logic.
- [ ] **Scoring Engine**: Rule-based scoring (HOT/WARM/COLD) based on source and activity.
- [ ] **Assignment**: Round-robin logic to distribute leads to active counsellors.

## 🔁 Phase 3: Engagement & Automation
- [ ] **Follow-up System**: Task creation, due dates, and reminders.
- [ ] **Notification Service**: Integration with Email (SMTP), SMS, and WhatsApp API.
- [ ] **Activity Timeline**: Log every interaction (Call, Email, Status Change).

## 📊 Phase 4: Analytics & Funnel
- [ ] **Conversion Reports**: Funnel visualization (Lead -> Contacted -> Applied -> Admitted).
- [ ] **Counsellor Performance**: Lead handling time and conversion rates.
- [ ] **Export Utils**: PDF/Excel report generation.

## ☁️ Phase 5: Microservices Migration
- [ ] **Service Extraction**: Split Lead, Scoring, and Notification into independent services.
- [ ] **Infrastructure**: Spring Cloud Gateway, Eureka Service Discovery.
- [ ] **Messaging**: Kafka integration for async lead processing.

---

## 🗄️ Database Schema (Initial)
```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE,
  password VARCHAR(255),
  role ENUM('ADMIN', 'COUNSELLOR', 'MARKETING'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE leads (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(20),
  source VARCHAR(50),
  status VARCHAR(20), -- NEW, CONTACTED, FOLLOW-UP, APPLIED, ADMITTED
  score_tag ENUM('HOT', 'WARM', 'COLD'),
  assigned_to_id BIGINT,
  FOREIGN KEY (assigned_to_id) REFERENCES users(id)
);
```
