import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

const emptyProduct = { name: '', category: '', quantity: '0', price: '' }

export default function ProductModal({ show, onHide, onSave }) {
  const [product, setProduct] = useState(emptyProduct)
  const [error, setError] = useState('')

  useEffect(() => {
    if (show) {
      setProduct(emptyProduct)
      setError('')
    }
  }, [show])

  const updateField = (event) => {
    setProduct((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const submit = (event) => {
    event.preventDefault()
    const quantity = Number(product.quantity)
    const price = Number(product.price)
    if (!product.name.trim() || !product.category.trim()) {
      setError('Enter a product name and category.')
      return
    }
    if (!Number.isInteger(quantity) || quantity < 0 || !Number.isFinite(price) || price <= 0) {
      setError('Enter a non-negative whole quantity and a price greater than zero.')
      return
    }

    onSave({
      name: product.name.trim(),
      category: product.category.trim(),
      quantity,
      price,
    })
    onHide()
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={submit}>
        <Modal.Header closeButton>
          <div>
            <div className="modal-eyebrow">PRODUCT CATALOG</div>
            <Modal.Title>Add a product</Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="form-error" role="alert">{error}</div>}
          <Form.Group className="mb-3" controlId="productName">
            <Form.Label>Product name</Form.Label>
            <Form.Control name="name" value={product.name} onChange={updateField} placeholder="e.g. Wireless Mouse" autoFocus />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control name="category" value={product.category} onChange={updateField} placeholder="e.g. Electronics" />
          </Form.Group>
          <div className="row">
            <Form.Group className="col-sm-6 mb-3" controlId="productQuantity">
              <Form.Label>Initial quantity</Form.Label>
              <Form.Control type="number" name="quantity" min="0" step="1" value={product.quantity} onChange={updateField} />
            </Form.Group>
            <Form.Group className="col-sm-6 mb-3" controlId="productPrice">
              <Form.Label>Unit price (USD)</Form.Label>
              <Form.Control type="number" name="price" min="0.01" step="0.01" value={product.price} onChange={updateField} placeholder="0.00" />
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={onHide}>Cancel</Button>
          <Button variant="primary" type="submit" className="primary-button">Add product</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
