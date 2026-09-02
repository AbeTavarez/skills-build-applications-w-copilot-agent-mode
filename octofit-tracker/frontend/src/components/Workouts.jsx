import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('workouts').then(setWorkouts).catch((err) => setError(err.message)) }, [])
  if (error) return <p className="alert alert-danger">{error}</p>
  return <section><h2 className="h4 mb-3">Suggested workouts</h2><div className="row g-3">{workouts.map((workout) => <div className="col-md-6" key={workout._id}><article className="border rounded p-3 h-100"><div className="d-flex justify-content-between gap-2"><h3 className="h6">{workout.title}</h3><span className="badge text-bg-warning text-capitalize">{workout.difficulty}</span></div><p className="small text-secondary">{workout.description}</p><ul className="small mb-0">{workout.exercises?.map((exercise, index) => <li key={`${exercise.name}-${index}`}>{exercise.name}</li>)}</ul></article></div>)}</div></section>
}

export default Workouts
