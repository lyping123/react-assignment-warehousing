import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import AppNavbar from "../components/AppNavbar.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import ProductManagement from "../pages/ProductManagement.jsx";
import StockManagement from "../pages/StockManagement.jsx";

function App() {

  // Shared Product Data
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", quantity: 20 },
    { id: 2, name: "Keyboard", quantity: 50 },
    { id: 3, name: "Mouse", quantity: 35 }
  ]);

  // Shared Stock History
  const [history, setHistory] = useState([]);

  return (
    <>
      <AppNavbar />

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/products"
          element={
            <ProductManagement
              products={products}
              setProducts={setProducts}
            />
          }
        />

        <Route
          path="/stock"
          element={
            <StockManagement
              products={products}
              setProducts={setProducts}
              history={history}
              setHistory={setHistory}
            />
          }
        />

      </Routes>
    </>
  );
}

export default App;