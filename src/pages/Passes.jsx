import React, { useState } from 'react'
import { useApp, DAILY_PASSES } from '../context/AppContext'

const DIFF_COLORS = {
  Easy:   'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  Medium: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  Hard:   'bg-red-500/15 text-red-400 border-red-500/30',
  Epic:   'bg-vault-500/15 text-vault-400 border-vault-500/30',
}

export default function Passes() {
  const { state, dispatch } = useApp()
  const [claimed, setClaimed] = useState([])

  function claimPass(id) {
    dispatch({ type: 'CLAIM_PASS', payload: id })
    setClaimed(p => [...p, id])
  }

  const today = new Date().toDateString()
  const todayCompleted = state.tasks.filter(t => t.completed && new Date(t.createdAt).toDateString() === today).length
  const totalCompleted = state.tasks.filter(t => t.completed).length

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-vault-500 to-cyber-500 flex items-center justify-center text-2xl shadow-vault">🎫</div>
        <div>
          <h1 className="font-black text-xl text-white">Battle Passes</h1>
          <p className="text-xs text-gray-500">Complete challenges, earn bonus XP & Coins</p>
        </div>
      </div>

      {/* Pending claims banner */}
      {state.pendingPassClaims.length > 0 && (
        <div className="rounded-2xl bg-gradient-to-r from-coin-500/20 to-coin-400/10 border border-coin-500/30 p-4 flex items-center gap-3 animate-slide-up">
          <span className="text-2xl animate-float">🎉</span>
          <div>
            <p className="font-black text-white text-sm">Challenge{state.pendingPassClaims.length>1?'s':''} Completed!</p>
            <p className="text-xs text-gray-400">You have {state.pendingPassClaims.length} unclaimed reward{state.pendingPassClaims.length>1?'s':''}. Claim them below!</p>
          </div>
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon:'📅', label:'Today Done', value: todayCompleted },
          { icon:'📆', label:'Total Done',  value: totalCompleted },
          { icon:'🎖️', label:'Passes Done', value: state.stats.passesCompleted },
        ].map(({ icon, label, value }) => (
          <div key={label} className="card text-center py-4">
            <div className="text-2xl mb-1">{icon}</div>
            <div className="text-2xl font-black text-white">{value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Pass cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {DAILY_PASSES.map((pass) => {
          const current   = pass.filter === 'high'
            ? state.tasks.filter(t => t.completed && t.priority === 'high').length
            : pass.weekly ? totalCompleted : todayCompleted
          const progress  = Math.min(current, pass.goal)
          const pct       = Math.round((progress / pass.goal) * 100)
          const isComplete = progress >= pass.goal
          const isClaimed  = state.claimedPasses.includes(pass.id) || claimed.includes(pass.id)
          const isPending  = state.pendingPassClaims.includes(pass.id)

          return (
            <div key={pass.id}
              className={`relative rounded-2xl border p-5 transition-all duration-300
                ${isComplete && !isClaimed ? 'border-coin-500/50 bg-gradient-to-br from-coin-500/10 to-amber-500/5 shadow-coin' :
                  isClaimed ? 'border-white/[0.05] bg-white/[0.02] opacity-60' :
                  'border-white/[0.08] bg-white/[0.03] hover:border-white/[0.14]'}`}
            >
              {/* Complete glow badge */}
              {isComplete && !isClaimed && (
                <div className="absolute -top-2 -right-2 bg-coin-400 text-gray-900 text-[10px] font-black px-2.5 py-1 rounded-full shadow-coin animate-pop">
                  CLAIM!
                </div>
              )}
              {isClaimed && (
                <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full">
                  ✓ DONE
                </div>
              )}

              <div className="flex items-start gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0
                  ${isComplete && !isClaimed ? 'bg-coin-500/20 shadow-coin animate-float' : 'bg-white/[0.07]'}`}>
                  {pass.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-black text-white text-sm">{pass.title}</h3>
                    <span className={`badge border text-[10px] ${DIFF_COLORS[pass.difficulty]}`}>{pass.difficulty}</span>
                    {pass.weekly && <span className="badge bg-vault-500/15 text-vault-400 border border-vault-500/30 text-[10px]">Weekly</span>}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{pass.desc}</p>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-500">{progress} / {pass.goal} tasks</span>
                  <span className={`font-bold ${isComplete ? 'text-coin-400' : 'text-gray-400'}`}>{pct}%</span>
                </div>
                <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${isComplete ? 'coin-bar-fill' : 'xp-bar-fill'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              {/* Rewards */}
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <span className="flex items-center gap-1 text-xs font-bold text-vault-400">⚡ +{pass.rewardXP} XP</span>
                  <span className="flex items-center gap-1 text-xs font-bold text-coin-400">🪙 +{pass.rewardCoins}</span>
                </div>
                {isComplete && !isClaimed ? (
                  <button onClick={() => claimPass(pass.id)} className="btn-coin text-xs px-4 py-1.5 rounded-lg">
                    🎁 Claim Reward
                  </button>
                ) : isClaimed ? (
                  <span className="text-xs text-emerald-500 font-bold">Rewards Claimed ✓</span>
                ) : (
                  <span className="text-xs text-gray-600">{pass.goal - progress} more to go</span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Info */}
      <div className="card border-dashed border-white/[0.05]">
        <h3 className="font-black text-white mb-3 flex items-center gap-2">💬 How Passes Work</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-500">
          <div className="flex items-start gap-2"><span className="text-vault-400 text-lg">1.</span><span>Complete quests on the <strong className="text-gray-300">Tasks</strong> page to progress your passes automatically.</span></div>
          <div className="flex items-start gap-2"><span className="text-coin-400 text-lg">2.</span><span>When a pass is complete, come back here to <strong className="text-gray-300">claim your bonus</strong> XP & Coins.</span></div>
          <div className="flex items-start gap-2"><span className="text-cyber-400 text-lg">3.</span><span>Spend your Coins in the <strong className="text-gray-300">Shop</strong> on real vouchers and free courses!</span></div>
        </div>
      </div>
    </div>
  )
}
