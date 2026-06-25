# ✈️ AI Travel Planner (Frontend)

<div align="center">

![Voyago](https://img.shields.io/badge/Voyago-Travel_AI-4f46e5?style=for-the-badge&logo=react&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

**Your next adventure, perfectly planned — powered by AI**

[🌐 Live Demo](https://travelplanner-one-phi.vercel.app/) · [⚙️ Backend Repo](https://github.com/Abhi27-27/Travelplanner-backend) · [🐛 Report Bug](https://github.com/Abhi27-27/Travelplanner/issues)

</div>

---

## 📌 Overview

AI-powered travel planning platform where users enter a destination, trip duration, budget, and interests — and receive a personalized day-by-day itinerary in seconds. This repository contains the **React frontend**.

---

## 🚀 Live Demo

> **Deployed on Vercel:** [https://travelplanner-one-phi.vercel.app/](https://travelplanner-one-phi.vercel.app/)

---

## ✨ Features

- 🤖 **AI Itinerary Generation** — Llama 3 via Groq API creates detailed day-by-day travel plans
- 🗺️ **Interactive Maps** — Embedded Google Maps preview updates with your destination
- 💾 **Save Trips** — Store generated itineraries to your personal dashboard
- 📚 **My Trips Library** — Browse and revisit all saved itineraries with gradient trip cards
- 🔐 **JWT Authentication** — Secure login/signup with persistent sessions via localStorage
- 🛡️ **Protected Routes** — Planner and My Trips pages require authentication
- 📱 **Fully Responsive** — Mobile-first design with smooth animations

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18 |
| Build Tool | Vite |
| Styling | Tailwind CSS v4 |
| Routing | React Router DOM v6 |
| HTTP Client | Axios |
| State Management | React Context API (Auth) |
| Deployment | Vercel |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx            # Top navigation bar
│   ├── Footer.jsx            # Site footer
│   ├── AuthLayout.jsx        # Split-screen auth page wrapper
│   ├── Logo.jsx              # Voyago logo component
│   ├── LoadingSpinner.jsx    # Reusable spinner
│   └── ProtectedRoute.jsx    # Auth guard for private pages
├── context/
│   └── AuthContext.jsx       # Global auth state + localStorage sync
├── features/
│   └── planner/
│       └── components/
│           ├── SelectionForm.jsx      # Trip input form (destination, days, budget)
│           └── ItineraryTimeline.jsx  # Day-by-day itinerary display
├── pages/
│   ├── Home.jsx              # Landing page with hero + features
│   ├── PlannerPage.jsx       # Main planner UI with map + timeline
│   ├── MyTrips.jsx           # Saved trips dashboard
│   ├── LoginPage.jsx         # Login form
│   └── SignupPage.jsx        # Registration form
└── main.jsx                  # App entry point with AuthProvider
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- Backend server running (see [Backend Repo](https://github.com/Abhi27-27/Travelplanner-backend))

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Abhi27-27/Travelplanner.git
cd Travelplanner

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root:

```env
VITE_API_URL=http://localhost:5000
```

> For production, set `VITE_API_URL` to your deployed backend URL.

### Run Locally

```bash
npm run dev
```

App runs at `http://localhost:5173`

---

## 🔗 Backend

This frontend connects to the Voyago REST API powered by Node.js, Express, and MongoDB.

> **Backend Repository:** [https://github.com/Abhi27-27/Travelplanner-backend](https://github.com/Abhi27-27/Travelplanner-backend)

Make sure the backend is running before starting the frontend locally.

---

## 🚢 Deployment

Deployed on **Vercel**. The `vercel.json` rewrite rule handles client-side routing:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
Made with ❤️ by <a href="https://github.com/Abhi27-27">Marreddy Abhiram Muni Reddy</a> · IIT Kharagpur
</div>
