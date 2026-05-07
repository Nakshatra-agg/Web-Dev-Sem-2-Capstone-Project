import React, { useState } from 'react'
import { useApp, TASK_REWARDS } from '../context/AppContext'

const CATS = ['general','study','work','health','personal','project']
const CAT_ICONS = { general:'📌', study:'📚', work:'💼', health:'🏃', personal:'🌱', project:'🛠️' }
const PRIO = [
  { key:'low',    icon:'🌿', label:'Low',    color:'border-emerald-500/40 bg-emerald-500/10 text-emerald-400', ring:'ring-emerald-500/50' },
  { key:'medium', icon:'⚡', label:'Medium', color:'border-amber-500/40 bg-amber-500/10 text-amber-400',     ring:'ring-amber-500/50' },
  { key:'high',   icon:'🔥', label:'High',   color:'border-red-500/40 bg-red-500/10 text-red-400',           ring:'ring-red-500/50' },
]

export default function TaskForm() {
  const { dispatch, state } = useApp()
  const [title, setTitle]       = useState('')
  const [priority, setPriority] = useState('medium')
  const [category, setCategory] = useState('general')
  const [error, setError]       = useState('')

  function submit(e) {
    e.preventDefault()
    if (!title.trim()) { setError('Name your quest first!'); return }
    dispatch({ type: 'ADD_TASK', payload: { title: title.trim(), priority, category } })
    setTitle(''); setError('')
  }

  const r = TASK_REWARDS[priority]
  const xpMult = state.activeBoosts.xp > 0 ? 2 : 1
  const coMult = state.activeBoosts.coin > 0 ? 2 : 1

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-vault-500 to-cyber-500 flex items-center justify-center text-sm shadow-vault">⚔️</div>
        <h2 className="font-black text-white">Add New Quest</h2>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <div>
          <input type="text" value={title} onChange={(e) => { setTitle(e.target.value); setError('') }}
            placeholder="What will you conquer today?" className="input-field" autoComplete="off" />
          {error && <p className="mt-1.5 text-xs text-red-400 font-medium">⚠️ {error}</p>}
        </div>

        {/* Priority */}
        <div>
          <p className="section-title">Difficulty & Rewards</p>
          <div className="grid grid-cols-3 gap-2">
            {PRIO.map(({ key, icon, label, color, ring }) => (
              <button key={key} type="button" onClick={() => setPriority(key)}
                className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 font-bold text-xs transition-all
                  ${priority === key ? `${color} ring-2 ${ring}` : 'border-white/[0.08] bg-white/[0.03] text-gray-500 hover:border-white/20'}`}
              >
                <span className="text-xl">{icon}</span>
                <span>{label}</span>
                <div className="flex gap-1.5 mt-0.5">
                  <span className="text-vault-400 font-black">+{r.xp * xpMult}⚡</span>
                  <span className="text-coin-400 font-black">+{r.coins * coMult}🪙</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Category */}
        <div>
          <p className="section-title">Category</p>
          <div className="grid grid-cols-3 gap-2">
            {CATS.map((c) => (
              <button key={c} type="button" onClick={() => setCategory(c)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all
                  ${category === c ? 'border-vault-500/60 bg-vault-500/15 text-vault-300 ring-1 ring-vault-500/40' : 'border-white/[0.08] bg-white/[0.03] text-gray-500 hover:border-white/20 hover:text-gray-300'}`}
              >
                <span>{CAT_ICONS[c]}</span>
                <span className="capitalize">{c}</span>
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="btn-primary w-full">🚀 Forge This Quest</button>
      </form>
    </div>
  )
}
