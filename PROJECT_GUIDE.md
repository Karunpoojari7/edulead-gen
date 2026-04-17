# 📂 EduLead CRM Project Structure

This project is organized into two primary pillars to ensure maximum scalability and clean separation of concerns.

## 📁 1. /client (The Frontend)
Built with **Next.js 14**, **Tailwind CSS**, and **Lucide Icons**.
- **`src/app/`**: Contains all page routes (`/`, `/leads`, `/calls`, etc.).
- **`src/components/`**: Reusable UI components (Modals, Sidebar, Cards).
- **`src/hooks/`**: Business logic and state (Leads management).
- **`src/lib/`**: Styling utilities and shared functions.

## 📁 2. /server (The Backend)
Built with **Spring Boot 3.4.2** and **H2 Database**.
- **`model/`**: Lead Entity & Data structures.
- **`controller/`**: REST API endpoints for communication.
- **`service/`**: Core logic for lead processing.
- **`repository/`**: Database connection layer.
- **`config/`**: Security and CORS settings.

---

## 🚀 Recommended Workspace Setup
To view this structure in its best manner:
1.  Open your IDE (e.g., VS Code or IntelliJ).
2.  Select **Open Folder**.
3.  Navigate to: `C:\Users\Karun Poojari\.gemini\antigravity\scratch\edulead-crm`
4.  **Confirm**: You should see only two folders (`client` and `server`) and this guide.

---

## 🛠️ Phase 1 Summary
- [x] Dashboard with high-aesthetic design.
- [x] Functional "Add Lead" Modal.
- [x] Sidebar navigation with Coming Soon modules.
- [x] Java JDK 25 compatibility fixes (Standard Java boilerplate instead of Lombok).
