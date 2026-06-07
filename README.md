# 🤖 GATE AI Assistant v2
### GDG PES College of Engineering Hackathon — "Build your own Chatbot"

A full-stack AI chatbot for GATE CSE exam prep — powered by **Google Gemini 1.5 Flash**.
Anyone can open the link and use it. **No API key prompt for users.**

---

## ✨ Features

- 🎓 Expert / 🌱 Beginner / 📋 Quiz — 3 modes with smart system prompts
- 🌙☀️ **Dark / Light theme toggle** — persists across sessions
- 10+ subjects — DS, Algo, OS, DBMS, CN, COA, TOC, Compiler, Logic, Maths
- ⚡ Streaming responses (word-by-word)
- 💬 Quick topic-specific prompts
- 🔒 API key hidden on backend — users never see it

---

## 🚀 Run Locally (5 steps)

### 1. Install all dependencies
```bash
npm run install:all
```

### 2. Set up your API key
```bash
cd backend
cp .env.example .env
# Open .env and paste your Gemini API key
```
Get a free key at: https://aistudio.google.com/app/apikey

### 3. Start backend
```bash
cd backend
npm run dev
# Runs on http://localhost:3001
```

### 4. Start frontend (new terminal)
```bash
cd frontend
npm run dev
# Runs on http://localhost:5173
```

### 5. Open browser
Go to `http://localhost:5173` — it works immediately, no key prompt!

---

## 🏗️ Project Structure

```
gate-chatbot/
├── backend/
│   ├── server.js          ← Express server, Gemini proxy, SSE streaming
│   ├── .env.example       ← Copy to .env, add your key
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ThemeToggle.jsx    ← Dark/Light toggle
│   │   │   ├── Sidebar.jsx        ← Topic & mode selector
│   │   │   ├── ChatMessage.jsx    ← Message bubble + typing indicator
│   │   │   ├── ChatInput.jsx      ← Input + quick prompts
│   │   │   └── WelcomeScreen.jsx  ← Landing UI
│   │   ├── hooks/
│   │   │   └── useGemini.js       ← Calls /api/chat (backend)
│   │   ├── App.jsx                ← Layout, theme, state
│   │   ├── main.jsx
│   │   └── index.css              ← CSS variables for dark+light themes
│   ├── index.html
│   ├── vite.config.js     ← Proxy /api → localhost:3001
│   └── package.json
│
└── package.json           ← Root scripts to run both together
```

---

## 🌐 Deploy Free (Render + Vercel)

### Backend → Render.com (free tier)
1. Push this repo to GitHub
2. Go to render.com → New Web Service → connect repo
3. Set:
   - Root directory: `backend`
   - Build command: `npm install`
   - Start command: `node server.js`
4. Add environment variable: `GEMINI_API_KEY = your_key_here`
5. Deploy → you get a URL like `https://gate-chatbot-api.onrender.com`

### Frontend → Vercel.com (free tier)
1. Go to vercel.com → New Project → import same repo
2. Set:
   - Root directory: `frontend`
   - Build command: `npm run build`
   - Output directory: `dist`
3. Add environment variable: `VITE_API_BASE = https://gate-chatbot-api.onrender.com`
4. In `frontend/src/hooks/useGemini.js` change `/api/chat` to:
   ```js
   const BASE = import.meta.env.VITE_API_BASE || ''
   const res = await fetch(`${BASE}/api/chat`, { ... })
   ```
5. Deploy → share the Vercel URL with judges!

---

## 🛠️ Tech Stack

| Layer      | Technology                  |
|------------|-----------------------------|
| Frontend   | React 18 + Vite             |
| Backend    | Node.js + Express           |
| AI         | Google Gemini 1.5 Flash     |
| Streaming  | Server-Sent Events (SSE)    |
| Markdown   | react-markdown + remark-gfm |
| Deployment | Vercel + Render             |

---

## 🔒 Security

- API key lives only in `backend/.env`
- Never shipped to the browser
- CORS enabled for localhost in dev; restrict to your Vercel domain in production

---

*Built with ❤️ for GDG Hackathon — PES College of Engineering, Mandya*
