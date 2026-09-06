# 🎥 Sabka Video Call

A full-stack real-time video conferencing web application inspired by modern meeting platforms. Sabka Video Call allows users to create and join video meetings, communicate in real time, and maintain meeting activity history.

## 🚀 Live Project

> Add your deployed application URL here after deployment.

**GitHub Repository:**
https://github.com/Manishvetal95/Sabka-Video-Call

---

## 📌 Project Overview

Sabka Video Call is a full-stack video calling application built using **React.js, Node.js, Express.js, Socket.IO, and MongoDB**.

The project provides a complete flow for user authentication, meeting creation/joining, real-time communication, and meeting history management.

The main goal of this project is to understand how real-time communication applications work using WebSockets, REST APIs, authentication, and database management.

---

## ✨ Features

### 👤 User Authentication

* User registration
* User login
* Password hashing using bcrypt
* Token-based authentication
* Protected application pages
* User session handling

### 🎥 Video Meetings

* Create a meeting
* Join a meeting using a meeting code
* Real-time video communication
* Real-time audio communication
* Multiple participants
* Camera and microphone controls
* Meeting interface

### 💬 Real-Time Communication

* Real-time communication using Socket.IO
* WebSocket-based connection
* Participant synchronization
* Real-time meeting events

### 📋 Meeting History

* Store previous meeting activity
* Retrieve user meeting history
* Associate meetings with authenticated users
* Display previous meeting codes

### 🗄️ Database

* MongoDB Atlas integration
* User information storage
* Meeting history storage
* Mongoose schemas and models

---

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Vite
* Axios
* Material UI
* React Router

### Backend

* Node.js
* Express.js
* Socket.IO
* REST API
* Mongoose
* bcrypt
* dotenv
* CORS

### Database

* MongoDB
* MongoDB Atlas

### Development Tools

* Git
* GitHub
* Visual Studio Code / IntelliJ IDEA
* Nodemon
* npm

---

## 🏗️ Project Architecture

```text
Sabka-Video-Call/
│
├── Backend/
│   │
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── socketManager.js
│   │   │   └── user.controllers.js
│   │   │
│   │   ├── models/
│   │   │   ├── meeting.model.js
│   │   │   └── user.model.js
│   │   │
│   │   ├── routes/
│   │   │   └── users.routes.js
│   │   │
│   │   └── app.js
│   │
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
│
├── Frontend/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── authentication.jsx
│   │   │   ├── home.jsx
│   │   │   ├── landing.jsx
│   │   │   ├── history.jsx
│   │   │   └── VideoMeet.jsx
│   │   │
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

# 🔄 Application Flow

```text
                    ┌──────────────────┐
                    │      User        │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ React Frontend   │
                    │     Vite         │
                    └────────┬─────────┘
                             │
                  REST API / Socket.IO
                             │
                             ▼
                    ┌──────────────────┐
                    │ Express Backend  │
                    │    Node.js       │
                    └───────┬──────────┘
                            │
              ┌─────────────┴─────────────┐
              ▼                           ▼
      ┌────────────────┐          ┌────────────────┐
      │   MongoDB      │          │   Socket.IO    │
      │     Atlas      │          │ Real-Time      │
      │                │          │ Communication  │
      └────────────────┘          └────────────────┘
```

---

# 🔐 Authentication Flow

```text
User
 │
 ├── Register
 │      │
 │      ▼
 │   Express API
 │      │
 │      ▼
 │   bcrypt hashing
 │      │
 │      ▼
 │   MongoDB
 │
 └── Login
        │
        ▼
     Express API
        │
        ▼
   Verify password
        │
        ▼
   Generate token
        │
        ▼
   Frontend stores token
```

Passwords are never stored as plain text. They are hashed using **bcrypt** before being stored in MongoDB.

---

# 🎥 Meeting Flow

```text
User
 │
 ▼
Login
 │
 ▼
Home Page
 │
 ├── Create Meeting
 │
 └── Join Meeting
          │
          ▼
      Meeting Code
          │
          ▼
      Video Meeting
          │
          ▼
       Socket.IO
          │
          ▼
 Real-Time Participants
