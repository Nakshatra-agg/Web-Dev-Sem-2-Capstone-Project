import React from 'react'
import { useApp, ACHIEVEMENTS, xpForLevel } from '../context/AppContext'

const CAT_ICONS = { general:'📌', study:'📚', work:'💼', health:'🏃', personal:'🌱', project:'🛠️' }
const TITLES = ['','Recruit','Scout','Warrior','Knight','Champion','Warlord','Overlord','Sovereign','Mythic','Eternal']

export default function Stats() {
  const { state } = useApp()
  const total = state.tasks.length
  const done  = state.tasks.filter(t => t.completed).length
  const rate  = total > 0 ? Math.round((done/total)*100) : 0
  const needed = xpForLevel(state.level)
  const pct    = Math.min((state.xp/needed)*100, 100)
  const title  = TITLES[Math.min(state.level, TITLES.length-1)]

  const byP = ['high','medium','low'].map(p => ({
    p, total: state.tasks.filter(t => t.priority===p).length,
    done: state.tasks.filter(t => t.priority===p && t.completed).length,
  }))

  const cats = [...new Set(state.tasks.map(t => t.category))].map(c => ({
    c, total: state.tasks.filter(t => t.category===c).length,
    done: state.tasks.filter(t => t.category===c && t.completed).length,
  }))

  const CARDS = [
    { icon:'⚔️', label:'Quests Created',    value: total,            color:'from-violet-500/20 to-violet-900/10 border-violet-500/20 text-violet-300' },
    { icon:'✅', label:'Quests Completed',   value: done,             color:'from-emerald-500/20 to-emerald-900/10 border-emerald-500/20 text-emerald-300' },
    { icon:'🔥', label:'Day Streak',         value: `${state.streak}d`, color:'from-red-500/20 to-red-900/10 border-red-500/20 text-red-300' },
    { icon:'📈', label:'Success Rate',       value: `${rate}%`,       color:'from-cyber-500/20 to-cyan-900/10 border-cyber-500/20 text-cyber-300' },
    { icon:'🪙', label:'Coins Earned (All)', value: state.stats.totalCoinsEarned, color:'from-coin-500/20 to-amber-900/10 border-coin-500/20 text-coin-300' },
    { icon:'🛒', label:'Items Redeemed',     value: state.stats.totalRedeemed,    color:'from-pink-500/20 to-pink-900/10 border-pink-500/20 text-pink-300' },
    { icon:'🎫', label:'Passes Completed',   value: state.stats.passesCompleted,  color:'from-vault-500/20 to-vault-900/10 border-vault-500/20 text-vault-300' },
    { icon:'🏅', label:'Badges Earned',      value: `${state.achievements.length}/${ACHIEVEMENTS.length}`, color:'from-amber-500/20 to-amber-900/10 border-amber-500/20 text-amber-300' },
  ]
  const PCOL = { high:'from-red-500 to-orange-400', medium:'from-amber-400 to-yellow-300', low:'from-emerald-500 to-green-400' }
  const PLBL = { high:'🔥 High', medium:'⚡ Medium', low:'🌿 Low' }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-vault-500 to-cyber-500 flex items-center justify-center text-2xl shadow-vault">📊</div>
        <div>
          <h1 className="font-black text-xl text-white">FocusForge Stats</h1>
          <p className="text-xs text-gray-500">Your complete productivity overview</p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {CARDS.map(({ icon, label, value, color }) => (
          <div key={label} className={`rounded-2xl border bg-gradient-to-br ${color} p-4 space-y-2`}>
            <span className="text-2xl">{icon}</span>
            <div className="text-2xl font-black text-white">{value}</div>
            <div className="text-[11px] font-bold text-gray-400">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Level card */}
        <div className="card">
          <h2 className="font-black text-white mb-5 flex items-center gap-2">🎮 Level Progress</h2>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-vault-500 to-cyber-500 flex flex-col items-center justify-center shadow-vault flex-shrink-0">
              <span className="text-3xl font-black text-white">{state.level}</span>
            </div>
            <div className="flex-1">
              <div className="font-black text-xl text-white">{title}</div>
              <div className="text-sm text-gray-500">{state.xp} / {needed} XP</div>
              <div className="mt-3 h-2.5 bg-white/[0.06] rounded-full overflow-hidden">
                <div className="h-full xp-bar-fill rounded-full transition-all duration-700" style={{ width:`${pct}%` }} />
              </div>
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>Lv {state.level}</span><span>{Math.round(pct)}%</span><span>Lv {state.level+1}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Priority */}
        <div className="card">
          <h2 className="font-black text-white mb-5 flex items-center gap-2">🎯 Priority Breakdown</h2>
          {byP.filter(x=>x.total>0).length===0 ? (
            <div className="text-center py-8 text-gray-600 text-sm">No tasks yet.</div>
          ) : (
            <div className="space-y-4">
              {byP.filter(x=>x.total>0).map(({ p, total:t, done:d }) => (
                <div key={p}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-bold text-gray-300">{PLBL[p]}</span>
                    <span className="text-gray-500">{d}/{t}</span>
                  </div>
                  <div className="h-2.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${PCOL[p]} rounded-full transition-all duration-700`} style={{ width: t>0 ? `${(d/t)*100}%` : '0%' }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Category */}
        {cats.length > 0 && (
          <div className="card lg:col-span-2">
            <h2 className="font-black text-white mb-4 flex items-center gap-2">📂 Category Breakdown</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {cats.map(({ c, total:t, done:d }) => (
                <div key={c} className="bg-white/[0.03] rounded-xl p-4 space-y-2 border border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{CAT_ICONS[c]||'📌'}</span>
                    <span className="text-sm font-bold text-white capitalize">{c}</span>
                  </div>
                  <div className="text-xs text-gray-500">{d}/{t} done</div>
                  <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <div className="h-full xp-bar-fill rounded-full" style={{ width: t>0 ? `${(d/t)*100}%` : '0%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
