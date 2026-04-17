# EduLead CRM System

A premium, scalable Lead Management & Admission CRM for educational institutions.

## 🚀 Getting Started

### Prerequisites
- Java 17+ (Java 21 recommended)
- Node.js 18+
- MySQL (Optional: defaults to H2 for development)

### Running the Frontend
```bash
cd client
npm install
npm run dev
```
Explore at: [http://localhost:3000](http://localhost:3000)

### Running the Backend
```bash
cd server
./mvnw spring-boot:run
```
API Documentation (H2 Console): [http://localhost:8080/h2-console](http://localhost:8080/h2-console)
(JDBC URL: `jdbc:h2:mem:eduleaddb`, User: `sa`, Pass: ``)

---

## 🏗️ Phase 1 Features
- [x] High-Aesthetic Dashboard (Next.js + Tailwind)
- [x] Sidebar Navigation & Stats Cards
- [x] Lead Management CRUD (Spring Boot)
- [x] In-memory H2 Database for rapid dev
- [x] Basic Security Configuration

Next Phase: Intelligent scoring and automated counselor assignment.
