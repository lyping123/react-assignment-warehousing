import { useState, useEffect } from "react";
import { Routes, Route, Navigate, NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { initialProducts } from "./data";
import AlertBox from "./components/AlertBox";
import ProductPage from "./pages/ProductPage";
import StockPage from "./pages/StockPage";

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [alert, setAlert] = useState(null); // { variant, message }

  // auto-dismiss alert after 3 seconds
  useEffect(() => {
    if (!alert) return;
    const t = setTimeout(() => setAlert(null), 3000);
    return () => clearTimeout(t);
  }, [alert]);

  const notify = (variant, message) => setAlert({ variant, message });

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="sm" className="mb-3">
        <Container>
          <Navbar.Brand><i className="bi bi-box-seam me-2" />Warehouse Inventory</Navbar.Brand>
          <Navbar.Toggle aria-controls="nav" />
          <Navbar.Collapse id="nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
              <Nav.Link as={NavLink} to="/stock">Stock</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <AlertBox alert={alert} onClose={() => setAlert(null)} />
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<ProductPage products={products} setProducts={setProducts} notify={notify} />} />
          <Route path="/stock" element={<StockPage products={products} setProducts={setProducts} notify={notify} />} />
        </Routes>
      </Container>
    </>
  );
}
