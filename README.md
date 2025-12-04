# Healthcare Wellness Portal

A comprehensive healthcare platform designed to bridge the gap between patients and healthcare providers. This monorepo contains the source code for the Patient App, Provider App, and their respective backend services.

## 🚀 Features

### Patient App
- **Dashboard**: View real-time vitals, active goals, and health tips.
- **Vitals Tracking**: Log and visualize health metrics (Heart Rate, BP, etc.) with interactive graphs.
- **Wellness Goals**: Set and track progress on health goals.
- **Reminders**: Schedule preventive care and medication reminders.
- **Emergency Contacts**: Manage emergency contact information.
- **Secure Auth**: JWT-based authentication for secure access.

### Provider App
- **Dashboard**: Overview of total patients, high-risk cases, and daily consultations.
- **Patient Management**: View patient list with calculated Risk Levels and Age.
- **Patient Details**: Access detailed patient profiles, vitals history, and add clinical notes.
- **Analytics**: Visual graphs for patient growth and trends.
- **Secure Auth**: Dedicated provider login and role-based access.

## 📂 Project Structure

- **`frontend-patient`**: React + Vite application for Patients.
- **`frontend-providerpublic`**: React + Vite application for Providers.
- **`backend-patientauth`**: Node.js/Express service for Patient Auth & Data (Port 5000).
- **`backend-providerpublic`**: Node.js/Express service for Provider Auth & Data (Port 5002).

## 🛠️ Getting Started

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB (Local or Atlas URI)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/HardikChoudhary2003/TechTitans.git
    cd TechTitans
    ```

2.  **Install Dependencies:**
    You need to install dependencies for all 4 folders.
    ```bash
    cd backend-patientauth && npm install && cd ..
    cd backend-providerpublic && npm install && cd ..
    cd frontend-patient && npm install && cd ..
    cd frontend-providerpublic && npm install && cd ..
    ```

3.  **Environment Setup:**
    Create a `.env` file in both backend directories (`backend-patientauth` and `backend-providerpublic`) with the following:
    ```env
    PORT=5000 # (or 5002 for provider backend)
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

### ▶️ Running the Application

To run the full system, you need to start 4 separate terminals:

**Terminal 1: Patient Backend**
```bash
cd backend-patientauth
npm start
# Runs on http://localhost:5000
```

**Terminal 2: Provider Backend**
```bash
cd backend-providerpublic
npm start
# Runs on http://localhost:5002
```

**Terminal 3: Patient Frontend**
```bash
cd frontend-patient
npm run dev
# Runs on http://localhost:5173
```

**Terminal 4: Provider Frontend**
```bash
cd frontend-providerpublic
npm run dev
# Runs on http://localhost:5174
```

## 🧪 Demo Credentials

- **Patient Login**: Register a new user or use existing credentials.
- **Provider Login**: Register a new provider or use existing credentials.

## 📝 License
This project is licensed under the MIT License.
