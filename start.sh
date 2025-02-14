#!/bin/bash

# Navigate to client directory and start client
echo "Starting client..."
cd client || { echo "Client directory not found"; exit 1; }
yarn install && yarn dev &

# Navigate to server directory and start server
echo "Starting server..."
cd ../server || { echo "Server directory not found"; exit 1; }
pip install -r requirements.txt && uvicorn app.main:app --reload
