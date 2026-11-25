function getStockStatusBadge(quantity) {
  if (quantity === 0) {
    return <span className="badge bg-danger">Out of Stock</span>
  }
  if (quantity <= 10) {
    return <span className="badge bg-warning text-dark">Low Stock</span>
  }
  return <span className="badge bg-success">In Stock</span>
}

function ProductTable({ products, onRemove, onStockAction }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Status</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center text-muted py-4">
                No products found.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id}>
                <td className="fw-semibold">{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td className="fw-semibold">{product.quantity}</td>
                <td>${Number(product.price).toFixed(2)}</td>
                <td>{getStockStatusBadge(product.quantity)}</td>
                <td className="text-end">
                  {onRemove && (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onRemove(product)}
                    >
                      <i className="bi bi-trash me-1"></i>
                      Remove
                    </button>
                  )}

                  {onStockAction && (
                    <div className="d-inline-flex gap-2">
                      <button
                        type="button"
                        className="btn btn-sm btn-success"
                        onClick={() => onStockAction(product, 'in')}
                      >
                        <i className="bi bi-plus-circle me-1"></i>
                        Stock In
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() => onStockAction(product, 'out')}
                      >
                        <i className="bi bi-dash-circle me-1"></i>
                        Stock Out
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTable
