import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Navbar() {
  const { state } = useApp()
  const [open, setOpen] = useState(false)

  const links = [
    { to: '/',      label: 'Quests', icon: '⚔️' },
    { to: '/passes',label: 'Passes', icon: '🎫' },
    { to: '/shop',  label: 'Shop',   icon: '🏪' },
    { to: '/tips',  label: 'Tips',   icon: '💡' },
    { to: '/stats', label: 'Stats',  icon: '📊' },
  ]

  const hasPending = state.pendingPassClaims.length > 0

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0714]/80 backdrop-blur-xl border-b border-white/[0.07]">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-vault-500 to-cyber-500 flex items-center justify-center text-lg shadow-vault group-hover:scale-105 transition-transform">
            🔥
          </div>
          <div className="leading-none">
            <div className="font-black text-sm tracking-tight text-white">FocusForge</div>
            <div className="text-[9px] font-bold text-vault-400 tracking-widest uppercase">Forge Your Focus</div>
          </div>
        </NavLink>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center bg-white/[0.05] border border-white/[0.07] rounded-2xl p-1 gap-0.5">
          {links.map(({ to, label, icon }) => (
            <NavLink key={to} to={to} end={to === '/'}
              className={({ isActive }) =>
                `relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200
                ${isActive ? 'bg-gradient-to-r from-vault-600 to-vault-500 text-white shadow-vault' : 'text-gray-400 hover:text-white hover:bg-white/5'}`
              }
            >
              <span>{icon}</span><span>{label}</span>
              {label === 'Passes' && hasPending && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-coin-400 rounded-full border border-[#0a0714] animate-pulse" />
              )}
            </NavLink>
          ))}
        </div>

        {/* Currency pills */}
        <div className="flex items-center gap-2">
          {/* XP */}
          <div className="hidden sm:flex items-center gap-1.5 bg-white/[0.05] border border-vault-500/20 px-3 py-1.5 rounded-xl">
            <span className="text-xs font-black text-vault-400">LV{state.level}</span>
            <span className="w-px h-3 bg-white/10" />
            <span className="text-xs font-bold text-vault-300">⚡{state.xp} XP</span>
          </div>
          {/* Coins */}
          <div className="flex items-center gap-1.5 bg-white/[0.05] border border-coin-500/20 px-3 py-1.5 rounded-xl">
            <span className="text-sm">🪙</span>
            <span className="text-xs font-black text-coin-400">{state.coins}</span>
          </div>
          {/* Mobile menu btn */}
          <button onClick={() => setOpen(!open)} className="md:hidden btn-secondary px-2.5 py-2 text-sm">
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/[0.07] px-4 py-3 space-y-1">
          {links.map(({ to, label, icon }) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-bold transition
                ${isActive ? 'bg-gradient-to-r from-vault-600 to-vault-500 text-white' : 'text-gray-400 hover:bg-white/5'}`
              }
            >
              {icon} {label}
              {label === 'Passes' && hasPending && <span className="ml-auto w-2.5 h-2.5 bg-coin-400 rounded-full animate-pulse" />}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  )
}
