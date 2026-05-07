import React, { createContext, useContext, useReducer, useEffect } from 'react'

const AppContext = createContext()

// ── Rewards per task ──────────────────────────────────────────────────────────
export const TASK_REWARDS = {
  low:    { xp: 10,  coins: 5  },
  medium: { xp: 25,  coins: 12 },
  high:   { xp: 50,  coins: 25 },
}

// ── Level formula ─────────────────────────────────────────────────────────────
export const xpForLevel = (lvl) => lvl * 120

// ── Shop catalogue ────────────────────────────────────────────────────────────
export const SHOP_ITEMS = [
  // Vouchers
  { id: 'amazon_50',   type: 'voucher', icon: '🛒', title: 'Amazon ₹50 Off',      desc: 'Discount voucher on Amazon India', cost: 200,  color: 'from-orange-500 to-yellow-400',  tag: 'Popular' },
  { id: 'flipkart_75', type: 'voucher', icon: '🛍️', title: 'Flipkart ₹75 Off',    desc: 'Discount voucher on Flipkart',     cost: 280,  color: 'from-blue-500 to-cyan-400',     tag: null },
  { id: 'swiggy_100',  type: 'voucher', icon: '🍔', title: 'Swiggy ₹100 Off',     desc: 'Food order discount via Swiggy',   cost: 350,  color: 'from-orange-600 to-red-400',    tag: 'Food' },
  { id: 'zomato_80',   type: 'voucher', icon: '🍕', title: 'Zomato ₹80 Off',      desc: 'Food order discount via Zomato',   cost: 300,  color: 'from-red-500 to-rose-400',      tag: null },
  // Courses
  { id: 'udemy_python',  type: 'course', icon: '🐍', title: 'Python Masterclass',   desc: 'Complete Python bootcamp (Udemy)', cost: 800,  color: 'from-vault-500 to-violet-400',  tag: 'Free Course' },
  { id: 'udemy_react',   type: 'course', icon: '⚛️', title: 'React – Zero to Hero', desc: 'Modern React 18 full course',      cost: 900,  color: 'from-cyber-500 to-blue-400',    tag: 'Free Course' },
  { id: 'coursera_ds',   type: 'course', icon: '📊', title: 'Data Science Pro',     desc: 'IBM Data Science Certificate',     cost: 1200, color: 'from-blue-600 to-indigo-400',   tag: 'Certificate' },
  { id: 'udemy_ml',      type: 'course', icon: '🤖', title: 'Machine Learning A–Z', desc: 'ML & AI fundamentals course',      cost: 1000, color: 'from-emerald-500 to-teal-400',  tag: 'Free Course' },
  { id: 'udemy_figma',   type: 'course', icon: '🎨', title: 'UI/UX with Figma',     desc: 'Design systems & prototyping',     cost: 750,  color: 'from-pink-500 to-rose-400',     tag: 'Design' },
  // Passes
  { id: 'xp_boost',     type: 'pass',   icon: '⚡', title: 'XP Boost Pass',        desc: '2× XP for next 10 tasks',          cost: 300,  color: 'from-yellow-500 to-amber-400',  tag: '⏱ Limited' },
  { id: 'coin_boost',   type: 'pass',   icon: '💰', title: 'Coin Boost Pass',       desc: '2× Coins for next 10 tasks',       cost: 250,  color: 'from-coin-400 to-coin-600',     tag: '⏱ Limited' },
]

// ── Daily Passes ──────────────────────────────────────────────────────────────
export const DAILY_PASSES = [
  { id: 'daily_3',    icon: '🎯', title: 'Daily Hustle',    desc: 'Complete 3 tasks today',       goal: 3,  rewardXP: 50,  rewardCoins: 30,  difficulty: 'Easy'   },
  { id: 'daily_5',    icon: '🔥', title: 'Fire Streak',     desc: 'Complete 5 tasks today',       goal: 5,  rewardXP: 100, rewardCoins: 60,  difficulty: 'Medium' },
  { id: 'high_2',     icon: '💥', title: 'Elite Quests',    desc: 'Finish 2 high-priority tasks', goal: 2,  rewardXP: 120, rewardCoins: 80,  difficulty: 'Hard',  filter: 'high' },
  { id: 'weekly_10',  icon: '👑', title: 'Weekly Legend',   desc: 'Complete 10 tasks this week',  goal: 10, rewardXP: 250, rewardCoins: 150, difficulty: 'Epic',  weekly: true },
]

