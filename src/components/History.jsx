import React, { useEffect, useState } from 'react'
import { getHistory } from '../storage'

export default function History() {
  const [list, setList] = useState([])

  useEffect(() => {
    (async () => setList(await getHistory()))()
  }, [])

  return (
    <div className="page">
      <h2>Lịch sử</h2>
      {list.length === 0 && <p className="muted">Chưa có lần uống nào hôm nay.</p>}
      <ul className="history-list">
        {list.map(item => (
          <li key={item.id} className="history-item">
            <span className="time">{new Date(item.t).toLocaleTimeString()}</span>
            <span className="amount">+{item.amount} ml</span>
          </li>
        ))}
      </ul>
    </div>
  )
}