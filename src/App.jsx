import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import initialProducts from './data/products'
import Navbar from './components/Navbar'
import ProductPage from './pages/ProductPage'
import StockPage from './pages/StockPage'

function App() {
  const [products, setProducts] = useState(initialProducts)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme)
  }, [theme])

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const handleAddProduct = (newProduct) => {
    setProducts((prev) => {
      const nextId =
        prev.length > 0 ? Math.max(...prev.map((p) => p.id)) + 1 : 1001
      return [...prev, { id: nextId, ...newProduct }]
    })
  }

  const handleRemoveProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const handleUpdateStock = (id, type, amount) => {
    setProducts((prev) =>
      prev.map((product) => {
        if (product.id !== id) return product
        const updatedQuantity =
          type === 'in' ? product.quantity + amount : product.quantity - amount
        return { ...product, quantity: updatedQuantity }
      }),
    )
  }

  return (
    <BrowserRouter>
      <Navbar theme={theme} onToggleTheme={handleToggleTheme} />
      <Routes>
        <Route
          path="/"
          element={
            <ProductPage
              products={products}
              onAddProduct={handleAddProduct}
              onRemoveProduct={handleRemoveProduct}
            />
          }
        />
        <Route
          path="/stock"
          element={
            <StockPage
              products={products}
              onUpdateStock={handleUpdateStock}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
