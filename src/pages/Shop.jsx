import React, { useState } from 'react'
import { useApp, SHOP_ITEMS } from '../context/AppContext'

const TYPE_FILTERS = ['all', 'voucher', 'course', 'pass']
const TYPE_LABELS  = { voucher:'🛒 Voucher', course:'📚 Course', pass:'⚡ Boost Pass' }

export default function Shop() {
  const { state, dispatch } = useApp()
  const [filter, setFilter]   = useState('all')
  const [confirm, setConfirm] = useState(null)
  const [recentBuy, setRecentBuy] = useState(null)

  const items = SHOP_ITEMS.filter(i => filter === 'all' || i.type === filter)

  function buy(item) {
    if (state.coins < item.cost) return
    dispatch({ type: 'REDEEM_ITEM', payload: item.id })
    setConfirm(null)
    setRecentBuy(item.id)
    setTimeout(() => setRecentBuy(null), 2500)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-coin-400 to-coin-600 flex items-center justify-center text-2xl shadow-coin">🏪</div>
          <div>
            <h1 className="font-black text-xl text-white">Reward Shop</h1>
            <p className="text-xs text-gray-500">Spend your coins on real rewards</p>
          </div>
        </div>
        {/* Coin balance */}
        <div className="flex items-center gap-2 bg-coin-500/15 border border-coin-500/30 px-4 py-2.5 rounded-2xl shadow-coin">
          <span className="text-xl">🪙</span>
          <div>
            <div className="text-xs text-gray-500 leading-none">Your Balance</div>
            <div className="text-xl font-black text-coin-400 leading-tight">{state.coins}</div>
          </div>
        </div>
      </div>

      {/* Success toast */}
      {recentBuy && (
        <div className="rounded-2xl bg-emerald-500/20 border border-emerald-500/30 p-4 flex items-center gap-3 animate-slide-up">
          <span className="text-2xl animate-float">🎉</span>
          <div>
            <p className="font-black text-white text-sm">Purchase Successful!</p>
            <p className="text-xs text-gray-400">Check "My Redemptions" below for your code.</p>
          </div>
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex gap-1.5 bg-white/[0.04] border border-white/[0.07] rounded-2xl p-1.5">
        {TYPE_FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`flex-1 py-2 rounded-xl text-xs font-bold capitalize transition-all
              ${filter === f ? 'bg-gradient-to-r from-vault-600 to-vault-500 text-white shadow-vault' : 'text-gray-500 hover:text-gray-300'}`}
          >
            {f === 'all' ? '🌐 All' : f === 'voucher' ? '🛒 Vouchers' : f === 'course' ? '📚 Courses' : '⚡ Boosts'}
          </button>
        ))}
      </div>

      {/* Shop grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => {
          const canAfford = state.coins >= item.cost
          const isConfirming = confirm === item.id

          return (
            <div key={item.id}
              className={`relative rounded-2xl border overflow-hidden transition-all duration-200
                ${canAfford ? 'border-white/[0.1] hover:border-white/[0.2] hover:-translate-y-0.5' : 'border-white/[0.05] opacity-60'}
                bg-white/[0.03]`}
            >
              {/* Top gradient bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${item.color}`} />

              <div className="p-4">
                {/* Tag */}
                {item.tag && (
                  <div className={`absolute top-4 right-4 text-[10px] font-black px-2 py-0.5 rounded-full bg-gradient-to-r ${item.color} text-white`}>
                    {item.tag}
                  </div>
                )}

                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}>
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0 pr-10">
                    <h3 className="font-black text-white text-sm leading-tight">{item.title}</h3>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{TYPE_LABELS[item.type]}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mb-4 leading-relaxed">{item.desc}</p>

                {/* Price + CTA */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg">🪙</span>
                    <span className={`text-lg font-black ${canAfford ? 'text-coin-400' : 'text-gray-600'}`}>{item.cost}</span>
                    {!canAfford && <span className="text-[10px] text-red-400 font-bold">(need {item.cost - state.coins} more)</span>}
                  </div>

                  {isConfirming ? (
                    <div className="flex gap-1.5">
                      <button onClick={() => setConfirm(null)} className="btn-secondary text-xs px-3 py-1.5 rounded-lg">Cancel</button>
                      <button onClick={() => buy(item)} className="btn-coin text-xs px-3 py-1.5 rounded-lg">Confirm</button>
                    </div>
                  ) : (
                    <button
                      onClick={() => canAfford && setConfirm(item.id)}
                      disabled={!canAfford}
                      className={`text-xs font-black px-4 py-2 rounded-xl transition-all
                        ${canAfford
                          ? 'bg-gradient-to-r from-vault-600 to-vault-500 text-white hover:shadow-vault active:scale-95'
                          : 'bg-white/[0.05] text-gray-600 cursor-not-allowed'}`}
                    >
                      {canAfford ? 'Redeem' : 'Locked 🔒'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* My Redemptions */}
      {state.redeemed.length > 0 && (
        <div className="space-y-3">
          <h2 className="font-black text-white flex items-center gap-2">🧾 My Redemptions</h2>
          <div className="space-y-2">
            {state.redeemed.map((r, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3">
                <span className="text-2xl">{r.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-white">{r.title}</p>
                  <p className="text-xs text-gray-500">{new Date(r.redeemedAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 mb-0.5">Code</div>
                  <div className="font-black text-vault-300 text-sm tracking-widest bg-vault-500/10 border border-vault-500/20 px-3 py-1 rounded-lg">
                    {r.code}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
