import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>

        <Navbar.Brand as={NavLink} to="/">
          <i className="bi bi-box-seam me-2"></i>
          Warehouse System
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">

            <Nav.Link as={NavLink} to="/" end>
              <i className="bi bi-house me-2"></i>
              Dashboard
            </Nav.Link>

            <Nav.Link as={NavLink} to="/products">
              <i className="bi bi-box me-2"></i>
              Products
            </Nav.Link>

            <Nav.Link as={NavLink} to="/stock">
              <i className="bi bi-clipboard-data me-2"></i>
              Stock Management
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default AppNavbar;