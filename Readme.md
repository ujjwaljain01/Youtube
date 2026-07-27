# 🎥 NovaPlay

> NovaPlay is a full-stack video creator platform for independent creators and communities. It pairs polished video publishing and playback with social engagement, channel identity, and creator analytics powered by React, Vite, Node.js, Express, MongoDB, and Cloudinary.

## Table of Contents

- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Architecture & Folder Structure](#architecture--folder-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Third-Party Service Setup](#third-party-service-setup)
- [License & Contact](#license--contact)

## Core Features

### Authentication & User Management

- Email and username login with secure JWT-based sessions
- Refresh token flow and cookie-based access control
- User profile creation with avatar and optional cover image
- Account update, password change, and current-user lookup endpoints

### Creator Channels & Video Management

- Upload videos with custom thumbnails
- Video metadata editing, publish/unpublish toggling, and deletion
- Cloudinary-backed media storage and asset lifecycle handling
- View count tracking and watch history support

### Social & Discovery

- Public channel profiles with subscriber tracking
- Tweet-style short posts and engagement actions
- Likes and comments across videos and tweets
- Playlist creation and video organization

### Dashboard & Analytics

- Creator metrics for videos, views, subscribers, likes, and comments
- Channel-specific listings and engagement summaries
- Secure dashboard APIs protected by authentication

## Tech Stack

- Frontend
    - React 19
    - Vite
    - React Router DOM
    - Zustand
    - React Query
    - Tailwind CSS
    - Vidstack
    - Axios
    - Zod
    - React Hook Form

- Backend
    - Node.js
    - Express 5
    - MongoDB with Mongoose
    - JSON Web Tokens (JWT)
    - Multer
    - Cloudinary
    - Bcrypt
    - Fluent-ffmpeg / ffprobe

- Tools
    - npm
    - nodemon
    - ESLint
    - Prettier
    - Vite

## Architecture & Folder Structure

NovaPlay is separated into two main applications:

- `backend/` — Express REST API server
- `frontend/` — React SPA built with Vite

Directory layout:

```
NovaPlay/
├── backend/
│   ├── src/
│   │   ├── app.js              # Express application setup
│   │   ├── index.js            # Server entrypoint and DB bootstrap
│   │   ├── db/                 # MongoDB connection logic
│   │   ├── controllers/        # Route handlers and business logic
│   │   ├── models/             # Mongoose schemas and methods
│   │   ├── routes/             # Express routing configuration
│   │   ├── middlewares/        # Auth, upload, and error middleware
│   │   └── utils/              # API helpers, Cloudinary helpers, error classes
│   ├── package.json
│   ├── .env.example
│   └── public/
├── frontend/
│   ├── src/
│   │   ├── main.tsx            # App bootstrap
│   │   ├── App.tsx             # Root provider composition
│   │   ├── routes/             # Browser route configuration
│   │   ├── pages/              # App page components
│   │   ├── features/           # Feature slices (auth, data, UI)
│   │   ├── api/                # Axios client and API abstractions
│   │   ├── providers/          # React context and query providers
│   │   └── styles/             # Global CSS and theme support
│   ├── package.json
│   └── .env
└── Readme.md
```

### Data Flow

1. The frontend uses `axios` via `apiClient` to send requests to backend endpoints under `/api/v1/*`.
2. Auth state is initialized by fetching the current user and stored in a Zustand store.
3. Backend controllers validate requests, interact with MongoDB models, and manage Cloudinary uploads for media assets.
4. The backend returns structured JSON responses to the client for rendering UI state.

## Getting Started

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env` with your values, then start the server:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Verify `frontend/.env` contains the correct API base URL, then start the client:

```bash
npm run dev
```

### Local Development Defaults

- Backend default port: `5000` (or `process.env.PORT`)
- Frontend Vite dev server: typically `http://localhost:5173`
- API base URL should point to the backend, e.g. `http://localhost:5000/api/v1`

## Environment Variables

### Backend (`backend/.env`)

```env
PORT=5000
CORS_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017
ACCESS_TOKEN_SECRET=your-access-token-secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_SECRET=your-refresh-token-secret
REFRESH_TOKEN_EXPIRY=7d
CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
```

### Frontend (`frontend/.env`)

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

## Third-Party Service Setup

### Cloudinary

NovaPlay uses Cloudinary to store uploaded videos, thumbnails, avatars, and cover images.

1. Create a Cloudinary account at https://cloudinary.com.
2. Retrieve your Cloud name, API key, and API secret.
3. Set `CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME` in `backend/.env`.

### MongoDB

The backend requires a MongoDB database.

- For local development, install MongoDB locally and use `mongodb://localhost:27017`.
- For hosted deployment, use MongoDB Atlas and set `MONGODB_URI` to your cluster connection string.

### CORS and Cookies

- Set `CORS_ORIGIN` in the backend to your frontend URL, such as `http://localhost:5173`.
- The backend sends `accessToken` and `refreshToken` cookies; the frontend client is configured to send credentials with requests.

## License & Contact

This repository does not currently include a `LICENSE` file. If you want to open-source NovaPlay, add a license such as MIT or GPL.

Questions or feedback? Reach out through the repository owner profile or add an issue in this repository.
