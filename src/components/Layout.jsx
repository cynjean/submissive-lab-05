import { NavLink, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink className="brand" to="/" aria-label="Circuit Shelf dashboard">
          <span className="brand-mark">CS</span>
          <span>
            <strong>Circuit Shelf</strong>
            <small>Admin Portal</small>
          </span>
        </NavLink>

        <nav className="main-nav" aria-label="Primary navigation">
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/new">Add Product</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}
