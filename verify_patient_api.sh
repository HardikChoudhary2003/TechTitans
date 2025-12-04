#!/bin/bash

# Start server in background
echo "Starting server..."
cd backend-patientauth
PORT=5001
export PORT
# Assumes .env is set up correctly or environment variables are available
node server.js &
SERVER_PID=$!
cd ..

echo "Waiting for server to start..."
sleep 5

# 1. Register/Login to get token
echo "1. Authenticating..."
EMAIL="patient_$(date +%s)@example.com"
AUTH_RESPONSE=$(curl -s -X POST http://localhost:$PORT/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"Patient Zero\", \"email\": \"$EMAIL\", \"password\": \"password123\", \"role\": \"patient\"}")
TOKEN=$(echo $AUTH_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "Failed to get token"
  kill $SERVER_PID
  exit 1
fi
echo "Token received."

# 2. Add Vital
echo "2. Adding Vital..."
VITAL_RESPONSE=$(curl -s -X POST http://localhost:$PORT/patient/vitals \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"type": "heart_rate", "value": "75", "unit": "bpm"}')
echo "Vital Response: $VITAL_RESPONSE"

# 3. Get Vitals History
echo "3. Getting Vitals History..."
HISTORY_RESPONSE=$(curl -s -X GET http://localhost:$PORT/patient/vitals/history \
  -H "Authorization: Bearer $TOKEN")
echo "History Response: $HISTORY_RESPONSE"

# 4. Add Goal
echo "4. Adding Goal..."
GOAL_RESPONSE=$(curl -s -X POST http://localhost:$PORT/patient/goals \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"description": "Walk 10k steps", "targetDate": "2025-12-31"}')
echo "Goal Response: $GOAL_RESPONSE"

# 5. Get Goals
echo "5. Getting Goals..."
GOALS_RESPONSE=$(curl -s -X GET http://localhost:$PORT/patient/goals \
  -H "Authorization: Bearer $TOKEN")
echo "Goals Response: $GOALS_RESPONSE"

# Cleanup
kill $SERVER_PID
echo "Verification complete."
