import { useState } from "react";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import ProductPage from "./productpage.jsx";
import StockPage from "./StockPage.jsx";

const initialProducts = [
  { id: 1001, name: "Wireless Mouse", category: "Electronics", quantity: 120, price: 25.5 },
  { id: 1002, name: "Keyboard", category: "Electronics", quantity: 8, price: 45 },
  { id: 1003, name: "Office Chair", category: "Furniture", quantity: 0, price: 180 },
  { id: 1004, name: "Monitor", category: "Electronics", quantity: 25, price: 350 },
];

function Head({ title }) {
  const [products, setProducts] = useState(initialProducts);

  const handleAddProduct = (product) => {
    setProducts((currentProducts) => {
      const nextId = currentProducts.reduce(
        (largestId, currentProduct) => Math.max(largestId, currentProduct.id),
        0,
      ) + 1;
      return [...currentProducts, { ...product, id: nextId }];
    });
  };

  const handleRemoveProduct = (id) => {
    setProducts((currentProducts) => currentProducts.filter((product) => product.id !== id));
  };

  const handleStockIn = (id, quantity) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === id ? { ...product, quantity: product.quantity + quantity } : product,
      ),
    );
  };

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/product">
            {title}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/product">
                  Product Management
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/stock">
                  Stock Management
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/product" replace />} />
        <Route
          path="/product"
          element={
            <ProductPage
              products={products}
              onAddProduct={handleAddProduct}
              onRemoveProduct={handleRemoveProduct}
              onStockIn={handleStockIn}
            />
          }
        />
        <Route
          path="/stock"
          element={
            <StockPage
              products={products}
              onRemoveProduct={handleRemoveProduct}
              onStockIn={handleStockIn}
            />
          }
        />
        <Route path="*" element={<Navigate to="/product" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function Footer() {
  return (
    <footer>
      <p>© 2024 My React App. All rights reserved.</p>
    </footer>
  );
}

export { Head, Footer };
