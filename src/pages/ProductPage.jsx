import { useState, useCallback, useEffect } from 'react'
import ProductTable from '../components/ProductTable'
import ProductModal from '../components/ProductModal'
import ConfirmModal from '../components/ConfirmModal'
import AlertBox from '../components/AlertBox'

function ProductPage({ products, onAddProduct, onRemoveProduct }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    document.title = 'Product Management | Warehouse Inventory'
  }, [])

  const clearAlert = useCallback(() => setAlert(null), [])

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const inStockCount = products.filter((p) => p.quantity > 10).length
  const lowStockCount = products.filter(
    (p) => p.quantity >= 1 && p.quantity <= 10,
  ).length
  const outOfStockCount = products.filter((p) => p.quantity === 0).length

  const handleAddProduct = (newProduct) => {
    onAddProduct(newProduct)
    setAlert({
      type: 'success',
      message: `Product "${newProduct.name}" was added successfully.`,
    })
  }

  const handleConfirmDelete = () => {
    if (!productToDelete) return
    onRemoveProduct(productToDelete.id)
    setAlert({
      type: 'success',
      message: `Product "${productToDelete.name}" was removed.`,
    })
    setProductToDelete(null)
  }

  return (
    <div className="container py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
        <div>
          <h2 className="mb-1">Product Management</h2>
          <p className="text-muted mb-0">
            View, search, add, and remove warehouse products.
          </p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          <i className="bi bi-plus-lg me-1"></i>
          Add Product
        </button>
      </div>

      <AlertBox alert={alert} onClose={clearAlert} />

      {/* Summary Cards using Bootstrap Responsive Grid */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="text-muted small">Total Products</div>
              <div className="fs-3 fw-bold">{products.length}</div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="text-muted small">In Stock</div>
              <div className="fs-3 fw-bold text-success">{inStockCount}</div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="text-muted small">Low Stock</div>
              <div className="fs-3 fw-bold text-warning">{lowStockCount}</div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="text-muted small">Out of Stock</div>
              <div className="fs-3 fw-bold text-danger">{outOfStockCount}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Product Table Card */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white py-3">
          <div className="row align-items-center g-2">
            <div className="col-md-6">
              <h5 className="mb-0">Product List</h5>
            </div>
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by product name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setSearchTerm('')}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="card-body p-0">
          <ProductTable
            products={filteredProducts}
            onRemove={(product) => setProductToDelete(product)}
          />
        </div>
      </div>

      <ProductModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddProduct={handleAddProduct}
      />

      <ConfirmModal
        show={Boolean(productToDelete)}
        title="Confirm Product Removal"
        message={
          productToDelete
            ? `Are you sure you want to remove "${productToDelete.name}" (ID: ${productToDelete.id})?`
            : ''
        }
        onConfirm={handleConfirmDelete}
        onCancel={() => setProductToDelete(null)}
      />
    </div>
  )
}

export default ProductPage
