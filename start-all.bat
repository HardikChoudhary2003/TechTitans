@echo off
echo Starting all services...

start "Patient Backend (5000)" cmd /k "cd backend-patientauth && npm start"
start "Provider Backend (5002)" cmd /k "cd backend-providerpublic && npm start"
start "Patient Frontend (5173)" cmd /k "cd frontend-patient && npm run dev"
start "Provider Frontend (5174)" cmd /k "cd frontend-providerpublic && npm run dev"

echo All services launched in separate windows.
