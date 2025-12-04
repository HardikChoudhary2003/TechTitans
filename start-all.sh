#!/bin/bash

echo "Starting all services..."

# Function to open a new terminal tab/window
open_terminal() {
    TITLE=$1
    CMD=$2
    
    if command -v gnome-terminal &> /dev/null; then
        gnome-terminal --tab --title="$TITLE" -- bash -c "$CMD; exec bash"
    elif command -v xterm &> /dev/null; then
        xterm -T "$TITLE" -e "bash -c '$CMD; exec bash'" &
    elif command -v konsole &> /dev/null; then
        konsole --new-tab -e "bash -c '$CMD; exec bash'" &
    else
        echo "No supported terminal emulator found (gnome-terminal, xterm, konsole). Please run manually."
        echo "Command for $TITLE: $CMD"
    fi
}

open_terminal "Patient Backend (5000)" "cd backend-patientauth && npm start"
open_terminal "Provider Backend (5002)" "cd backend-providerpublic && npm start"
open_terminal "Patient Frontend (5173)" "cd frontend-patient && npm run dev"
open_terminal "Provider Frontend (5174)" "cd frontend-providerpublic && npm run dev"

echo "Attempted to launch all services."
