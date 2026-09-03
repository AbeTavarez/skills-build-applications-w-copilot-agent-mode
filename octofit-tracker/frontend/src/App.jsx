import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import { API_BASE_URL } from './api'
import './App.css'

const navigation = [
  { label: 'Overview', path: '/activities' },
  { label: 'Members', path: '/users' },
  { label: 'Teams', path: '/teams' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Workouts', path: '/workouts' },
]

function App() {
  return <div className="app-shell"><header className="app-header"><div><p className="eyebrow mb-1">MERGINGTON HIGH</p><h1>OctoFit Tracker</h1></div><span className="api-status">API online</span></header><nav className="nav-strip" aria-label="Primary navigation">{navigation.map((item) => <NavLink className={({ isActive }) => isActive ? 'active' : ''} to={item.path} key={item.path}>{item.label}</NavLink>)}</nav><main className="container py-4"><p className="text-secondary small mb-4">Your movement, your team, your momentum.</p><Routes><Route path="/activities" element={<Activities />} /><Route path="/users" element={<Users />} /><Route path="/teams" element={<Teams />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/workouts" element={<Workouts />} /><Route path="*" element={<Navigate to="/activities" replace />} /></Routes><p className="small text-secondary mt-5">Connected to {API_BASE_URL}</p></main></div>
}

export default App