// ── Achievements ──────────────────────────────────────────────────────────────
export const ACHIEVEMENTS = [
  { id: 'first_task',    icon: '🎯', title: 'First Blood',   desc: 'Complete your first task',          condition: (s) => s.totalCompleted >= 1 },
  { id: 'five_tasks',    icon: '🔥', title: 'On Fire',       desc: 'Complete 5 tasks',                  condition: (s) => s.totalCompleted >= 5 },
  { id: 'ten_tasks',     icon: '⚡', title: 'Unstoppable',   desc: 'Complete 10 tasks',                 condition: (s) => s.totalCompleted >= 10 },
  { id: 'streak_3',      icon: '📅', title: 'Consistent',    desc: '3-day login streak',                condition: (s) => s.streak >= 3 },
  { id: 'streak_7',      icon: '🌟', title: 'Week Warrior',  desc: '7-day login streak',                condition: (s) => s.streak >= 7 },
  { id: 'level_5',       icon: '🏆', title: 'Vault Champion',desc: 'Reach Level 5',                     condition: (s) => s.level >= 5 },
  { id: 'rich',          icon: '💰', title: 'Coin Hoarder',  desc: 'Accumulate 500 coins (all time)',    condition: (s) => s.totalCoinsEarned >= 500 },
  { id: 'shopper',       icon: '🛒', title: 'Shopaholic',    desc: 'Redeem your first shop item',        condition: (s) => s.totalRedeemed >= 1 },
  { id: 'pass_done',     icon: '🎖️', title: 'Pass Master',   desc: 'Complete a daily pass challenge',    condition: (s) => s.passesCompleted >= 1 },
  { id: 'high_prio',     icon: '🚀', title: 'Priority Pro',  desc: 'Complete a high-priority task',      condition: (s) => s.completedHighPriority >= 1 },
]

