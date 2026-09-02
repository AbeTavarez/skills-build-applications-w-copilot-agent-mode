import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('users').then(setUsers).catch((err) => setError(err.message))
  }, [])

  if (error) return <p className="alert alert-danger">{error}</p>
  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 mb-0">Members</h2><span className="badge text-bg-dark">{users.length}</span>
      </div>
      <div className="row g-3">
        {users.map((user) => <div className="col-md-4" key={user._id}><article className="border rounded p-3 h-100"><h3 className="h6">{user.profile?.firstName || user.username}</h3><p className="small text-secondary mb-1">@{user.username}</p><p className="small mb-0">{user.profile?.goal || user.email}</p></article></div>)}
      </div>
    </section>
  )
}

export default Users
