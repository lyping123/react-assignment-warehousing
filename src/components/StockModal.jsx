import { useState } from 'react'

function StockModal({
  show,
  products,
  selectedProduct,
  defaultType = 'in',
  onClose,
  onUpdateStock,
}) {
  const [productId, setProductId] = useState(
    selectedProduct ? String(selectedProduct.id) : String(products[0]?.id ?? ''),
  )
  const [movementType, setMovementType] = useState(defaultType)
  const [amount, setAmount] = useState('')

  if (!show) return null

  const currentProduct = products.find((p) => String(p.id) === productId)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!currentProduct) return

    const parsedAmount = Number(amount)
    onUpdateStock(currentProduct.id, movementType, parsedAmount)
    setAmount('')
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
                  <i className="bi bi-arrow-left-right me-2"></i>
                  {movementType === 'in' ? 'Stock In' : 'Stock Out'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={onClose}
                ></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Select Product</label>
                  <select
                    className="form-select"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                  >
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.id} - {product.name} (Stock: {product.quantity})
                      </option>
                    ))}
                  </select>
                </div>

                {currentProduct && (
                  <div className="bg-body-tertiary border rounded px-3 py-2 mb-3">
                    Current Available Stock:{' '}
                    <strong>{currentProduct.quantity}</strong>
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label">Movement Type</label>
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className={`btn flex-fill ${
                        movementType === 'in'
                          ? 'btn-success'
                          : 'btn-outline-success'
                      }`}
                      onClick={() => setMovementType('in')}
                    >
                      <i className="bi bi-plus-circle me-1"></i>
                      Stock In
                    </button>
                    <button
                      type="button"
                      className={`btn flex-fill ${
                        movementType === 'out'
                          ? 'btn-danger'
                          : 'btn-outline-danger'
                      }`}
                      onClick={() => setMovementType('out')}
                    >
                      <i className="bi bi-dash-circle me-1"></i>
                      Stock Out
                    </button>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    min="1"
                    placeholder="Enter quantity"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`btn ${
                    movementType === 'in' ? 'btn-success' : 'btn-danger'
                  }`}
                >
                  Confirm {movementType === 'in' ? 'Stock In' : 'Stock Out'}
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

export default StockModal
