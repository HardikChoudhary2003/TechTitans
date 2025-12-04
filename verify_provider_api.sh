#!/bin/bash

# Start patient auth server
echo "Starting patient auth server..."
cd backend-patientauth
PORT=5000
export PORT
node server.js > /dev/null 2>&1 &
PATIENT_SERVER_PID=$!
cd ..

# Start provider server
echo "Starting provider server..."
cd backend-providerpublic
PORT=5002
export PORT
node server.js > /dev/null 2>&1 &
PROVIDER_SERVER_PID=$!
cd ..

echo "Waiting for servers to start..."
sleep 5

# 1. Register Patient
echo "1. Registering Patient..."
PATIENT_EMAIL="patient_$(date +%s)@example.com"
PATIENT_RES=$(curl -s -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"Test Patient\", \"email\": \"$PATIENT_EMAIL\", \"password\": \"password123\", \"role\": \"patient\"}")
PATIENT_ID=$(echo $PATIENT_RES | grep -o '"_id":"[^"]*' | cut -d'"' -f4)
echo "Patient Registered: $PATIENT_ID"

# 2. Register Provider
echo "2. Registering Provider..."
PROVIDER_EMAIL="provider_$(date +%s)@example.com"
PROVIDER_RES=$(curl -s -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"Test Provider\", \"email\": \"$PROVIDER_EMAIL\", \"password\": \"password123\", \"role\": \"provider\"}")
PROVIDER_TOKEN=$(echo $PROVIDER_RES | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$PROVIDER_TOKEN" ]; then
  echo "Failed to get provider token"
  kill $PATIENT_SERVER_PID
  kill $PROVIDER_SERVER_PID
  exit 1
fi
echo "Provider Token received."

# 3. Get Patients (Provider API)
echo "3. Getting Patients (Provider API)..."
PATIENTS_RES=$(curl -s -X GET http://localhost:5002/provider/patients \
  -H "Authorization: Bearer $PROVIDER_TOKEN")
echo "Patients Response: $PATIENTS_RES"

# 4. Get Patient Vitals (Provider API)
# First add a vital for the patient using patient API
PATIENT_TOKEN=$(echo $PATIENT_RES | grep -o '"token":"[^"]*' | cut -d'"' -f4)
curl -s -X POST http://localhost:5000/patient/vitals \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $PATIENT_TOKEN" \
  -d '{"type": "heart_rate", "value": "80", "unit": "bpm"}' > /dev/null

echo "4. Getting Patient Vitals (Provider API)..."
VITALS_RES=$(curl -s -X GET http://localhost:5002/provider/patients/$PATIENT_ID/vitals \
  -H "Authorization: Bearer $PROVIDER_TOKEN")
echo "Vitals Response: $VITALS_RES"

# Cleanup
kill $PATIENT_SERVER_PID
kill $PROVIDER_SERVER_PID
echo "Verification complete."
