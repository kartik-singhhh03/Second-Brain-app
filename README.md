# 🧠 Second Brain App

A beautiful **Second Brain App** built with the **MERN stack (MongoDB, Express, React, Node.js)**.  
This app helps users capture, organize, and retrieve their YouTube videos, tweets, and links in one place — acting as a digital "second brain".

---

## 🎮 Demo Credentials

> ### ⭐ Want to try the app? Use these demo credentials:
>
> | Field | Value |
> |-------|-------|
> | 👤 **Username** | `demo` |
> | 🔑 **Password** | `demo123` |
>
> 💡 **Or create your own account for a personalized experience!**

---

## 🚀 Features

- ✍️ **Save Content** - YouTube videos, tweets, and links  
- 📂 **Smart Organization** - Filter by content type  
- 🔍 **Powerful Search** - Find anything instantly  
- 🔐 **Secure Auth** - JWT-based authentication  
- 🌓 **Beautiful Dark Theme** - Purple-accented modern UI  
- 📱 **Fully Responsive** - Works on all devices  
- 🔗 **Share Your Brain** - Invite friends with view-only links  
- 📲 **Social Sharing** - WhatsApp, Twitter, LinkedIn, Telegram, Email  

---

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite 7** for blazing fast builds
- **TailwindCSS 4** for styling
- **React Router 7** for navigation

### Backend
- **Node.js** with Express.js 5
- **MongoDB Atlas** for database
- **JWT** for authentication

---

## 📦 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/your-username/second-brain-app.git
cd second-brain-app

# Install backend dependencies
npm install

# Install frontend dependencies
cd brainly-front
npm install
```

### 2. Run the App

```bash
# Terminal 1 - Start Backend (from root)
npm run dev

# Terminal 2 - Start Frontend (from brainly-front)
cd brainly-front
npm run dev
```

### 3. Open in Browser
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/signup` | Register new user |
| POST | `/api/v1/signin` | Login user |
| GET | `/api/v1/content` | Get user's content |
| POST | `/api/v1/content` | Add new content |
| DELETE | `/api/v1/content` | Delete content |
| POST | `/api/v1/brain/share` | Generate share link |
| GET | `/api/v1/brain/:shareLink` | View shared brain |

---

## 📁 Project Structure

```
second-brain-app/
├── src/                    # Backend source
│   ├── index.ts           # Express server
│   ├── db.ts              # MongoDB models
│   ├── middleware.ts      # Auth middleware
│   └── config.ts          # Configuration
├── brainly-front/         # Frontend source
│   └── src/
│       ├── pages/         # React pages
│       ├── components/    # UI components
│       ├── hooks/         # Custom hooks
│       └── icons/         # SVG icons
└── package.json
```

---

## 🎨 Screenshots

### 🏠 Landing Page
Dark-themed landing with animated gradients and feature showcase

### 📊 Dashboard  
Clean interface with search, filters, grid/list views

### 🔗 Share Modal
Share your brain via WhatsApp, Twitter, LinkedIn, Telegram & Email

---

## 📄 License

MIT License - feel free to use for learning or personal projects!
