import { useState, useCallback, useEffect } from 'react'
import ProductTable from '../components/ProductTable'
import StockModal from '../components/StockModal'
import AlertBox from '../components/AlertBox'

function StockPage({ products, onUpdateStock }) {
  const [showStockModal, setShowStockModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [movementType, setMovementType] = useState('in')
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    document.title = 'Stock Management | Warehouse Inventory'
  }, [])

  const clearAlert = useCallback(() => setAlert(null), [])

  const totalUnits = products.reduce((sum, p) => sum + p.quantity, 0)
  const lowStockCount = products.filter(
    (p) => p.quantity >= 1 && p.quantity <= 10,
  ).length
  const outOfStockCount = products.filter((p) => p.quantity === 0).length

  const openStockModal = (product, type) => {
    setSelectedProduct(product)
    setMovementType(type)
    setShowStockModal(true)
  }

  const handleUpdateStock = (productId, type, amount) => {
    const product = products.find((p) => p.id === productId)
    if (!product) return

    if (!amount || Number.isNaN(amount) || amount <= 0) {
      setAlert({
        type: 'danger',
        message: 'Please enter a valid quantity greater than 0.',
      })
      return
    }

    const qty = Math.floor(amount)

    if (type === 'out' && qty > product.quantity) {
      setAlert({
        type: 'danger',
        message: `Cannot stock out ${qty} units of "${product.name}". Only ${product.quantity} available.`,
      })
      return
    }

    onUpdateStock(productId, type, qty)

    const actionText = type === 'in' ? 'added to' : 'deducted from'
    setAlert({
      type: 'success',
      message: `Successfully ${actionText} "${product.name}" (${qty} units).`,
    })
  }

  return (
    <div className="container py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
        <div>
          <h2 className="mb-1">Stock Management</h2>
          <p className="text-muted mb-0">
            Perform Stock In and Stock Out movements and monitor inventory levels.
          </p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          disabled={products.length === 0}
          onClick={() => openStockModal(products[0], 'in')}
        >
          <i className="bi bi-arrow-left-right me-1"></i>
          Stock Movement
        </button>
      </div>

      <AlertBox alert={alert} onClose={clearAlert} />

      {/* Summary Cards using Bootstrap Responsive Grid */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="text-muted small">Total Stock Units</div>
              <div className="fs-3 fw-bold text-primary">{totalUnits}</div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="text-muted small">Low Stock Items (1-10)</div>
              <div className="fs-3 fw-bold text-warning">{lowStockCount}</div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="text-muted small">Out of Stock Items (0)</div>
              <div className="fs-3 fw-bold text-danger">{outOfStockCount}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stock Table Card */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white py-3">
          <h5 className="mb-0">Current Stock Levels</h5>
        </div>
        <div className="card-body p-0">
          <ProductTable products={products} onStockAction={openStockModal} />
        </div>
      </div>

      {showStockModal && (
        <StockModal
          show={showStockModal}
          products={products}
          selectedProduct={selectedProduct}
          defaultType={movementType}
          onClose={() => setShowStockModal(false)}
          onUpdateStock={handleUpdateStock}
        />
      )}
    </div>
  )
}

export default StockPage
