import { Link, NavLink, useLocation } from 'react-router-dom'

export default function NavBar() {
  const { pathname } = useLocation()
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white font-bold">M</span>
          <span className="text-lg font-semibold">Medici Health</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={({isActive}) => `hover:text-brand-700 ${isActive ? 'text-brand-700' : ''}`}>หน้าแรก</NavLink>
          <NavLink to="/demo" className={({isActive}) => `hover:text-brand-700 ${isActive ? 'text-brand-700' : ''}`}>สาธิตฟีเจอร์</NavLink>
          <NavLink to="/insights" className={({isActive}) => `hover:text-brand-700 ${isActive ? 'text-brand-700' : ''}`}>Insights</NavLink>
          <a href="#security" className="hover:text-brand-700">ความปลอดภัย</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="#contact" className="btn">ติดต่อเรา</a>
          <Link to="/demo" className="btn btn-primary">ลองใช้งาน</Link>
        </div>
      </div>
    </header>
  )
}
