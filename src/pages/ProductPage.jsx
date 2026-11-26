import { useMemo, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import ConfirmModal from '../components/ConfirmModal.jsx'
import ProductModal from '../components/ProductModal.jsx'
import ProductTable from '../components/ProductTable.jsx'

export default function ProductPage({ products, onAddProduct, onRemoveProduct }) {
  const [search, setSearch] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [productToRemove, setProductToRemove] = useState(null)
  const filteredProducts = useMemo(
    () => products.filter((product) => product.name.toLowerCase().includes(search.trim().toLowerCase())),
    [products, search],
  )

  const confirmRemoval = () => {
    if (productToRemove) onRemoveProduct(productToRemove)
    setProductToRemove(null)
  }

  return (
    <>
      <section className="page-heading">
        <div>
          <div className="eyebrow">WAREHOUSE OVERVIEW</div>
          <h1>Products</h1>
          <p>Manage your product catalog and keep your inventory organized.</p>
        </div>
        <Button variant="primary" className="primary-button add-button" onClick={() => setShowAddModal(true)}>
          <i className="bi bi-plus-lg" aria-hidden="true" /> Add product
        </Button>
      </section>

      <section className="summary-grid" aria-label="Product summary">
        <Card className="summary-card">
          <Card.Body>
            <div className="summary-icon summary-icon-purple"><i className="bi bi-box-seam" aria-hidden="true" /></div>
            <div><span className="summary-label">Total products</span><strong>{products.length}</strong></div>
            <span className="summary-caption">in catalog</span>
          </Card.Body>
        </Card>
        <Card className="summary-card">
          <Card.Body>
            <div className="summary-icon summary-icon-green"><i className="bi bi-check2-circle" aria-hidden="true" /></div>
            <div><span className="summary-label">In stock</span><strong>{products.filter((product) => product.quantity > 10).length}</strong></div>
            <span className="summary-caption">healthy levels</span>
          </Card.Body>
        </Card>
        <Card className="summary-card">
          <Card.Body>
            <div className="summary-icon summary-icon-amber"><i className="bi bi-exclamation-circle" aria-hidden="true" /></div>
            <div><span className="summary-label">Needs attention</span><strong>{products.filter((product) => product.quantity <= 10).length}</strong></div>
            <span className="summary-caption">low or out</span>
          </Card.Body>
        </Card>
      </section>

      <Card className="content-card">
        <div className="content-card-header">
          <div>
            <h2>All products <span className="count-pill">{products.length}</span></h2>
            <p>A complete list of your warehouse products.</p>
          </div>
          <Form role="search" className="search-control">
            <i className="bi bi-search" aria-hidden="true" />
            <Form.Control
              type="search"
              aria-label="Search products by name"
              placeholder="Search products..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </Form>
        </div>
        <ProductTable products={filteredProducts} onRemove={setProductToRemove} />
      </Card>

      <ProductModal show={showAddModal} onHide={() => setShowAddModal(false)} onSave={onAddProduct} />
      <ConfirmModal product={productToRemove} onCancel={() => setProductToRemove(null)} onConfirm={confirmRemoval} />
    </>
  )
}
