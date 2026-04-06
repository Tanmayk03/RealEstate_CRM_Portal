# RealEstate CRM Portal

A full‑stack **Real Estate CRM (Customer Relationship Management) Portal** built to manage leads, customers, properties, projects, contracts, tasks, and day‑to‑day business operations from a single dashboard.

This repository contains:

- **client/**: React + Vite frontend (TailwindCSS + Bootstrap UI)
- **backend/**: Node.js + Express API with MongoDB (Mongoose) and JWT authentication

---

## ✨ Key Features

### CRM & Operations
- Dashboard overview
- Customers management
- Leads management
- Support section
- Knowledge base
- Activity log

### Sales
- Proposals
- Estimates
- Invoices
- Payments
- Credit notes
- Sales overview

### Projects & Work
- Projects
- Tasks
- Calendar
- Announcements

### Finance
- Expenses
- Subscriptions
- Reports (Expenses vs Income, Sales, Timesheet overview, etc.)

### Real Estate Module
- Real estate dashboard
- Property owners
- Agents
- Business brokers
- Properties
- Tenants
- Approvals
- Buy requests
- Real estate reports

### Authentication
- Signup + Login
- Password hashing (bcrypt)
- JWT-based sessions

---

## 🧱 Tech Stack

**Frontend**
- React 18
- Vite
- React Router
- TailwindCSS + Bootstrap
- Recharts
- Drag & Drop: @hello-pangea/dnd

**Backend**
- Node.js
- Express
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- Joi validation
- dotenv

---

## 📸 Screenshots
<img width="1345" height="644" alt="image" src="https://github.com/user-attachments/assets/4c3b3463-c772-4074-ba31-d9b09d50d1c3" />
<img width="1350" height="643" alt="image" src="https://github.com/user-attachments/assets/56ed1302-4352-40dd-8b5e-1d5fb196301e" />
<img width="1352" height="638" alt="image" src="https://github.com/user-attachments/assets/0a6f5d8c-5d4e-47af-b405-6cfaf46cd327" />


## ✅ Prerequisites

- Node.js (LTS recommended)
- MongoDB (local or MongoDB Atlas)
- npm

---

## ⚙️ Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
PORT=8088
MONGO_URI=mongodb://localhost:27017/realestate_crm
JWT_SECRET=your_jwt_secret
```

---

## 🚀 Getting Started (Local Development)

### 1) Clone the repository

```bash
git clone https://github.com/Tanmayk03/RealEstate_CRM_Portal.git
cd RealEstate_CRM_Portal
```

### 2) Start the backend

```bash
cd backend
npm install
npm start
```

Backend runs on: `http://localhost:8088`

### 3) Start the frontend

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

Frontend runs on the Vite dev server (shown in terminal, typically `http://localhost:5173`).

---

## 🔌 API (Auth)

Base path: `/auth`

- `POST /auth/signup`
- `POST /auth/login`

---

## 🗂️ Project Structure

```
RealEstate_CRM_Portal/
  backend/
    Controllers/
    Middlewares/
    Models/
    Routes/
    index.js
  client/
    src/
    public/
    vite.config.js
  README.md
```

---

## 🧪 Scripts

### Backend
- `npm start` (nodemon)

### Frontend
- `npm run dev`
- `npm run build`
- `npm run preview`

---

## 🛠️ Troubleshooting

- **MongoDB connection error**: verify `MONGO_URI` in `backend/.env` and ensure MongoDB is running.
- **JWT errors**: set `JWT_SECRET` in `backend/.env`.
- **CORS issues**: confirm the frontend URL and backend URL match what you’re using locally.

---

## 📌 Roadmap / Ideas

- Role-based access (Admin/Agent/Staff)
- Protected routes in frontend
- More API modules for CRM entities (customers, properties, etc.)
- Deployment guides (Render/Vercel/Netlify)

---

## 🤝 Contributing

Contributions are welcome. Feel free to open an issue or submit a pull request with improvements.
