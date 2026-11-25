import { useEffect, useState } from 'react'
import { BrowserRouter, NavLink, Navigate, Route, Routes } from 'react-router-dom'
import AlertBox from './components/AlertBox.jsx'
import ConfirmModal from './components/ConfirmModal.jsx'
import ProductModal from './components/ProductModal.jsx'
import ProductTable from './components/ProductTable.jsx'
import StockModal from './components/StockModal.jsx'
import StockBadge from './components/StockBadge.jsx'
import './App.css'

const initialProducts = [
  { id: 1001, name: 'Wireless Mouse', category: 'Electronics', quantity: 120, price: 25.5 },
  { id: 1002, name: 'Keyboard', category: 'Electronics', quantity: 8, price: 45 },
  { id: 1003, name: 'Office Chair', category: 'Furniture', quantity: 0, price: 180 },
  { id: 1004, name: 'Monitor', category: 'Electronics', quantity: 25, price: 350 },
  { id: 1005, name: 'Desk Lamp', category: 'Furniture', quantity: 6, price: 32.75 },
]

function App() {
  const [products, setProducts] = useState(initialProducts)
  const [alert, setAlert] = useState(null)
  const [language, setLanguage] = useState(() =>
    window.localStorage.getItem('warehouse-language') || 'en'
  )
  const isChinese = language === 'zh'
  const text = {
    products: isChinese ? '产品' : 'Products',
    stock: isChinese ? '库存管理' : 'Stock Management',
  }

  useEffect(() => {
    document.title = isChinese ? 'WareHouse | 仓库库存管理' : 'WareHouse | Inventory Management'
    window.localStorage.setItem('warehouse-language', language)
  }, [isChinese, language])

  const showAlert = (type, message) => setAlert({ type, message })

  const addProduct = (product) => {
    if (products.some((item) => item.id === product.id)) {
      showAlert('danger', isChinese ? `产品编号 ${product.id} 已存在。` : `Product ID ${product.id} already exists.`)
      return false
    }
    setProducts((current) => [...current, product])
    showAlert('success', isChinese ? `${product.name} 已成功添加。` : `${product.name} was added successfully.`)
    return true
  }

  const removeProduct = (product) => {
    setProducts((current) => current.filter((item) => item.id !== product.id))
    showAlert('warning', isChinese ? `${product.name} 已从库存中删除。` : `${product.name} was removed from inventory.`)
  }

  const editProduct = (updatedProduct) => {
    setProducts((current) => current.map((item) =>
      item.id === updatedProduct.id ? updatedProduct : item
    ))
    showAlert('success', isChinese ? `${updatedProduct.name} 已成功更新。` : `${updatedProduct.name} was updated successfully.`)
    return true
  }

  const updateStock = (productId, operation, amount) => {
    const product = products.find((item) => item.id === productId)
    if (!product) {
      showAlert('danger', isChinese ? '请选择有效产品。' : 'Please select a valid product.')
      return false
    }
    if (!Number.isInteger(amount) || amount <= 0) {
      showAlert('danger', isChinese ? '请输入大于零的整数。' : 'Enter a whole number greater than zero.')
      return false
    }
    if (operation === 'out' && amount > product.quantity) {
      showAlert('danger', isChinese
        ? `出库数量不能超过可用库存（${product.quantity}）。`
        : `Stock Out cannot exceed available quantity (${product.quantity}).`)
      return false
    }

    const nextQuantity = operation === 'in'
      ? product.quantity + amount
      : product.quantity - amount

    setProducts((current) => current.map((item) =>
      item.id === productId ? { ...item, quantity: nextQuantity } : item
    ))
    showAlert(
      'success',
      isChinese
        ? `${operation === 'in' ? '入库' : '出库'}完成：${product.name} 变动 ${amount} 件。`
        : `${operation === 'in' ? 'Stock In' : 'Stock Out'} completed: ${amount} unit(s) for ${product.name}.`
    )
    return true
  }

  return (
    <BrowserRouter>
      <div className="app-shell">
        <nav className="navbar navbar-expand-lg navbar-dark warehouse-navbar">
          <div className="container-fluid px-3 px-lg-4">
            <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/products">
              <span className="brand-mark"><i className="bi bi-box-seam" /></span>
              <span><strong>Ware</strong>House</span>
            </NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="mainNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/products"><i className="bi bi-grid me-2" />{text.products}</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/stock"><i className="bi bi-arrow-left-right me-2" />{text.stock}</NavLink>
                </li>
                <li className="nav-item d-flex align-items-center ms-lg-2">
                  <button
                    type="button"
                    className="btn language-toggle"
                    title={isChinese ? 'Switch to English' : '切换中文'}
                    onClick={() => setLanguage(isChinese ? 'en' : 'zh')}
                  >
                    <i className="bi bi-globe2 me-2" />{isChinese ? '中文 / EN' : 'EN / 中文'}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main className="container-fluid page-container px-3 px-lg-4">
          <AlertBox alert={alert} language={language} onClose={() => setAlert(null)} />
          <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/products" element={<ProductPage products={products} language={language} onAdd={addProduct} onEdit={editProduct} onRemove={removeProduct} />} />
            <Route path="/stock" element={<StockPage products={products} language={language} onUpdateStock={updateStock} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

function ProductPage({ products, language, onAdd, onEdit, onRemove }) {
  const [search, setSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [productToEdit, setProductToEdit] = useState(null)
  const [productToRemove, setProductToRemove] = useState(null)
  const isChinese = language === 'zh'
  const inventoryValue = products.reduce((sum, product) => sum + product.quantity * product.price, 0)
  const lowStockCount = products.filter((product) => product.quantity > 0 && product.quantity <= 10).length
  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(search.trim().toLowerCase())
  )

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <span className="eyebrow">{isChinese ? '库存' : 'Inventory'}</span>
          <h1>{isChinese ? '产品管理' : 'Product Management'}</h1>
          <p>{isChinese ? '管理仓库产品和单价。' : 'Manage your warehouse products and unit prices.'}</p>
        </div>

        <button className="btn btn-primary add-button" onClick={() => setShowAdd(true)}>
          <i className="bi bi-plus-lg me-2" />{isChinese ? '添加产品' : 'Add Product'}
        </button>
      </div>

      <div className="row g-3 mb-4 product-summary-row">
        <div className="col-12 col-md-4">
          <div className="summary-card summary-purple">
            <div className="summary-icon"><i className="bi bi-box2" /></div>
            <div><span>{isChinese ? '产品总数' : 'Total Products'}</span><strong>{products.length}</strong></div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="summary-card summary-yellow">
            <div className="summary-icon"><i className="bi bi-exclamation-circle" /></div>
            <div><span>{isChinese ? '库存不足' : 'Low Stock'}</span><strong>{lowStockCount}</strong></div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="summary-card summary-blue">
            <div className="summary-icon"><i className="bi bi-currency-dollar" /></div>
            <div>
              <span>{isChinese ? '库存价值' : 'Inventory Value'}</span>
              <strong className="value-text">${inventoryValue.toFixed(2)}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="card inventory-card">
        <div className="card-header inventory-card-header">
          <div className="search-box">
            <i className="bi bi-search" />
            <input type="search" className="form-control" placeholder={isChinese ? '按产品名称搜索...' : 'Search by product name...'} value={search} onChange={(event) => setSearch(event.target.value)} />
          </div>
          <span className="record-count">{filtered.length} {isChinese ? '个产品' : 'product(s)'}</span>
        </div>
        <ProductTable products={filtered} language={language} onEdit={setProductToEdit} onRemove={setProductToRemove} />
      </div>

      <ProductModal
        show={showAdd || Boolean(productToEdit)}
        language={language}
        product={productToEdit}
        onClose={() => {
          setShowAdd(false)
          setProductToEdit(null)
        }}
        onAdd={(product) => {
          if (onAdd(product)) setShowAdd(false)
        }}
        onEdit={(product) => {
          if (onEdit(product)) setProductToEdit(null)
        }}
      />
      <ConfirmModal
        show={Boolean(productToRemove)}
        product={productToRemove}
        language={language}
        onClose={() => setProductToRemove(null)}
        onConfirm={() => {
          onRemove(productToRemove)
          setProductToRemove(null)
        }}
      />
    </div>
  )
}

function StockPage({ products, language, onUpdateStock }) {
  const [showStock, setShowStock] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const isChinese = language === 'zh'
  const outOfStock = products.filter((product) => product.quantity === 0).length
  const lowStock = products.filter((product) => product.quantity > 0 && product.quantity <= 10).length
  const inStock = products.filter((product) => product.quantity > 10).length

  const openStockModal = (product) => {
    setSelectedProduct(product)
    setShowStock(true)
  }

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <span className="eyebrow">{isChinese ? '库存变动' : 'Movement'}</span>
          <h1>{isChinese ? '库存管理' : 'Stock Management'}</h1>
          <p>{isChinese ? '监控库存数量并记录库存变动。' : 'Monitor quantities and record stock movements.'}</p>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <SummaryCard title={isChinese ? '库存充足' : 'In Stock'} count={inStock} icon="bi-box-seam" tone="green" />
        <SummaryCard title={isChinese ? '库存不足' : 'Low Stock'} count={lowStock} icon="bi-exclamation-circle" tone="yellow" />
        <SummaryCard title={isChinese ? '缺货' : 'Out of Stock'} count={outOfStock} icon="bi-x-circle" tone="red" />
      </div>

      <div className="card inventory-card">
        <div className="card-header inventory-card-header">
          <h2 className="section-title mb-0">{isChinese ? '库存概览' : 'Stock Overview'}</h2>
          <span className="record-count">{products.length} {isChinese ? '个项目' : 'item(s)'}</span>
        </div>
        <div className="table-responsive">
          <table className="table align-middle mb-0 inventory-table">
            <thead>
              <tr>
                <th>{isChinese ? '产品编号' : 'Product ID'}</th>
                <th>{isChinese ? '产品' : 'Product'}</th>
                <th>{isChinese ? '类别' : 'Category'}</th>
                <th>{isChinese ? '可用库存' : 'Available'}</th>
                <th>{isChinese ? '状态' : 'Status'}</th>
                <th className="text-end">{isChinese ? '操作' : 'Action'}</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td><span className="product-id">#{product.id}</span></td>
                  <td><strong>{product.name}</strong></td>
                  <td><span className="category-pill">{product.category}</span></td>
                  <td><span className="quantity-value">{product.quantity}</span> {isChinese ? '件' : 'units'}</td>
                  <td><StockBadge quantity={product.quantity} language={language} /></td>
                  <td className="text-end">
                    <button className="btn btn-outline-primary stock-button" onClick={() => openStockModal(product)}>
                      <i className="bi bi-arrow-left-right me-2" />{isChinese ? '管理' : 'Manage'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <StockModal
        show={showStock}
        products={products}
        language={language}
        selectedProduct={selectedProduct}
        onClose={() => setShowStock(false)}
        onUpdate={onUpdateStock}
      />
    </div>
  )
}

function SummaryCard({ title, count, icon, tone }) {
  return (
    <div className="col-12 col-md-4">
      <div className={`summary-card summary-${tone}`}>
        <div className="summary-icon"><i className={`bi ${icon}`} /></div>
        <div><span>{title}</span><strong>{count}</strong></div>
      </div>
    </div>
  )
}

export default App
