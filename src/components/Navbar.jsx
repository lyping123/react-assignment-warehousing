import { NavLink } from 'react-router-dom'

function Navbar({ theme, onToggleTheme }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand fw-semibold" to="/">
          <i className="bi bi-box-seam me-2"></i>
          Warehouse Inventory
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active fw-semibold' : ''}`
                }
              >
                <i className="bi bi-grid me-1"></i>
                Product Management
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/stock"
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active fw-semibold' : ''}`
                }
              >
                <i className="bi bi-arrow-left-right me-1"></i>
                Stock Management
              </NavLink>
            </li>
            <li className="nav-item mt-2 mt-lg-0">
              <button
                type="button"
                className="btn btn-sm btn-outline-light"
                onClick={onToggleTheme}
              >
                <i
                  className={`bi ${
                    theme === 'light' ? 'bi-moon-stars-fill' : 'bi-sun-fill'
                  } me-1`}
                ></i>
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
