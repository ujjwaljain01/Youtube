# 🎥 NovaPlay

> A modern video-sharing and creator platform that combines YouTube-style publishing and playback with Twitter-like conversation, channel identity, and creator management tools.

NovaPlay is a full-stack creator platform designed to be a calmer, more minimal alternative to cluttered media dashboards. With soft gradients, clean cards, and a simplified flow, NovaPlay brings the focus back to content and community. Built with **Next.js**, it features a light social layer woven directly into the video consumption experience.

---

## ✨ Key Features

### 🔐 Authentication & Onboarding

- **Guided 3-Step Sign-up:** Collects full name, username, email, password, avatar, and an optional cover image.
- **Secure Sessions:** Real session-based account management featuring login, logout, refresh tokens, and password changes.
- **Profile Management:** Seamless current-user lookups and account updates.

### 📺 Creator Channels & Identity

- **Dedicated Profiles:** Each user gets a public channel at an `@username` route.
- **Visual Identity:** Showcases avatar, cover image, subscriber counts, and account creation dates.
- **Creator Controls:** Owner-specific actions for editing channel details and managing uploaded videos. It’s not just a file host—it’s your space.

### 🎬 Video Publishing & Management

- **Complete Upload Flow:** Publish videos, attach custom thumbnails, and add rich titles and descriptions.
- **Lifecycle Management:** Edit metadata, or fully replace video files and thumbnails post-publish.
- **Robust Storage:** Backend integration with **Cloudinary** for scalable asset references, duration tracking, and publish status.

### 🍿 Premium Watch Experience

- **Cinematic Playback:** Utilizes **Vidstack** for a highly polished, custom media player experience (no bare `<video>` tags).
- **Dynamic Data:** Fetches hosted media directly from the backend, increments view counts, and displays rich metadata on load.

### 🌐 Hybrid Discovery Feed

- **Mixed Media Timeline:** The `/videos` feed seamlessly alternates between video rows and short social posts ("tweets").
- **Social Integration:** Creates a unique platform identity—part video streaming hub, part community conversation space.

### 💬 Community & Social Systems

- **Engage:** Like, comment, and reply to both videos and tweets.
- **Connect:** Subscribe to your favorite creator channels.
- **Organize:** Curate content into Playlists and track your Watch History.

### 📊 Creator Analytics & Dashboard

- **Performance Metrics:** Track total videos, total views, total subscribers, total comments, and total likes.
- **Content Control Panel:** Advanced channel video listing endpoints that provide engagement counts for a creator's own uploads.

---

## 🛠️ Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) – Delivering a modern, fast, and polished user interface.
- **Media Player:** [Vidstack](https://vidstack.io/) – For a robust, customizable video consumption experience.
- **Asset Storage:** [Cloudinary](https://cloudinary.com/) – Handling video and image asset lifecycle management.
- **Backend Infrastructure:** REST API architecture with dedicated routes and controllers for Auth, Users, Videos, Tweets, Comments, Likes, Playlists, and Dashboard stats.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm
- Cloudinary Account & API Keys
- Backend API up and running

### Installation

1. **Clone the repository:**
    ```bash
    git clone [https://github.com/ujjwaljain01/NovaPlay.git](https://github.com/ujjwaljain01/NovaPlay.git)
    cd novaplay
    ```
