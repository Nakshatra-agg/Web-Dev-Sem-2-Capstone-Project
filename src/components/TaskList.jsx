import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import TaskItem from './TaskItem'

export default function TaskList() {
  const { state } = useApp()
  const [filter, setFilter] = useState('active')
  const [search, setSearch] = useState('')
  const [sort, setSort]     = useState('newest')

  const counts = {
    all: state.tasks.length,
    active: state.tasks.filter(t => !t.completed).length,
    completed: state.tasks.filter(t => t.completed).length,
  }

  const list = state.tasks
    .filter(t => filter==='all' ? true : filter==='active' ? !t.completed : t.completed)
    .filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b) => sort==='priority' ? ({high:0,medium:1,low:2}[a.priority])-({high:0,medium:1,low:2}[b.priority]) : new Date(b.createdAt)-new Date(a.createdAt))

  const tabs = [
    { k:'active', label:'Active', icon:'⚔️' },
    { k:'completed', label:'Done', icon:'✅' },
    { k:'all', label:'All', icon:'📋' },
  ]

  return (
    <div className="space-y-3">
      <div className="card space-y-3">
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 text-sm">🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search quests…" className="input-field pl-10" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1 bg-white/[0.04] rounded-xl p-1">
            {tabs.map(({k, label, icon}) => (
              <button key={k} onClick={() => setFilter(k)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all
                  ${filter===k ? 'bg-gradient-to-r from-vault-600 to-vault-500 text-white shadow-vault' : 'text-gray-500 hover:text-gray-300'}`}
              >
                <span>{icon}</span><span>{label}</span>
                <span className={`text-[10px] rounded-full px-1.5 py-0.5 font-black ${filter===k ? 'bg-white/20' : 'bg-white/5'}`}>{counts[k]}</span>
              </button>
            ))}
          </div>
          <select value={sort} onChange={e=>setSort(e.target.value)}
            className="text-xs bg-white/[0.05] border border-white/[0.08] text-gray-400 px-2.5 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-vault-500/50"
          >
            <option value="newest">Latest</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>

      {list.length === 0 ? (
        <div className="card text-center py-14 border-dashed border-white/[0.05]">
          <div className="text-5xl mb-3">{filter==='completed' ? '🏆' : search ? '🔍' : '⚔️'}</div>
          <p className="text-gray-500 font-bold">{filter==='completed' ? 'No completed quests yet.' : search ? 'Nothing matches.' : 'No active quests — add one above!'}</p>
        </div>
      ) : (
        <div className="space-y-2">{list.map(t => <TaskItem key={t.id} task={t} />)}</div>
      )}
    </div>
  )
}
