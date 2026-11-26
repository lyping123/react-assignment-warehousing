import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

export default function StockModal({ show, products, selectedProductId, onHide, onSave }) {
  const [productId, setProductId] = useState('')
  const [movement, setMovement] = useState('in')
  const [quantity, setQuantity] = useState('')
  const [error, setError] = useState('')
  const selectedProduct = products.find((product) => product.id === Number(productId))

  useEffect(() => {
    if (show) {
      setProductId(selectedProductId ? String(selectedProductId) : (products[0] ? String(products[0].id) : ''))
      setMovement('in')
      setQuantity('')
      setError('')
    }
  }, [show, selectedProductId, products])

  const submit = (event) => {
    event.preventDefault()
    const amount = Number(quantity)
    if (!selectedProduct) {
      setError('Select a product to continue.')
      return
    }
    if (!Number.isInteger(amount) || amount <= 0) {
      setError('Enter a whole number greater than zero.')
      return
    }
    if (movement === 'out' && amount > selectedProduct.quantity) {
      setError(`Only ${selectedProduct.quantity} units are currently available.`)
      return
    }

    onSave(selectedProduct.id, movement, amount)
    onHide()
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={submit}>
        <Modal.Header closeButton>
          <div>
            <div className="modal-eyebrow">INVENTORY MOVEMENT</div>
            <Modal.Title>Adjust stock</Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="form-error" role="alert">{error}</div>}
          <Form.Group className="mb-3" controlId="stockProduct">
            <Form.Label>Select product</Form.Label>
            <Form.Select value={productId} onChange={(event) => setProductId(event.target.value)} disabled={products.length === 0}>
              {products.length === 0 && <option value="">No products available</option>}
              {products.map((product) => (
                <option key={product.id} value={product.id}>{product.name} — {product.quantity} in stock</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="stockMovement">
            <Form.Label>Movement type</Form.Label>
            <div className="movement-options">
              <button type="button" className={`movement-option${movement === 'in' ? ' selected' : ''}`} onClick={() => { setMovement('in'); setError('') }}>
                <i className="bi bi-box-arrow-in-down" aria-hidden="true" />
                <span>Stock In</span>
                <small>Add units</small>
              </button>
              <button type="button" className={`movement-option${movement === 'out' ? ' selected' : ''}`} onClick={() => { setMovement('out'); setError('') }}>
                <i className="bi bi-box-arrow-up" aria-hidden="true" />
                <span>Stock Out</span>
                <small>Remove units</small>
              </button>
            </div>
          </Form.Group>
          <Form.Group controlId="stockQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control type="number" min="1" step="1" value={quantity} onChange={(event) => setQuantity(event.target.value)} placeholder="Enter units" />
            {selectedProduct && <Form.Text>Available now: {selectedProduct.quantity} units</Form.Text>}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={onHide}>Cancel</Button>
          <Button variant="primary" type="submit" className="primary-button" disabled={products.length === 0}>Update stock</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
