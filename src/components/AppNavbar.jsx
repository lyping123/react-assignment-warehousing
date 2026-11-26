
import { Link } from "react-router-dom";

function AppNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Warehouse System
        </Link>

        <div className="navbar-nav ms-auto">
          <Link className="nav-link" to="/">
            Dashboard
          </Link>

          <Link className="nav-link" to="/products">
            Product Management
          </Link>

          <Link className="nav-link" to="/stock">
            Stock Management
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default AppNavbar;
