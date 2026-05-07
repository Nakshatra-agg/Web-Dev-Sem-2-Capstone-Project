import React, { useState, useCallback } from 'react'
import { useApp } from '../context/AppContext'
import { fetchRandomTip, fetchTipByTopic } from '../services/wikiApi'
import { useDebounce } from '../hooks/useDebounce'

export default function Tips() {
  const { state, dispatch } = useApp()
  const [tip, setTip] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)
  const dq = useDebounce(query, 400)

  const loadRandom = useCallback(async () => {
    setLoading(true); setError('')
    try { setTip(await fetchRandomTip()) } catch { setError('Failed to load. Try again.') } finally { setLoading(false) }
  }, [])
  const search = useCallback(async () => {
    if (!dq.trim()) return
    setLoading(true); setError('')
    try { setTip(await fetchTipByTopic(dq)) } catch { setError('Topic not found. Try different keywords.') } finally { setLoading(false) }
  }, [dq])

  function saveTip() { if (!tip) return; dispatch({ type:'SAVE_TIP', payload: tip }); setSaved(true); setTimeout(()=>setSaved(false),2000) }
  function copyTip() { if (!tip) return; navigator.clipboard.writeText(`${tip.title}\n\n${tip.extract}`); setCopied(true); setTimeout(()=>setCopied(false),2000) }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-vault-500 to-cyber-500 flex items-center justify-center text-2xl shadow-vault">💡</div>
        <div>
          <h1 className="font-black text-xl text-white">Productivity Tips</h1>
          <p className="text-xs text-gray-500">Wikipedia-powered knowledge to fuel your focus</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 space-y-4">
          <div className="card space-y-3">
            <div className="flex gap-2">
              <input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==='Enter'&&search()}
                placeholder="Search: Deep Work, Pomodoro, Flow State…" className="input-field flex-1" />
              <button onClick={search} disabled={loading} className="btn-primary whitespace-nowrap">Search</button>
            </div>
            <button onClick={loadRandom} disabled={loading} className="btn-secondary w-full">
              {loading ? <span className="inline-block w-4 h-4 border-2 border-vault-400 border-t-transparent rounded-full animate-spin" /> : '🎲'} Random Tip
            </button>
          </div>

          {error && <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm">⚠️ {error}</div>}

          {tip ? (
            <div className="card border-vault-500/20 animate-slide-up space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-vault-500/30 to-cyber-500/20 flex items-center justify-center text-xl flex-shrink-0">📖</div>
                <div>
                  <h3 className="font-black text-white text-base leading-tight">{tip.title}</h3>
                  <a href={tip.url} target="_blank" rel="noopener noreferrer" className="text-xs text-vault-400 hover:underline">Wikipedia →</a>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed border-l-2 border-vault-500/40 pl-4">{tip.extract}</p>
              <div className="flex gap-2 flex-wrap">
                <button onClick={copyTip} className="btn-secondary text-xs">{copied ? '✅ Copied!' : '📋 Copy'}</button>
                <button onClick={saveTip} className="btn-primary text-xs">{saved ? '⭐ Saved!' : '💾 Save'}</button>
                <a href={tip.url} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs">🔗 Read More</a>
              </div>
            </div>
          ) : !loading && (
            <div className="card text-center py-16 border-dashed border-white/[0.05]">
              <div className="text-5xl mb-3">💡</div>
              <p className="text-gray-600 font-semibold">Search a topic or load a random tip</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-white flex items-center gap-2">⭐ Saved</h2>
            <span className="badge bg-vault-500/20 text-vault-400 border border-vault-500/30">{state.savedTips.length}</span>
          </div>
          {state.savedTips.length === 0 ? (
            <div className="text-center py-10 text-gray-600 text-sm">
              <div className="text-4xl mb-2">📚</div>No saved tips yet.
            </div>
          ) : (
            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
              {state.savedTips.map((t, i) => (
                <div key={i} className="group bg-white/[0.04] hover:bg-white/[0.07] rounded-xl p-3 transition-colors border border-white/[0.06]">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-bold text-xs text-white leading-snug">{t.title}</p>
                    <button onClick={() => dispatch({ type:'DELETE_TIP', payload:i })}
                      className="flex-shrink-0 opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-400 transition-all">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" d="M3 4h10M6 4V2h4v2M5 4l1 10h4l1-10" /></svg>
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{t.extract}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
