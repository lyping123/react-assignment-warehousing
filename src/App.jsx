// App.jsx – the root component
// Manages shared `products` state and `lang` ("en" or "zh") state.
// Passes data and translation object `t` down to pages via props.

import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import initialProducts from "./data/products";
import translations from "./data/translations";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import StockPage from "./pages/StockPage";

function App() {
  // Single source of truth for all product data
  const [products, setProducts] = useState(initialProducts);

  // Language state: "zh" (Chinese) or "en" (English)
  const [lang, setLang] = useState("zh");

  // Get the current language dictionary
  const t = translations[lang];

  // Toggle between English and Chinese
  function toggleLang() {
    setLang(lang === "en" ? "zh" : "en");
  }

  return (
    <BrowserRouter>
      {/* Navbar always visible at the top */}
      <Navbar t={t} onToggleLang={toggleLang} />

      {/* Page content changes based on URL */}
      <Routes>
        <Route path="/" element={<HomePage t={t} />} />
        <Route
          path="/products"
          element={
            <ProductPage products={products} setProducts={setProducts} t={t} />
          }
        />
        <Route
          path="/stock"
          element={
            <StockPage products={products} setProducts={setProducts} t={t} />
          }
        />
        {/* Redirect unknown URLs to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
