import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function AppNavbar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="sm">
      <Container>
        <Navbar.Brand>
          <i className="bi bi-box-seam me-2"></i>Warehouse Inventory
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
            <Nav.Link as={NavLink} to="/stock">Stock</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
