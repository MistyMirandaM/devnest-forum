# DevNest Forum

This project is a simple 3-tier web application that allows users to register and log in.

The project uses:

React (frontend)  
Node.js + Express (backend)  
MySQL (database)

Passwords are hashed using bcrypt before being stored in the database.

---

## How to run the project

### 1. Run the database script

Run the following SQL in MySQL Workbench:

CREATE DATABASE devnest;

USE devnest;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

---

### 2. Start the backend

Navigate to the server folder:

cd server

Install dependencies:

npm install

Start the server:

node server.js

The server will run on:

http://localhost:5000

---

### 3. Start the frontend

Navigate to the client folder:

cd client

Install dependencies:

npm install

Start React:

npm start

The frontend will run on:

http://localhost:3000

---

## Features

- User registration
- User login
- Password hashing with bcrypt
- MySQL database storage
- Simple dashboard after login