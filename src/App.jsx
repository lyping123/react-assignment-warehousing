
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppNavbar from "./components/AppNavbar";
import Dashboard from "./pages/Dashboard";
import ProductManagement from "./pages/ProductManagement";
import StockManagement from "./pages/StockManagement";

function App() {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", quantity: 20 },
    { id: 2, name: "Keyboard", quantity: 50 }
  ]);

  const [history, setHistory] = useState([]);

  return (
    <BrowserRouter>
      <AppNavbar />

      <Routes>
       <Route
        path="/"
         element={<Dashboard products={products} />}
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
    </BrowserRouter>
  );
}

export default App;
