import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Navbar from './components/Navbar'

const Home   = lazy(() => import('./pages/Home'))
const Tips   = lazy(() => import('./pages/Tips'))
const Stats  = lazy(() => import('./pages/Stats'))
const Shop   = lazy(() => import('./pages/Shop'))
const Passes = lazy(() => import('./pages/Passes'))

function Loader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-vault-500 to-cyber-500 flex items-center justify-center text-2xl animate-pulse shadow-vault">🔥</div>
        <p className="text-gray-600 text-sm font-bold tracking-widest uppercase">Loading…</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/"       element={<Home />}   />
              <Route path="/passes" element={<Passes />} />
              <Route path="/shop"   element={<Shop />}   />
              <Route path="/tips"   element={<Tips />}   />
              <Route path="/stats"  element={<Stats />}  />
            </Routes>
          </Suspense>
        </main>
      </div>
    </AppProvider>
  )
}
