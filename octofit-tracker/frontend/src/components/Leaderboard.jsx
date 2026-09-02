import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('leaderboard').then(setEntries).catch((err) => setError(err.message)) }, [])
  if (error) return <p className="alert alert-danger">{error}</p>
  return <section><h2 className="h4 mb-3">Leaderboard</h2><div className="list-group">{entries.map((entry, index) => <div className="list-group-item d-flex justify-content-between align-items-center" key={entry._id}><span><span className="badge text-bg-light me-2">#{entry.rank || index + 1}</span>{entry.userId?.username || entry.username || entry.userId}</span><strong>{entry.points} pts</strong></div>)}</div></section>
}

export default Leaderboard
