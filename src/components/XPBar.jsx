import React, { useEffect, useState } from 'react'
import { useApp, xpForLevel } from '../context/AppContext'

const TITLES = ['','Recruit','Scout','Warrior','Knight','Champion','Warlord','Overlord','Sovereign','Mythic','Eternal']

export default function XPBar() {
  const { state, dispatch } = useApp()
  const [toast, setToast] = useState(null)
  const needed = xpForLevel(state.level)
  const pct    = Math.min((state.xp / needed) * 100, 100)
  const title  = TITLES[Math.min(state.level, TITLES.length - 1)] || 'Transcendent'

  useEffect(() => {
    if (state.lastGain) {
      setToast(state.lastGain)
      const t = setTimeout(() => { setToast(null); dispatch({ type: 'CLEAR_LAST_GAIN' }) }, 2500)
      return () => clearTimeout(t)
    }
  }, [state.lastGain])

  const hasCoinBoost = state.activeBoosts.coin > 0
  const hasXPBoost   = state.activeBoosts.xp   > 0

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a0f3a] via-[#0f1a2e] to-[#0a1628] border border-vault-500/30 p-5 shadow-vault">
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-30"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%237c52ff' fill-opacity='0.12'%3E%3Cpath d='M0 0h30v.5H0zM0 0v30h.5V0z'/%3E%3C/g%3E%3C/svg%3E\")" }} />

      <div className="relative">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-5">

          {/* Level badge */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-vault-500 to-cyber-500 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(124,82,255,0.5)] flex-shrink-0">
              <span className="text-2xl font-black text-white leading-none">{state.level}</span>
              <span className="text-[8px] font-bold text-white/60 uppercase tracking-widest">Level</span>
            </div>
            <div>
              <div className="font-black text-xl text-white leading-tight">{title}</div>
              <div className="text-xs text-gray-400 mt-0.5">{state.xp} / {needed} XP to Level {state.level + 1}</div>
              {(hasCoinBoost || hasXPBoost) && (
                <div className="flex gap-1.5 mt-2">
                  {hasXPBoost  && <span className="badge bg-vault-500/20 text-vault-300 border border-vault-500/30">⚡ 2× XP ({state.activeBoosts.xp} left)</span>}
                  {hasCoinBoost && <span className="badge bg-coin-500/20 text-coin-300 border border-coin-500/30">🪙 2× Coins ({state.activeBoosts.coin} left)</span>}
                </div>
              )}
            </div>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-5">
            <div className="text-center">
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Streak</div>
              <div className="text-xl font-black text-white mt-0.5">🔥 {state.streak}d</div>
            </div>
            <div className="w-px h-10 bg-white/[0.08]" />
            <div className="text-center">
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Coins</div>
              <div className="text-xl font-black text-coin-400 mt-0.5">🪙 {state.coins}</div>
            </div>
            <div className="w-px h-10 bg-white/[0.08]" />
            <div className="text-center">
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Done</div>
              <div className="text-xl font-black text-cyber-400 mt-0.5">✅ {state.stats.totalCompleted}</div>
            </div>
          </div>
        </div>

        {/* XP Bar */}
        <div className="space-y-1">
          <div className="h-2.5 bg-white/[0.06] rounded-full overflow-hidden">
            <div className="h-full xp-bar-fill rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>Lv {state.level}</span><span>{Math.round(pct)}%</span><span>Lv {state.level + 1}</span>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="absolute top-4 right-4 flex gap-2 animate-slide-up">
          <span className="bg-vault-600 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-vault">+{toast.xp} XP ⚡</span>
          <span className="bg-coin-500 text-gray-900 text-xs font-black px-3 py-1.5 rounded-full shadow-coin">+{toast.coins} 🪙</span>
        </div>
      )}
    </div>
  )
}
