# Travel Planner Platform - Frontend

A web app that builds a day-by-day travel itinerary from a few inputs. You enter a
destination, the number of days, a budget level and your interests, and it generates
a plan using an AI model, shows a map of the place, and lets you save trips to your
account to open again later.

This is the frontend repo, built with React and Vite. It talks to a separate Express
API (the backend repo).

## Tech stack

- React 19 with Vite
- React Router for navigation
- Context API for auth state
- Tailwind CSS for styling
- axios for API calls

## Features

- Account sign up and login
- Itinerary generation from a destination, a day count (1 to 14), a budget and
  interests
- A Google Map next to the itinerary that updates to the chosen destination
- Save a generated trip and view all saved trips on a separate page
- Protected pages that redirect to login when you are not signed in

## How it connects to the backend

The app keeps the logged-in user (and their token) in an auth context and in the
browser's local storage. Protected requests send the token in the Authorization
header.

Generating a trip works like this:

```
the planner form collects destination, days, budget, interests
        -> POST /api/planner/generate  (with the token)
        -> the backend returns the itinerary as JSON
        -> the timeline component renders it day by day
        -> the map updates to the destination
```

Saving a trip sends it to POST /api/planner/save, and the My Trips page loads them
from GET /api/planner/saved.

## Project structure

```
src/
  main.jsx                 entry point, wraps the app in the auth provider
  App.jsx                  routes: home, planner, login, signup, my-trips
  context/
    AuthContext.jsx        holds the user and login/logout, persists to storage
  components/
    ProtectedRoute.jsx     sends logged-out users to the login page
    Navbar, Footer, ...    shared layout
  pages/
    Home.jsx               landing page
    PlannerPage.jsx        the main page: form, map and itinerary
    MyTrips.jsx            saved trips
    LoginPage.jsx
    SignupPage.jsx
  features/
    planner/components/
      SelectionForm.jsx        inputs, including the 1 to 14 day slider
      ItineraryTimeline.jsx    renders the generated plan
```

## Getting started

### Prerequisites

- Node.js 18 or newer
- The backend running (locally or deployed)

### Install and run

```bash
npm install
npm run dev
```

Vite starts the dev server on http://localhost:5173.

### Environment variables

If the backend is not on the default URL, create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:3001
```

## Build and deploy

```bash
npm run build
```

This produces a static build in `dist/` that can be hosted on Vercel, Netlify or any
static host. Make sure VITE_API_BASE_URL points at your deployed backend, and that
the backend allows this site's URL in its CORS settings.