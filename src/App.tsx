import { Route, Routes, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Demo from './pages/Demo'
import Insights from './pages/Insights'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col text-slate-800">
      <NavBar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
