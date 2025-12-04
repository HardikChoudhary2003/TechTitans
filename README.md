# Linear Flow & Approach to the Project

### Understanding the Problem Statement
We analyzed the PS and identified three key user groups: Patients, Healthcare Providers, and General Public. This conclusion led to building separate portals and a public module.

### Extracting Needs and Concluding the Solution Direction
The PS required patient tracking, provider feedback, and public advisory content. We finalized a dual-portal architecture addressing preventive healthcare end-to-end.

### Breaking the System into Functional Modules
We separated the solution into: Authentication, Patient vitals tracking, Goals & reminders, Provider monitoring, Feedback module, and Public advisory information.

### Selecting the Technology Stack
Chosen stack:  
- React (Frontend)  
- Node/Express or FastAPI (Backend)  
- MongoDB/SQL (Database)  
- JWT (Authentication)  
- Cloud Deployment (Netlify/Render)  

### Designing APIs Before UI Development
API contracts were drafted early so UI team and backend team could develop in parallel, using mock data first and binding live responses later.

### Wireframing UI & Structuring Pages
We defined page flows for Patients (Dashboard, Vitals, Goals), Providers (Monitoring, Feedback), and Public (Health Info, Facilities).

### Integration & Data Binding
Frontend integrated with backend services via REST APIs, replacing mock JSON with live data and validating role-based access.

### Deployment, Documentation & Deliverable Preparation
Services deployed, .env managed securely, and README documentation finalized for the final demonstration.

# Task & Execution Flow

---

## Patient Portal — Frontend

- Develop Patient Login Screen — `/patient/login`
- Build Patient Dashboard with KPIs, alerts, progress — `/patient/dashboard`
- Vitals Module — add, edit, graphs, history — `/patient/vitals`
- Goal Setup Page and Progress Visualization — `/patient/goals`
- Reminder Scheduling Interface — `/patient/reminders`
- Patient Profile Update Page — `/patient/profile`
- Emergency Contact Form — `/patient/emergency-contact`

---

## Provider Portal & Public Info — Frontend

- Provider Login Page — `/provider/login`
- Provider Dashboard — `/provider/dashboard`
- Patient List view with search and filters — `/provider/patients`
- Patient Detail view with vitals history — `/provider/patients/:id`
- Provider Notes submission screen — `/provider/patients/:id/notes`
- Public health information page — `/info/health`
- Hospitals and Vaccination Facilities page — `/info/facilities`

---

## Backend — Authentication + Patient APIs

- Register, Login, Fetch current user — `/auth/register`, `/auth/login`, `/auth/me`
- Manage Patient Profile — `/patient/profile`
- Vitals submission and historical fetch — `/patient/vitals`, `/patient/vitals/history`
- Track goals — `/patient/goals`
- Manage reminders — `/patient/reminders`
- Store emergency contact details — `/patient/emergency-contact`

---

## Backend — Provider APIs + Public APIs + DevOps

- Fetch patients and their vitals — `/provider/patients`, `/provider/patients/:id/vitals`
- Submit provider feedback notes — `/provider/patients/:id/notes`
- Provide patient compliance or risk score — `/provider/patients/:id/compliance`
- Public data for health info and facilities — `/public/info`, `/public/facilities`

---