// ── Reducer ───────────────────────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {

    case 'ADD_TASK': {
      return { ...state, tasks: [{ id: Date.now(), ...action.payload, completed: false, createdAt: new Date().toISOString() }, ...state.tasks] }
    }

    case 'COMPLETE_TASK': {
      const task = state.tasks.find((t) => t.id === action.payload)
      if (!task || task.completed) return state

      const mult   = state.activeBoosts.xp  ? 2 : 1
      const cmult  = state.activeBoosts.coin ? 2 : 1
      const base   = TASK_REWARDS[task.priority]
      const gainXP = base.xp * mult
      const gainCo = base.coins * cmult

      let newXP = state.xp + gainXP, newLevel = state.level
      while (newXP >= xpForLevel(newLevel)) { newXP -= xpForLevel(newLevel); newLevel++ }

      // Reduce boost counters
      let boosts = { ...state.activeBoosts }
      if (boosts.xp > 0)   boosts = { ...boosts, xp:   boosts.xp   - 1 }
      if (boosts.coin > 0) boosts = { ...boosts, coin: boosts.coin - 1 }

      const updatedTasks = state.tasks.map((t) => t.id === action.payload ? { ...t, completed: true } : t)

      // Update pass progress
      const today = new Date().toDateString()
      const todayDone = updatedTasks.filter((t) => t.completed && new Date(t.createdAt).toDateString() === today).length
      const weekDone  = updatedTasks.filter((t) => t.completed).length  // simplified

      const updatedPasses = { ...state.passProgress }
      DAILY_PASSES.forEach((p) => {
        const prev = updatedPasses[p.id] || 0
        if (p.filter === 'high' && task.priority !== 'high') return
        const inc = p.weekly ? weekDone : todayDone
        updatedPasses[p.id] = Math.min(inc, p.goal)
      })

      // Check pass completions & reward
      let bonusXP = 0, bonusCoins = 0, passesJustCompleted = []
      DAILY_PASSES.forEach((p) => {
        const wasComplete = (state.passProgress[p.id] || 0) >= p.goal
        const nowComplete = (updatedPasses[p.id] || 0) >= p.goal
        if (!wasComplete && nowComplete && !state.claimedPasses.includes(p.id)) {
          bonusXP    += p.rewardXP
          bonusCoins += p.rewardCoins
          passesJustCompleted.push(p.id)
        }
      })

      const totalCoinsEarned = state.stats.totalCoinsEarned + gainCo + bonusCoins

      return {
        ...state,
        tasks: updatedTasks,
        xp: newXP, level: newLevel,
        coins: state.coins + gainCo + bonusCoins,
        lastGain: { xp: gainXP + bonusXP, coins: gainCo + bonusCoins },
        activeBoosts: boosts,
        passProgress: updatedPasses,
        pendingPassClaims: [...state.pendingPassClaims, ...passesJustCompleted],
        stats: {
          ...state.stats,
          totalCompleted: state.stats.totalCompleted + 1,
          totalCoinsEarned,
          completedHighPriority: state.stats.completedHighPriority + (task.priority === 'high' ? 1 : 0),
          passesCompleted: state.stats.passesCompleted + passesJustCompleted.length,
        },
      }
    }

    case 'REDEEM_ITEM': {
      const item = SHOP_ITEMS.find((i) => i.id === action.payload)
      if (!item || state.coins < item.cost) return state
      let boosts = { ...state.activeBoosts }
      if (item.id === 'xp_boost')   boosts = { ...boosts, xp:   (boosts.xp   || 0) + 10 }
      if (item.id === 'coin_boost') boosts = { ...boosts, coin: (boosts.coin || 0) + 10 }
      return {
        ...state,
        coins: state.coins - item.cost,
        redeemed: [{ ...item, redeemedAt: new Date().toISOString(), code: genCode() }, ...state.redeemed],
        activeBoosts: boosts,
        stats: { ...state.stats, totalRedeemed: state.stats.totalRedeemed + 1 },
      }
    }

    case 'CLAIM_PASS': {
      const p = DAILY_PASSES.find((x) => x.id === action.payload)
      if (!p) return state
      return {
        ...state,
        claimedPasses: [...state.claimedPasses, action.payload],
        pendingPassClaims: state.pendingPassClaims.filter((id) => id !== action.payload),
      }
    }

    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter((t) => t.id !== action.payload) }

    case 'TOGGLE_DARK':
      return { ...state, dark: !state.dark }

    case 'SET_STREAK':
      return { ...state, streak: action.payload }

    case 'CLEAR_LAST_GAIN':
      return { ...state, lastGain: null }

    case 'UNLOCK_ACHIEVEMENT': {
      if (state.achievements.includes(action.payload)) return state
      return { ...state, achievements: [...state.achievements, action.payload] }
    }

    default: return state
  }
}

function genCode() {
  return 'TV-' + Math.random().toString(36).slice(2, 8).toUpperCase()
}

// ── Default state ─────────────────────────────────────────────────────────────
const defaultState = {
  tasks: [], xp: 0, level: 1, coins: 0, streak: 0, dark: true,
  lastGain: null,
  activeBoosts: { xp: 0, coin: 0 },
  passProgress: {},
  claimedPasses: [],
  pendingPassClaims: [],
  redeemed: [],
  achievements: [],
  stats: { totalCompleted: 0, totalCoinsEarned: 0, completedHighPriority: 0, totalRedeemed: 0, passesCompleted: 0 },
}

function load() {
  try { const s = localStorage.getItem('taskvault_v1'); return s ? JSON.parse(s) : defaultState }
  catch { return defaultState }
}

// ── Provider ──────────────────────────────────────────────────────────────────
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, load)

  useEffect(() => { localStorage.setItem('taskvault_v1', JSON.stringify(state)) }, [state])
  useEffect(() => { document.documentElement.classList.toggle('dark', true) }, [])

  // Streak
  useEffect(() => {
    const last = localStorage.getItem('tv_last_date')
    const today = new Date().toDateString()
    if (last !== today) {
      const yest = new Date(); yest.setDate(yest.getDate() - 1)
      dispatch({ type: 'SET_STREAK', payload: last === yest.toDateString() ? state.streak + 1 : 1 })
      localStorage.setItem('tv_last_date', today)
    }
  }, [])

  // Achievements
  useEffect(() => {
    const s = { ...state.stats, streak: state.streak, level: state.level }
    ACHIEVEMENTS.forEach((a) => {
      if (!state.achievements.includes(a.id) && a.condition(s))
        dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: a.id })
    })
  }, [state.stats, state.streak, state.level])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)
