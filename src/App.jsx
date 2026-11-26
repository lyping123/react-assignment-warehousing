import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom'
import AlertBox from './components/AlertBox.jsx'
import ProductPage from './pages/ProductPage.jsx'
import StockPage from './pages/StockPage.jsx'
import { initialProducts } from './data/initialProducts.js'
import './App.css'

function AppLayout({ products, onAddProduct, onRemoveProduct, onUpdateStock, alert, onDismissAlert }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container app-container d-flex align-items-center justify-content-between">
          <NavLink className="brand" to="/products" aria-label="Warehouse home">
            <span className="brand-mark"><i className="bi bi-box-seam" aria-hidden="true" /></span>
            <span>Stockroom<span className="brand-period">.</span></span>
          </NavLink>
          <nav className="main-nav" aria-label="Main navigation">
            <NavLink to="/products" className={({ isActive }) => `nav-item-link${isActive ? ' active' : ''}`}>
              Products
            </NavLink>
            <NavLink to="/stock" className={({ isActive }) => `nav-item-link${isActive ? ' active' : ''}`}>
              Stock
            </NavLink>
          </nav>
          <div className="warehouse-chip"><span className="status-dot" /> Main Warehouse</div>
        </div>
      </header>

      <main className="container app-container app-main">
        <AlertBox alert={alert} onDismiss={onDismissAlert} />
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route
            path="/products"
            element={<ProductPage products={products} onAddProduct={onAddProduct} onRemoveProduct={onRemoveProduct} />}
          />
          <Route path="/stock" element={<StockPage products={products} onUpdateStock={onUpdateStock} />} />
          <Route path="*" element={<Navigate to="/products" replace />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <div className="container app-container d-flex justify-content-between">
          <span>Stockroom Inventory</span>
          <span>Inventory overview <span className="footer-separator">/</span> {products.length} products</span>
        </div>
      </footer>
    </div>
  )
}

export default function App() {
  const [products, setProducts] = useState(initialProducts)
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    if (!alert) return undefined
    const timer = window.setTimeout(() => setAlert(null), 5000)
    return () => window.clearTimeout(timer)
  }, [alert])

  const showAlert = (type, message) => setAlert({ type, message, id: Date.now() })

  const addProduct = (product) => {
    setProducts((current) => [...current, { ...product, id: Math.max(1000, ...current.map((item) => item.id)) + 1 }])
    showAlert('success', 'Product added to your inventory.')
  }

  const removeProduct = (product) => {
    setProducts((current) => current.filter((item) => item.id !== product.id))
    showAlert('success', `${product.name} was removed from your inventory.`)
  }

  const updateStock = (productId, movement, quantity) => {
    const product = products.find((item) => item.id === productId)
    if (!product) {
      showAlert('danger', 'The selected product could not be found.')
      return
    }
    if (movement === 'out' && quantity > product.quantity) {
      showAlert('danger', `Only ${product.quantity} units of ${product.name} are available.`)
      return
    }

    setProducts((current) => current.map((item) => {
      if (item.id !== productId) return item
      return { ...item, quantity: item.quantity + (movement === 'in' ? quantity : -quantity) }
    }))
    showAlert('success', `${quantity} units ${movement === 'in' ? 'added to' : 'removed from'} ${product.name}.`)
  }

  return (
    <BrowserRouter>
      <AppLayout
        products={products}
        onAddProduct={addProduct}
        onRemoveProduct={removeProduct}
        onUpdateStock={updateStock}
        alert={alert}
        onDismissAlert={() => setAlert(null)}
      />
    </BrowserRouter>
  )
}
