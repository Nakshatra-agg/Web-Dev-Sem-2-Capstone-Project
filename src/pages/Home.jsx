import React, { Suspense, lazy } from 'react'
import XPBar from '../components/XPBar'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import { NavLink } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const Achievements = lazy(() => import('../components/Achievements'))

export default function Home() {
  const { state } = useApp()
  const hasPending = state.pendingPassClaims.length > 0

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-5">
      <XPBar />

      {/* Pass claim nudge */}
      {hasPending && (
        <NavLink to="/passes" className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-coin-500/15 to-amber-500/10 border border-coin-500/30 p-4 hover:border-coin-500/50 transition-all animate-slide-up">
          <span className="text-2xl animate-float">🎁</span>
          <div className="flex-1">
            <p className="font-black text-white text-sm">You have {state.pendingPassClaims.length} pass reward{state.pendingPassClaims.length>1?'s':''} to claim!</p>
            <p className="text-xs text-gray-500">Go to Passes to collect your XP and Coins →</p>
          </div>
          <span className="text-coin-400 font-bold text-xs">Claim →</span>
        </NavLink>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 space-y-4">
          <TaskForm />
          <TaskList />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <Suspense fallback={<div className="card animate-pulse h-48 bg-white/[0.02]" />}>
            <Achievements />
          </Suspense>

          {/* Quick links */}
          <div className="grid grid-cols-2 gap-3">
            <NavLink to="/passes" className="card flex flex-col items-center gap-2 py-5 text-center hover:border-vault-500/30 group">
              <span className="text-3xl group-hover:animate-float">🎫</span>
              <span className="font-black text-white text-xs">Battle Passes</span>
              <span className="text-[10px] text-gray-600">Earn bonus rewards</span>
            </NavLink>
            <NavLink to="/shop" className="card flex flex-col items-center gap-2 py-5 text-center hover:border-coin-500/30 group">
              <span className="text-3xl group-hover:animate-float">🏪</span>
              <span className="font-black text-white text-xs">Reward Shop</span>
              <span className="text-[10px] text-coin-500 font-bold">🪙 {state.coins} coins</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}
