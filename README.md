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
