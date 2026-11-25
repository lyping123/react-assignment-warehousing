import { useState } from 'react'

function ProductModal({ show, onClose, onAddProduct }) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Electronics')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')
  const [error, setError] = useState('')

  if (!show) return null

  const resetForm = () => {
    setName('')
    setCategory('Electronics')
    setQuantity('')
    setPrice('')
    setError('')
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const trimmedName = name.trim()
    const parsedQty = Number(quantity)
    const parsedPrice = Number(price)

    if (!trimmedName) {
      setError('Please enter a product name.')
      return
    }
    if (quantity === '' || Number.isNaN(parsedQty) || parsedQty < 0) {
      setError('Quantity must be 0 or greater.')
      return
    }
    if (price === '' || Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      setError('Unit price must be greater than 0.')
      return
    }

    onAddProduct({
      name: trimmedName,
      category,
      quantity: Math.floor(parsedQty),
      price: parsedPrice,
    })

    resetForm()
    onClose()
  }

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-plus-square me-2"></i>
                  Add New Product
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleClose}
                ></button>
              </div>

              <div className="modal-body">
                {error && (
                  <div className="alert alert-danger py-2">{error}</div>
                )}

                <div className="mb-3">
                  <label className="form-label">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Mechanical Keyboard"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Stationery">Stationery</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      min="0"
                      placeholder="0"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Unit Price ($)</label>
                    <input
                      type="number"
                      className="form-control"
                      min="0.01"
                      step="0.01"
                      placeholder="0.00"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <i className="bi bi-check-lg me-1"></i>
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  )
}

export default ProductModal
