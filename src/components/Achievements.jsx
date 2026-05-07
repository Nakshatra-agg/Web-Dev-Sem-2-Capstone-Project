import React from 'react'
import { useApp, ACHIEVEMENTS } from '../context/AppContext'

export default function Achievements() {
  const { state } = useApp()
  const unlocked = state.achievements.length

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-vault-500 to-cyber-500 flex items-center justify-center text-sm">🏅</div>
          <h2 className="font-black text-white">Badges</h2>
        </div>
        <span className="badge bg-vault-500/20 text-vault-300 border border-vault-500/30">{unlocked}/{ACHIEVEMENTS.length}</span>
      </div>
      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden mb-4">
        <div className="h-full xp-bar-fill rounded-full transition-all duration-700" style={{ width: `${(unlocked/ACHIEVEMENTS.length)*100}%` }} />
      </div>
      <div className="space-y-2">
        {ACHIEVEMENTS.map((a) => {
          const on = state.achievements.includes(a.id)
          return (
            <div key={a.id} className={`flex items-center gap-3 p-2.5 rounded-xl transition-all
              ${on ? 'bg-gradient-to-r from-vault-500/15 to-cyber-500/10 border border-vault-500/25' : 'bg-white/[0.03] opacity-35'}`}
            >
              <span className={`text-xl ${!on ? 'grayscale' : ''}`}>{a.icon}</span>
              <div className="min-w-0 flex-1">
                <div className={`text-xs font-black leading-tight ${on ? 'text-white' : 'text-gray-500'}`}>{a.title}</div>
                <div className="text-[10px] text-gray-600 leading-tight truncate">{a.desc}</div>
              </div>
              {on && (
                <div className="flex-shrink-0 w-4 h-4 rounded-full bg-gradient-to-br from-vault-500 to-cyber-500 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                  </svg>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
