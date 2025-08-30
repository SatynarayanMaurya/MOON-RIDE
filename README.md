# 🌙 Moon Ride - Analytical Dashboard

![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Tailwind](https://img.shields.io/badge/UI-TailwindCSS-06B6D4)
![Framer Motion](https://img.shields.io/badge/Animation-Framer%20Motion-ff69b4)

---

## 📌 Overview
**Moon Ride** is an **analytical dashboard application** that allows admins to visualize and manage data efficiently.  
It includes charts, graphs, user profile management, transaction tracking, schedules, and settings functionalities.  

The project is built with **MERN stack**, styled with **TailwindCSS**, animated using **Framer Motion**, and secured with **cookie-based authentication** (no local storage for tokens).  

---

## ✨ Features

### 🔐 Authentication
- Login / Sign Up with **Email & Password**
- **Google OAuth** sign-in and sign-up
- Hybrid login:
  - If a user signs up with Google but later wants to login manually, they must **set a password** first
- Secure **cookie-based token** authentication (no local storage used)
- Logout functionality implemented efficiently

### 📊 Dashboard
- Interactive analytics dashboard with **charts & graphs**
- Display of all data in a clean UI

### 👤 Profiles
- Add new user profiles
- View all added profiles under **Users Tab**

### 💳 Transactions
- Transactions tab to display static transactional data

### 📅 Schedules
- Static schedules tab to view/manage planned activities

### 🛠️ Settings
- Admin can update their profile
- Change or set a new password

### 🆘 Help & 📞 Contact
- Dedicated **Help** section with FAQs & guides
- **Contact** section with an animated contact form

---

## 🖼️ Screenshots

> Replace the below image links with actual project screenshots after running the app.

### Sign In
![Sign In Screenshot](https://drive.google.com/uc?export=view&id=1EVUio4_WJjgXH5zjjn8crpGkOB9RhEGd)


### Dashboard
![Dashboard Screenshot](https://drive.google.com/uc?export=view&id=1aUCfo3hzds3yP1cjXZGmFf_VyBqwa0m1)

### Schedules
![Schedules Screenshot](https://drive.google.com/uc?export=view&id=1EaJajuethXS2IVrMZQIGV_kTJMSi_XzW)

### Users
![Users Screenshot](https://drive.google.com/uc?export=view&id=1RF87vf65U1gvlfIWI05EuuA-9xoIpY7R)

### Settings
![Settings Screenshot](https://drive.google.com/uc?export=view&id=1pLE_FwdoMT10Di5v1Un5suHEuovfsv1N)

### Help
![Help Screenshot](https://drive.google.com/uc?export=view&id=128j7kEiDNR2-vNmUf382ZebYVWeGdn5g)

### Contact Us
![Contact us Screenshot](https://drive.google.com/uc?export=view&id=1-ku-eYAMUPIi0469qVNHf33d_UaIlKF4)

---

## 🛠️ Tech Stack

**Frontend**
- React.js
- TailwindCSS
- Framer Motion
- Recharts / Chart.js (for graphs)

**Backend**
- Node.js
- Express.js
- MongoDB with Mongoose

**Authentication**
- Google OAuth
- JWT (stored in **HTTP-only cookies**)

---

## ⚙️ Installation & Setup

### 🔽 Clone Repository
```bash
git clone https://github.com/SatynarayanMaurya/MOON-RIDE.git
cd MOON-RIDE
```
## 📦 Install Dependencies
### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

### 🔑 Environment Variables ( For backend ) 
```bash
PORT = 4000
DB_URI =" your_mongo_db_url"
JWT_SECRET = "Your_jwt_secret"
NODE_ENV = "development" || "production"
GOOGLE_CLIENT_ID =  "google_client_id"
GOOGLE_CLIENT_SECRET = "google_client_secret"
FRONTEND_URL = "http://localhost:5173"
BACKEND_URL = "http://localhost:4000"
SESSION_SECRET = "session_secret"
```
### 🔑 Environment Variables ( For Frontend ) 
```bash
VITE_BASE_URL=http://localhost:4000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## ▶️ Run the App
### Backend
```bash
cd backend
npm run dev
```
###  Frontend 
```bash
cd frontend
npm start
```
# Folder Structure
```bash
MOON-RIDE/
│
├── frontend/              # Frontend (React + Tailwind + Framer Motion)
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Dashboard, Users, Transactions, Schedules, Help, Contact, Settings
│   │   ├── redux/       # State management
│   │   ├── services/    # For connection between backend and frontend and all backend apis
│   │   └── App.js
│   └── package.json
│
├── backend/              # Backend (Node.js + Express + MongoDB)
│   ├── config/          # Database connection
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth middleware
│   ├── index.js
│   └── package.json
│
└── README.md
```

