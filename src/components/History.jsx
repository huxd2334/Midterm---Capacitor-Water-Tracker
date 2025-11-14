import React, { useEffect, useState } from 'react'
import { getHistory } from '../storage'

export default function History() {
  const [list, setList] = useState([])

  useEffect(() => {
    (async () => setList(await getHistory()))()
  }, [])

  return (
    <>
      {list.length === 0 && <p className="muted">Chưa có lần uống nào hôm nay.</p>}

      <ul className="history-list">
        {list.map(item => (
          <li key={item.id} className="history-item">
            <span className="muted">{new Date(item.t).toLocaleTimeString()}</span>
            <span>+{item.amount} ml</span>
          </li>
        ))}
      </ul>
    </>
  )
}