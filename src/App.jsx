import { useEffect, useState } from "react";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import { initialProducts } from "./data/products";
import AlertBox from "./components/AlertBox";
import ProductModal from "./components/ProductModal";
import ConfirmModal from "./components/ConfirmModal";
import StockModal from "./components/StockModal";
import ProductsPage from "./pages/ProductsPage";
import StockPage from "./pages/StockPage";

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [alert, setAlert] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [productToRemove, setProductToRemove] = useState(null);
  const [showStockModal, setShowStockModal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!alert) return;
    const timer = window.setTimeout(() => setAlert(null), 4000);
    return () => window.clearTimeout(timer);
  }, [alert]);

  const nextId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1001;

  function addProduct(product) {
    setProducts((current) => [...current, product]);
    setAlert({ type: "success", message: `${product.name} was added successfully.` });
  }

  function removeProduct() {
    if (!productToRemove) return;
    setProducts((current) => current.filter((p) => p.id !== productToRemove.id));
    setAlert({ type: "success", message: `${productToRemove.name} was removed successfully.` });
    setProductToRemove(null);
  }

  function moveStock(id, movement, amount) {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    if (movement === "out" && amount > product.quantity) {
      setAlert({ type: "danger", message: `Stock out failed. Only ${product.quantity} units are available.` });
      return;
    }
    setProducts((current) => current.map((p) => p.id === id ? { ...p, quantity: p.quantity + (movement === "in" ? amount : -amount) } : p));
    setAlert({ type: "success", message: `${movement === "in" ? "Stock in" : "Stock out"} completed for ${product.name}: ${amount} units.` });
  }

  return (
    <div className="app-shell">
      <Navbar expand="lg" className="top-navbar">
        <Container fluid className="app-container">
          <Navbar.Brand as={NavLink} to="/products" className="brand"><span className="brand-mark"><i className="bi bi-boxes"></i></span><span>Ware<span>Flow</span><small>WAREHOUSE SYSTEM</small></span></Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <div className="navbar-links ms-lg-5">
              <NavLink to="/products" className={({ isActive }) => `nav-item-link ${isActive ? "active" : ""}`}><i className="bi bi-grid me-2"></i>Products</NavLink>
              <NavLink to="/stock" className={({ isActive }) => `nav-item-link ${isActive ? "active" : ""}`}><i className="bi bi-box-seam me-2"></i>Stock Management</NavLink>
            </div>
            <div className="ms-auto navbar-tag d-none d-lg-flex"><span className="online-dot"></span> Frontend Demo</div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main className="main-area"><Container fluid className="app-container">
        <AlertBox alert={alert} onClose={() => setAlert(null)} />
        <Routes>
          <Route path="/" element={<ProductsPage products={products} onAddClick={() => setShowProductModal(true)} onRemoveClick={setProductToRemove} />} />
          <Route path="/products" element={<ProductsPage products={products} onAddClick={() => setShowProductModal(true)} onRemoveClick={setProductToRemove} />} />
          <Route path="/stock" element={<StockPage products={products} onStockClick={() => setShowStockModal(true)} />} />
          <Route path="*" element={<ProductsPage products={products} onAddClick={() => setShowProductModal(true)} onRemoveClick={setProductToRemove} />} />
        </Routes>
        <footer className="app-footer">© 2026 WareFlow Warehouse Inventory System <span>React JS · React Bootstrap</span></footer>
      </Container></main>
      <ProductModal show={showProductModal} onHide={() => setShowProductModal(false)} onSave={addProduct} nextId={nextId} />
      <ConfirmModal show={Boolean(productToRemove)} product={productToRemove} onCancel={() => setProductToRemove(null)} onConfirm={removeProduct} />
      <StockModal show={showStockModal} onHide={() => setShowStockModal(false)} products={products} onMove={moveStock} />
    </div>
  );
}