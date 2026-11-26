import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import StockModal from '../components/StockModal.jsx'
import StockStatusBadge from '../components/StockStatusBadge.jsx'

export default function StockPage({ products, onUpdateStock }) {
  const [showStockModal, setShowStockModal] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState(null)
  const totalUnits = products.reduce((total, product) => total + product.quantity, 0)
  const lowStockCount = products.filter((product) => product.quantity > 0 && product.quantity <= 10).length
  const outOfStockCount = products.filter((product) => product.quantity === 0).length

  const openStockModal = (productId = null) => {
    setSelectedProductId(productId)
    setShowStockModal(true)
  }

  return (
    <>
      <section className="page-heading">
        <div>
          <div className="eyebrow">INVENTORY CONTROL</div>
          <h1>Stock management</h1>
          <p>Track quantities and record stock movements across your warehouse.</p>
        </div>
        <Button variant="primary" className="primary-button add-button" onClick={() => openStockModal()}>
          <i className="bi bi-arrow-left-right" aria-hidden="true" /> Adjust stock
        </Button>
      </section>

      <section className="summary-grid stock-summary" aria-label="Stock summary">
        <Card className="summary-card">
          <Card.Body>
            <div className="summary-icon summary-icon-purple"><i className="bi bi-stack" aria-hidden="true" /></div>
            <div><span className="summary-label">Total units</span><strong>{totalUnits.toLocaleString()}</strong></div>
            <span className="summary-caption">across products</span>
          </Card.Body>
        </Card>
        <Card className="summary-card">
          <Card.Body>
            <div className="summary-icon summary-icon-amber"><i className="bi bi-exclamation-circle" aria-hidden="true" /></div>
            <div><span className="summary-label">Low stock</span><strong>{lowStockCount}</strong></div>
            <span className="summary-caption">1–10 units</span>
          </Card.Body>
        </Card>
        <Card className="summary-card">
          <Card.Body>
            <div className="summary-icon summary-icon-red"><i className="bi bi-x-circle" aria-hidden="true" /></div>
            <div><span className="summary-label">Out of stock</span><strong>{outOfStockCount}</strong></div>
            <span className="summary-caption">requires restock</span>
          </Card.Body>
        </Card>
      </section>

      <section className="stock-section">
        <div className="section-title-row">
          <div>
            <h2>Current inventory</h2>
            <p>Choose any product to record a stock movement.</p>
          </div>
          <div className="stock-legend"><span className="legend-dot" /> Live quantities</div>
        </div>
        {products.length === 0 ? (
          <Card className="content-card stock-empty">
            <i className="bi bi-box-seam" aria-hidden="true" />
            <h3>No products in inventory</h3>
            <p>Add products from the Products page to start managing stock.</p>
          </Card>
        ) : (
          <div className="stock-grid">
            {products.map((product) => (
              <Card className="stock-card" key={product.id}>
                <Card.Body>
                  <div className="stock-card-top">
                    <span className="stock-product-icon"><i className="bi bi-box" aria-hidden="true" /></span>
                    <StockStatusBadge quantity={product.quantity} />
                  </div>
                  <div className="stock-product-name">{product.name}</div>
                  <div className="stock-category">{product.category} <span>·</span> ID {product.id}</div>
                  <div className="stock-level">
                    <strong>{product.quantity}</strong><span>units available</span>
                  </div>
                  <div className="stock-meter" aria-label={`${product.quantity} units in stock`}>
                    <span className={product.quantity === 0 ? 'meter-empty' : product.quantity <= 10 ? 'meter-low' : ''} style={{ width: `${Math.min(product.quantity, 100)}%` }} />
                  </div>
                  <Button variant="light" className="stock-action" onClick={() => openStockModal(product.id)}>
                    <i className="bi bi-arrow-left-right" aria-hidden="true" /> Adjust quantity
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </section>

      <StockModal
        show={showStockModal}
        products={products}
        selectedProductId={selectedProductId}
        onHide={() => setShowStockModal(false)}
        onSave={onUpdateStock}
      />
    </>
  )
}
