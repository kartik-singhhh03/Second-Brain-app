# 🧠 Second Brain App - Frontend

A beautiful, modern **Second Brain App** built with **React, Vite, and TailwindCSS**.  
This app helps users capture, organize, and retrieve their notes, ideas, YouTube videos, tweets, and links in one place — acting as a digital "second brain".

---

## 🎮 Demo Credentials

> **Want to test the app? Use these demo credentials:**

| Field | Value |
|-------|-------|
| 👤 **Username** | `demo` |
| 🔑 **Password** | `demo123` |

> 💡 **Tip:** You can also create your own account to have a personalized experience!

---

## 🚀 Features

- ✍️ **Create, edit, and delete notes** - Save YouTube videos, tweets, and links
- 📂 **Organize content** - Filter by type (YouTube, Twitter, Links)
- 🔍 **Search functionality** - Quickly find saved content
- 🔐 **User authentication** - Secure login with JWT
- 🌓 **Dark theme** - Beautiful purple-themed dark UI
- 📱 **Responsive design** - Works on all devices
- 🔗 **Share your brain** - Invite friends with view-only access
- 📲 **Share via social** - WhatsApp, Twitter, LinkedIn, Telegram, Email

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite 7, TailwindCSS 4
- **Routing**: React Router 7
- **HTTP Client**: Axios
- **Icons**: Custom SVG icons

---

## 📦 Installation & Setup

1. Install dependencies
   ```bash
   cd brainly-front
   npm install
   ```

2. Start the development server
   ```bash
   npm run dev
   ```

3. Open http://localhost:5173 in your browser

---

## 🎨 Screenshots

### Landing Page
Beautiful dark-themed landing page with gradient animations

### Dashboard
Clean interface with search, filters, and grid/list view toggle

### Share Feature
Share your brain with friends via WhatsApp, Twitter, LinkedIn, and more!

---

## 📁 Project Structure

```
brainly-front/
├── src/
│   ├── components/     # Reusable UI components
│   ├── icons/          # SVG icon components
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   │   ├── Landing.tsx
│   │   ├── Signin.tsx
│   │   ├── Signup.tsx
│   │   ├── dashboard.tsx
│   │   └── SharedBrain.tsx
│   ├── App.tsx         # Main app with routing
│   └── main.tsx        # Entry point
├── public/             # Static assets
└── package.json
```

---

## 🔗 API Endpoints Used

- `POST /api/v1/signup` - User registration
- `POST /api/v1/signin` - User login
- `GET /api/v1/content` - Fetch user's content
- `POST /api/v1/content` - Add new content
- `DELETE /api/v1/content` - Delete content
- `POST /api/v1/brain/share` - Generate share link
- `GET /api/v1/brain/:shareLink` - View shared brain

---

## 📄 License

MIT License - feel free to use this project for learning or personal use!
