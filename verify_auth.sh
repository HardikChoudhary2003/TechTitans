#!/bin/bash

# Start server in background
echo "Starting server..."
cd backend-patientauth
PORT=5001
export PORT
# We rely on .env for MONGO_URI, or we can assume the user set it.
# But since we are running from a script, we might need to load it or just let dotenv handle it.
# The user said they changed the link in .env.
node server.js &
SERVER_PID=$!
cd ..

echo "Waiting for server to start..."
sleep 5

# 1. Register
echo "1. Registering user..."
# Use a random email to avoid collision on retry
EMAIL="user_$(date +%s)@example.com"
REGISTER_RESPONSE=$(curl -s -X POST http://localhost:$PORT/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"John Doe\", \"email\": \"$EMAIL\", \"password\": \"password123\", \"role\": \"patient\"}")
echo "Register Response: $REGISTER_RESPONSE"

TOKEN=$(echo $REGISTER_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "Failed to get token from register"
  kill $SERVER_PID
  exit 1
fi

# 2. Login
echo "2. Logging in..."
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:$PORT/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$EMAIL\", \"password\": \"password123\"}")
echo "Login Response: $LOGIN_RESPONSE"

# 3. Get Me
echo "3. Getting Me..."
ME_RESPONSE=$(curl -s -X GET http://localhost:$PORT/auth/me \
  -H "Authorization: Bearer $TOKEN")
echo "Me Response: $ME_RESPONSE"

# Cleanup
kill $SERVER_PID
echo "Verification complete."
