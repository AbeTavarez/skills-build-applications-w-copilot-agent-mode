import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('teams', apiEndpoint).then(setTeams).catch((err) => setError(err.message)) }, [])
  if (error) return <p className="alert alert-danger">{error}</p>
  return <section><h2 className="h4 mb-3">Teams</h2><div className="row g-3">{teams.map((team) => <div className="col-md-6" key={team._id}><article className="border rounded p-3 h-100"><h3 className="h6">{team.name}</h3><p className="small text-secondary">{team.description}</p><span className="badge text-bg-success">{team.members?.length || 0} members</span></article></div>)}</div></section>
}

export default Teams
