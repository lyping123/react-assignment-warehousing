// Navbar component
// Uses React Router's <NavLink> and includes an EN/ZH language toggle button.

import { NavLink } from "react-router-dom";

function Navbar({ t, onToggleLang }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">

        <NavLink className="navbar-brand fw-bold" to="/">
          <i className="bi bi-buildings me-2"></i>
          {t.brand}
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active fw-bold" : "")
                }
                to="/products"
              >
                <i className="bi bi-box-seam me-1"></i>
                {t.navProducts}
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active fw-bold" : "")
                }
                to="/stock"
              >
                <i className="bi bi-graph-up-arrow me-1"></i>
                {t.navStock}
              </NavLink>
            </li>

            {/* Language toggle button */}
            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
              <button
                type="button"
                className="btn btn-outline-light btn-sm"
                onClick={onToggleLang}
              >
                <i className="bi bi-translate me-1"></i>
                {t.langButton}
              </button>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