```

---

# 📡 API Endpoints

Base URL:

```text
http://localhost:8000/api/v1/users
```

### Register

```http
POST /register
```

Request:

```json
{
  "name": "Test User",
  "username": "testuser",
  "password": "password123"
}
```

Response:

```json
{
  "message": "User Registered"
}
```

---

### Login

```http
POST /login
```

Request:

```json
{
  "username": "testuser",
  "password": "password123"
}
```

Response:

```json
{
  "token": "generated-authentication-token"
}
```

---

### Add Meeting Activity

```http
POST /add_to_activity
```

Request:

```json
{
  "token": "user-token",
  "meeting_code": "ABC123"
}
```

---

### Get Meeting History

```http
GET /get_all_activity?token=user-token
```

Returns the user's previous meeting activity.

---

# ⚙️ Installation

## Prerequisites

Make sure you have installed:

* Node.js
* npm
* Git
* MongoDB Atlas account

---

## 1. Clone the Repository

```bash
git clone https://github.com/Manishvetal95/Sabka-Video-Call.git
```

Move into the project:

```bash
cd Sabka-Video-Call
```

---

# 🖥️ Backend Setup

Go to the Backend directory:

```bash
cd Backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the Backend directory:

```text
Backend/.env
```

Add:

```env
MONGO_URI=your_mongodb_connection_string
PORT=8000
```

Then start the backend:

```bash
npm run dev
```

Backend will run on:

```text
http://localhost:8000
```

---

# 🌐 Frontend Setup

Open another terminal.

Go to the Frontend directory:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Vite will provide a local URL, usually:

```text
http://localhost:5173
```

Open that URL in your browser.

---

# 🔑 Environment Variables

The project uses environment variables to protect sensitive information.

Create:

```text
Backend/.env
```

Example:

```env
MONGO_URI=your_mongodb_connection_string
PORT=8000
```

**Never commit `.env` to GitHub.**

The repository includes:

```text
Backend/.env.example
```

as a template.

---

# 🗄️ MongoDB Setup

1. Create a MongoDB Atlas account.
2. Create a cluster.
3. Create a database user.
4. Obtain your MongoDB connection string.
5. Add the connection string to `Backend/.env`.
6. Use the `test` database or another database of your choice.

Example:

```text
MongoDB Atlas
     │
     ▼
zoomclone cluster
     │
     ▼
test database
     │
     ├── users
     │
     └── meetings
```

---

# 🧪 Testing

After starting both servers:

### Backend

```bash
cd Backend
npm run dev
```

### Frontend

```bash
cd Frontend
npm run dev
```

Then:

1. Open the frontend.
2. Create a new account.
3. Login.
4. Create or join a meeting.
5. Test camera and microphone.
6. Join from another browser/device to test multiple participants.
7. Check meeting history.

---

# 🔒 Security

This project follows basic security practices including:

* Password hashing using bcrypt
* Environment variables for database credentials
* `.gitignore` for sensitive files
* Token-based authentication
* MongoDB Atlas authentication

### Important

Never commit the following to GitHub:

```text
.env
database passwords
API keys
private tokens
secret keys
```

---

# 🚧 Future Improvements

Possible future improvements include:

* [ ] Deploy frontend
* [ ] Deploy backend
* [ ] Add HTTPS
* [ ] Improve authentication security
* [ ] Add refresh tokens
* [ ] Add email verification
* [ ] Add password reset
* [ ] Improve meeting UI
* [ ] Add screen sharing
* [ ] Add chat during meetings
* [ ] Add meeting recording
* [ ] Add meeting scheduling
* [ ] Add participant management
* [ ] Add meeting invitations
* [ ] Add responsive mobile UI
* [ ] Add automated testing
* [ ] Add CI/CD pipeline

---

# 📚 What I Learned

Through this project, I worked with:

* React component architecture
* React Context API
* React Router
* REST APIs
* Axios
* Node.js
* Express.js
* MongoDB and Mongoose
* MongoDB Atlas
* Socket.IO
* Real-time communication
* Authentication
* Password hashing
* Environment variables
* Git and GitHub
* Full-stack application development

---

# 👨‍💻 Author

**Manish Vetal**

GitHub:
https://github.com/Manishvetal95

Project:
https://github.com/Manishvetal95/Sabka-Video-Call

---

# ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is created for educational and portfolio purposes.
