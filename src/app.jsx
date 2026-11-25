import { useState, useEffect } from "react";
import { Routes, Route, Navigate, NavLink } from "react-router-dom";
import { initialProducts } from "./data/products";
import AlertBox from "./components/AlertBox";
import ProductPage from "./pages/ProductPage";
import StockPage from "./pages/StockPage";

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [alert, setAlert] = useState(null); // { variant, message }

  // Auto-dismiss alert after 3 seconds
  useEffect(() => {
    if (!alert) return;
    const t = setTimeout(() => setAlert(null), 3000);
    return () => clearTimeout(t);
  }, [alert]);

  const showAlert = (variant, message) => setAlert({ variant, message });

  const addProduct = (data) => {
    const nextId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1001;
    setProducts([...products, { id: nextId, ...data }]);
    showAlert("success", `Product "${data.name}" was added successfully.`);
  };

  const removeProduct = (id) => {
    const target = products.find((p) => p.id === id);
    setProducts(products.filter((p) => p.id !== id));
    showAlert("success", `Product "${target.name}" was removed.`);
  };

  const moveStock = (id, type, qty) => {
    const target = products.find((p) => p.id === id);
    if (!target) return { ok: false, message: "Please select a product." };
    if (!Number.isInteger(qty) || qty <= 0)
      return { ok: false, message: "Quantity must be a whole number greater than 0." };
    if (type === "out" && qty > target.quantity)
      return {
        ok: false,
        message: `Cannot stock out ${qty}. Only ${target.quantity} available for "${target.name}".`,
      };
    const newQty = type === "in" ? target.quantity + qty : target.quantity - qty;
    setProducts(products.map((p) => (p.id === id ? { ...p, quantity: newQty } : p)));
    showAlert("success", `Stock ${type === "in" ? "In" : "Out"} successful: "${target.name}" is now ${newQty}.`);
    return { ok: true };
  };

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-3">
        <div className="container">
          <span className="navbar-brand"><i className="bi bi-box-seam me-2"></i>Warehouse Inventory</span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mainNav">
            <div className="navbar-nav ms-auto">
              <NavLink className="nav-link" to="/products"><i className="bi bi-table me-1"></i>Product Management</NavLink>
              <NavLink className="nav-link" to="/stock"><i className="bi bi-arrow-left-right me-1"></i>Stock Management</NavLink>
            </div>
          </div>
        </div>
      </nav>

      <div className="container">
        <AlertBox alert={alert} onClose={() => setAlert(null)} />
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<ProductPage products={products} onAdd={addProduct} onRemove={removeProduct} />} />
          <Route path="/stock" element={<StockPage products={products} onMove={moveStock} />} />
        </Routes>
      </div>
    </>
  );
}