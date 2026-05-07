import React, { useState } from 'react'
import { useApp, TASK_REWARDS } from '../context/AppContext'

const P = {
  low:    { dot:'bg-emerald-400', badge:'bg-emerald-500/15 text-emerald-400', label:'🌿 Low',    border:'hover:border-emerald-500/30' },
  medium: { dot:'bg-amber-400',   badge:'bg-amber-500/15 text-amber-400',     label:'⚡ Medium', border:'hover:border-amber-500/30' },
  high:   { dot:'bg-red-400',     badge:'bg-red-500/15 text-red-400',         label:'🔥 High',   border:'hover:border-red-500/30' },
}
const C_ICONS = { general:'📌', study:'📚', work:'💼', health:'🏃', personal:'🌱', project:'🛠️' }

export default function TaskItem({ task }) {
  const { dispatch } = useApp()
  const [removing, setRemoving] = useState(false)
  const p = P[task.priority]
  const r = TASK_REWARDS[task.priority]

  function complete() { if (!task.completed) dispatch({ type: 'COMPLETE_TASK', payload: task.id }) }
  function remove() { setRemoving(true); setTimeout(() => dispatch({ type: 'DELETE_TASK', payload: task.id }), 280) }

  return (
    <div className={`group relative flex items-start gap-3 bg-white/[0.03] border border-white/[0.07]
      ${task.completed ? '' : p.border}
      rounded-2xl px-4 py-3.5 transition-all duration-300
      ${task.completed ? 'opacity-45' : 'hover:bg-white/[0.06]'}
      ${removing ? 'opacity-0 -translate-x-3 scale-95' : ''}`}
    >
      {/* Priority dot */}
      {!task.completed && <div className={`absolute right-4 top-4 w-2 h-2 rounded-full ${p.dot} animate-pulse-slow`} />}

      {/* Checkbox */}
      <button onClick={complete} disabled={task.completed}
        className={`flex-shrink-0 mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all
          ${task.completed ? 'bg-gradient-to-br from-vault-500 to-cyber-500 border-transparent' : 'border-white/20 hover:border-vault-400 hover:bg-vault-500/10'}`}
      >
        {task.completed && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0 pr-5">
        <p className={`font-semibold text-sm leading-snug ${task.completed ? 'line-through text-gray-600' : 'text-gray-100'}`}>
          {task.title}
        </p>
        <div className="flex flex-wrap items-center gap-1.5 mt-2">
          <span className={`badge ${p.badge}`}>{p.label}</span>
          <span className="badge bg-white/[0.06] text-gray-500">{C_ICONS[task.category]} {task.category}</span>
          {task.completed
            ? <span className="text-xs text-gray-600 font-semibold">+{r.xp}⚡ +{r.coins}🪙 earned</span>
            : <span className="text-xs font-bold"><span className="text-vault-400">+{r.xp}⚡</span> <span className="text-coin-400">+{r.coins}🪙</span></span>
          }
        </div>
      </div>

      {/* Delete */}
      <button onClick={remove}
        className="absolute right-3 bottom-3 opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-all"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" d="M3 4h10M6 4V2h4v2M5 4l1 10h4l1-10" />
        </svg>
      </button>
    </div>
  )
}
