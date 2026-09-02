import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('activities').then(setActivities).catch((err) => setError(err.message)) }, [])
  if (error) return <p className="alert alert-danger">{error}</p>
  return <section><h2 className="h4 mb-3">Recent activity</h2><div className="table-responsive"><table className="table align-middle"><thead><tr><th>Type</th><th>Duration</th><th>Points</th><th>Date</th></tr></thead><tbody>{activities.map((activity) => <tr key={activity._id}><td className="text-capitalize">{activity.type}</td><td>{activity.durationMinutes} min</td><td><strong>{activity.points}</strong></td><td>{new Date(activity.performedAt).toLocaleDateString()}</td></tr>)}</tbody></table></div></section>
}

export default Activities
