#!/bin/bash

# Base URL
BASE_URL="http://localhost:5000"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo "Starting Registration Verification..."

# 1. Register a new Patient
echo "1. Registering New Patient..."
PATIENT_EMAIL="new_patient_$(date +%s)@example.com"
RESPONSE=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"New Patient\",
    \"email\": \"$PATIENT_EMAIL\",
    \"password\": \"123456\",
    \"role\": \"patient\"
  }")

if echo "$RESPONSE" | grep -q "token"; then
  echo -e "${GREEN}Patient Registration Successful${NC}"
else
  echo -e "${RED}Patient Registration Failed${NC}"
  echo "Response: $RESPONSE"
  exit 1
fi

# 2. Register a new Provider
echo "2. Registering New Provider..."
PROVIDER_EMAIL="new_provider_$(date +%s)@example.com"
RESPONSE=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"New Provider\",
    \"email\": \"$PROVIDER_EMAIL\",
    \"password\": \"123456\",
    \"role\": \"provider\"
  }")

if echo "$RESPONSE" | grep -q "token"; then
  echo -e "${GREEN}Provider Registration Successful${NC}"
else
  echo -e "${RED}Provider Registration Failed${NC}"
  echo "Response: $RESPONSE"
  exit 1
fi

echo "Verification Complete."
