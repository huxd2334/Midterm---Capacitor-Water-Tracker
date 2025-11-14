import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import { getTotal, setTotal, pushHistory, clearToday } from './storage'
import History from './components/History'
import { Haptics } from '@capacitor/haptics'
import { uid } from './utils'

import { NavLink } from 'react-router-dom'

export default function App() {
  const [total, setTotalState] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      const t = await getTotal()
      setTotalState(t)
    })()
  }, [])

  async function add(amount) {
    const newTotal = total + amount
    setTotalState(newTotal)
    await setTotal(newTotal)
    const entry = { id: uid(), amount, t: new Date().toISOString() }
    await pushHistory(entry)

    try {
      await Haptics.impact({ style: 'Light' })
    } catch (e) {
    }
  }

  async function resetToday() {
    if (window.confirm('Bạn có chắc muốn đặt lại toàn bộ nước đã uống hôm nay?')) {
      await clearToday()
      setTotalState(0)
      navigate('/')
    }
  }

  return (
    <div className="app">
      <header className="topbar">
        <h1>
          <span role="img" aria-label="drop">💧</span> Water Tracker
        </h1>
        <nav>
          {/* Sử dụng NavLink thay vì Link để style active state */}
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Trang chính
          </NavLink>
          <NavLink
            to="/history"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Lịch sử
          </NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <div className="page home-page">
                <div className="total-display">
                  <p className="label">Đã uống hôm nay</p>
                  <h2 className="total">{total} ml</h2>
                </div>

                <div className="btn-row">
                  <button className="btn" onClick={() => add(100)}>
                    +100 ml
                  </button>
                  <button className="btn" onClick={() => add(200)}>
                    +200 ml
                  </button>
                  <button className="btn primary" onClick={() => add(300)}>
                    +300 ml
                  </button>
                </div>

                <div className="actions">
                  <Link to="/history" className="link">
                    Xem lịch sử
                  </Link>
                  <button className="link danger" onClick={resetToday}>
                    Đặt lại hôm nay
                  </button>
                </div>
              </div>
            }
          />

          <Route
            path="/history"
            element={
              <div className="page history-page">
                <div className="card">
                  <h2>Lịch sử uống nước</h2>
                  <History />
                </div>
              </div>
            }
          />
        </Routes>
      </main>

      <footer className="footer">©Le Cam Binh - 22IT.EB007</footer>
    </div>
  )
}