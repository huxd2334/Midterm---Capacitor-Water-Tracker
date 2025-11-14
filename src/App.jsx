import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { getTotal, setTotal, pushHistory, clearToday } from './storage'
import History from './components/History'
import { Haptics } from '@capacitor/haptics'
import { uid } from './utils'

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
      // không khả dụng trên web
    }
  }

  async function resetToday() {
    await clearToday()
    setTotalState(0)
    navigate('/')
  }

  return (
    <div className="app">
      <header className="topbar">
        <h1>Water Tracker</h1>
        <nav>
          <Link to="/">Trang chính</Link>
          <Link to="/history">Lịch sử</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={(
            <div className="page center">
              <div className="card">
                <p className="label">Đã uống hôm nay</p>
                <h2 className="total">{total} ml</h2>

                <div className="btn-row">
                  <button className="btn" onClick={() => add(100)}>+100 ml</button>
                  <button className="btn" onClick={() => add(200)}>+200 ml</button>
                  <button className="btn primary" onClick={() => add(300)}>+300 ml</button>
                </div>

                <div className="actions">
                  <Link to="/history" className="link">Xem lịch sử</Link>
                  <button className="link" onClick={resetToday}>Đặt lại hôm nay</button>
                </div>
              </div>
            </div>
          )} />

          <Route path="/history" element={<History />} />
        </Routes>
      </main>

      <footer className="footer">© Họ & Tên - MSSV</footer>
    </div>
  )
}