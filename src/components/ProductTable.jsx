import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import StockStatusBadge from './StockStatusBadge.jsx'

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export default function ProductTable({ products, onRemove }) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon"><i className="bi bi-search" aria-hidden="true" /></span>
        <h3>No products found</h3>
        <p>Try a different search, or add a new product to your inventory.</p>
      </div>
    )
  }

  return (
    <div className="table-responsive">
      <Table hover className="product-table align-middle mb-0">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Category</th>
            <th scope="col">Quantity</th>
            <th scope="col">Unit price</th>
            <th scope="col">Status</th>
            <th scope="col"><span className="visually-hidden">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <div className="product-cell">
                  <span className="product-initial">{product.name.charAt(0).toUpperCase()}</span>
                  <span>
                    <span className="product-name">{product.name}</span>
                    <span className="product-id">ID {product.id}</span>
                  </span>
                </div>
              </td>
              <td><span className="category-label">{product.category}</span></td>
              <td><span className="quantity-value">{product.quantity}</span><span className="unit-label"> units</span></td>
              <td className="price-value">{currency.format(product.price)}</td>
              <td><StockStatusBadge quantity={product.quantity} /></td>
              <td className="text-end">
                <Button
                  variant="light"
                  className="icon-button remove-button"
                  aria-label={`Remove ${product.name}`}
                  title={`Remove ${product.name}`}
                  onClick={() => onRemove(product)}
                >
                  <i className="bi bi-trash3" aria-hidden="true" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
