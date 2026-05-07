# ⚡ QuestBoard – Gamified Task Manager v2

An enhanced, reimagined React productivity app with gamification, achievements, and smart tips.

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

---

## ✨ What's New (vs original)

| Feature | Original | QuestBoard v2 |
|---|---|---|
| Task priorities | ❌ | ✅ Low / Medium / High |
| Task categories | ❌ | ✅ Study, Work, Health, etc. |
| Achievements | ❌ | ✅ 8 unlockable badges |
| Stats dashboard | ❌ | ✅ Breakdown by priority & category |
| Search tasks | ❌ | ✅ Live search |
| Sort tasks | ❌ | ✅ By date or priority |
| XP toast notification | ❌ | ✅ Animated +XP popup |
| Level titles | ❌ | ✅ Novice → Immortal |
| App name | Level Up | QuestBoard |
| Data key | questboard | questboard_v2 |

---

## 🛠️ Tech Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3** (dark mode, custom animations)
- **React Router 6** (lazy-loaded routes)
- **Context API + useReducer** (global state)
- **Wikipedia REST API** (productivity tips)
- **localStorage** (persistence)

---

## 📂 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx        # Sticky nav with XP/streak display
│   ├── XPBar.jsx         # Level progress + XP toast
│   ├── TaskForm.jsx      # Add tasks (priority + category)
│   ├── TaskList.jsx      # Filter, search, sort tasks
│   ├── TaskItem.jsx      # Individual task card
│   └── Achievements.jsx  # 8 unlockable badges
├── pages/
│   ├── Home.jsx          # Main task view
│   ├── Tips.jsx          # Wikipedia tips + saved tips
│   └── Stats.jsx         # Analytics dashboard
├── context/
│   └── AppContext.jsx    # Global state (reducer + provider)
├── hooks/
│   └── useDebounce.js    # Debounce hook for search
├── services/
│   └── wikiApi.js        # Wikipedia API calls
├── App.jsx               # Routes + providers
├── main.jsx              # Entry point
└── index.css             # Tailwind + custom styles
```

---

## 🎮 Gamification

- **XP System:** Low = +10 XP, Medium = +20 XP, High = +40 XP
- **Levels:** XP needed = Level × 100 (Level 1 = 100 XP, Level 2 = 200 XP, …)
- **Titles:** Novice → Apprentice → Journeyman → Adept → Expert → Master → Grandmaster → Legend
- **Streak:** Auto-tracked daily
- **Achievements:** 8 badges unlocked by milestones

---

## 📄 License

MIT
