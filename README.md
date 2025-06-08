#  Engineering Resource Management System (ERMS)

A modern, full-stack web application to manage engineers, projects, and assignments effectively, with role-based access, dashboards, and intelligent capacity tracking.

---

##  Overview

The **Engineering Resource Management System (ERMS)** is built to streamline resource management in engineering organizations. It empowers teams to:

-  Assign engineers to projects and monitor workload  
-  Visualize capacity and utilization via interactive dashboards  
-  Enforce secure, role-specific access for Admins, Managers, and Engineers  

This system was developed using modern technologies and enhanced through the support of **AI tools** including **ChatGPT**, **GitHub Copilot**, and **Grok (xAI)**—improving development speed, debugging, and documentation quality.

---

##  Key Features

- ** Interactive Dashboards** – Visualize capacity using Chart.js  
- ** Role-Based Access** – RBAC for Admin, Manager, Engineer roles  
- ** Capacity Tracking** – Monitor weekly availability and utilization  
- **🗕️ Assignment Management** – Assign engineers to projects and hours  
- ** Secure Auth** – JWT-based authentication and hashed passwords

---

## 🛠 Tech Stack

| Component        | Technologies                        |
|------------------|-------------------------------------|
| **Frontend**      | React, Tailwind CSS, Axios          |
| **Backend**       | Node.js, Express, Sequelize         |
| **Database**      | SQLite (for development)            |
| **Authentication**| JWT, bcrypt                         |
| **Charts**        | Chart.js                            |

---

##  Getting Started

###  Prerequisites

- Node.js (v16+)
- npm
- Git

---

###  Project Structure

```
erms-project/
├── backend/        # Node.js server, APIs, DB models
├── frontend/       # React app + Tailwind styling
├── seed.js         # Seeds database with sample data
└── README.md
```

---

###  Clone the Repository

```bash
git clone https://github.com/rohith887/engineering_resource_management_system.git
cd engineering_resource_management_system
```

---

###  Backend Setup

```bash
cd backend
npm install         # Install backend dependencies
node seed.js        # Seed test data
npm start           # Run backend server (http://localhost:3001)
```

---

###  Frontend Setup

```bash
cd frontend
npm install         # Install frontend dependencies
npm run start       # Start React app (http://localhost:3000)
```

---

###  Test User Credentials

| Role     | Email                    | Password      |
|----------|--------------------------|---------------|
| Admin    | admin@example.com        | password123   |
| Manager  | manager@example.com      | password123   |
| Engineer | engineer@example.com     | password123   |

---

##  Live Demo

### Local

- Open `http://localhost:3000`
- Log in with test users
- Explore dashboards and role-based features

> _Deploy URLs can be added here if hosted on platforms like Render/Vercel._

---

##  Screenshots

> _(Replace with actual screenshots)_

- Login Page  
- Dashboard with Capacity Chart  
- Engineer Assignment View  

---

##  Use of AI Tools

This project was built with the assistance of **Grok (xAI)**, **ChatGPT (OpenAI)**, and **GitHub Copilot** to streamline full-stack development.

###  Contributions by AI:

####  **Grok (xAI)**
- Guided overall structure and database schema design
- Provided Sequelize logic and model relationships
- Helped resolve CORS and port mismatch issues

####  **ChatGPT**
- Generated middleware, RBAC logic, and secure JWT auth flows
- Helped design assignment algorithms and dashboard logic
- Assisted in writing this professional README

####  **GitHub Copilot**
- Auto-completed repetitive boilerplate (e.g., routes, controller methods)
- Accelerated component and form creation in React
- Suggested improved error handling and API structures

---

##  Future Enhancements

-  Role-specific dashboards (e.g., project tracking, availability alerts)
-  Add logout and token refresh support
-  Deploy using Vercel (frontend) and Render (backend)
-  Add testing suite using Jest and Supertest
-  Integrate a calendar view for scheduling

---

##  License

Licensed under the **MIT License** – see the `LICENSE` file for details.

---

##  Author

**Rohith Komatireddy**  
 GitHub: [rohith887](https://github.com/rohith887)  
 Email: rohithkomatireddy051@gmail.com

---

 **Found this project helpful? Please star the repo!**  
*Feedback and contributions are warmly welcomed.*
