import { useEffect, useState } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AlertBox from './AlertBox.jsx';
import ProductTable from './ProductTable.jsx';
import ProductModal from './ProductModal.jsx';
import ConfirmModal from './ConfirmModal.jsx';
import StockModal from './StockModal.jsx';
import './App.css';

const initialProducts = [
  { id: 1001, name: 'Wireless Mouse', category: 'Electronics', quantity: 120, price: 25.5 },
  { id: 1002, name: 'Keyboard', category: 'Electronics', quantity: 8, price: 45 },
  { id: 1003, name: 'Office Chair', category: 'Furniture', quantity: 0, price: 180 },
  { id: 1004, name: 'Monitor', category: 'Electronics', quantity: 25, price: 350 },
];

function getProductIcon(product) {
  const name = product.name.toLowerCase();
  if (name.includes('mouse')) return '🖱️';
  if (name.includes('keyboard')) return '⌨️';
  if (name.includes('chair')) return '🪑';
  if (name.includes('monitor') || name.includes('screen')) return '🖥️';
  if (name.includes('laptop')) return '💻';
  if (name.includes('phone')) return '📱';
  if (name.includes('headphone')) return '🎧';

  const category = product.category.toLowerCase();
  if (category.includes('electronic')) return '🔌';
  if (category.includes('furniture')) return '🪑';
  return '📦';
}

function StatusBadge({ quantity }) {
  if (quantity === 0) return <span className="badge text-bg-danger">Out of Stock</span>;
  if (quantity <= 10) return <span className="badge text-bg-warning">Low Stock</span>;
  return <span className="badge text-bg-success">In Stock</span>;
}

function AppShell() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [showProductModal, setShowProductModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [alert, setAlert] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (!alert) return undefined;
    const timer = setTimeout(() => setAlert(null), 4000);
    return () => clearTimeout(timer);
  }, [alert]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  const addProduct = (product) => {
    setProducts((current) => [...current, product]);
    setShowProductModal(false);
    setAlert({ type: 'success', message: `${product.name} was added successfully.` });
  };

  const requestRemove = (product) => {
    setSelectedProduct(product);
    setShowConfirmModal(true);
  };

  const removeProduct = () => {
    if (!selectedProduct) return;
    setProducts((current) => current.filter((product) => product.id !== selectedProduct.id));
    setAlert({ type: 'success', message: `${selectedProduct.name} was removed successfully.` });
    setShowConfirmModal(false);
    setSelectedProduct(null);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setSelectedProduct(null);
  };

  const openStock = (product) => {
    setSelectedProduct(product);
    setShowStockModal(true);
  };

  const updateStock = (quantity) => {
    setProducts((current) =>
      current.map((product) =>
        product.id === selectedProduct.id ? { ...product, quantity } : product,
      ),
    );
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/products">Warehouse Inventory</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`} to="/products">Products</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/stock' ? 'active' : ''}`} to="/stock">Stock</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        {alert && <AlertBox {...alert} onClose={() => setAlert(null)} />}
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route
            path="/products"
            element={
              <>
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
                  <div>
                    <h1 className="h2 mb-1">Product Management</h1>
                    <p className="text-secondary mb-0">{products.length} products in inventory</p>
                  </div>
                  <button className="btn btn-primary" onClick={() => setShowProductModal(true)}>Add Product</button>
                </div>
                <div className="card mb-3">
                  <div className="card-body">
                    <label className="form-label" htmlFor="product-search">Search products</label>
                    <input id="product-search" className="form-control" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by product name" />
                  </div>
                </div>
                <ProductTable products={filteredProducts} StatusBadge={StatusBadge} onRemove={requestRemove} />
              </>
            }
          />
          <Route
            path="/stock"
            element={
              <>
                <div className="mb-4">
                  <h1 className="h2 mb-1">Stock Management</h1>
                  <p className="text-secondary mb-0">Update stock quantities for warehouse products</p>
                </div>
                <div className="row g-3">
                  {products.map((product) => (
                    <div className="col-md-6 col-xl-4" key={product.id}>
                      <div className="card stock-card h-100">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start gap-2">
                            <div className="d-flex align-items-center gap-3">
                              <span className="stock-card__item" role="img" aria-label={`${product.name} icon`}>
                                {getProductIcon(product)}
                              </span>
                              <div>
                                <h2 className="h5">{product.name}</h2>
                                <p className="text-secondary mb-2">ID: {product.id}</p>
                              </div>
                            </div>
                            <StatusBadge quantity={product.quantity} />
                          </div>
                          <div className="display-6 my-3">{product.quantity}</div>
                          <button className="btn btn-outline-primary w-100" onClick={() => openStock(product)}>Manage Stock</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            }
          />
          <Route path="*" element={<Navigate to="/products" replace />} />
        </Routes>
      </main>

      <footer className="border-top py-3 mt-auto text-center text-secondary">
        Warehouse Inventory System
      </footer>

      <ProductModal show={showProductModal} products={products} onClose={() => setShowProductModal(false)} onAdd={addProduct} />
      <ConfirmModal show={showConfirmModal} product={selectedProduct} onClose={closeConfirmModal} onConfirm={removeProduct} />
      <StockModal show={showStockModal} product={selectedProduct} onClose={() => setShowStockModal(false)} onUpdate={updateStock} onAlert={setAlert} />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
