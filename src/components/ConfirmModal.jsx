import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export default function ConfirmModal({ product, onCancel, onConfirm }) {
  return (
    <Modal show={Boolean(product)} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <div>
          <div className="modal-eyebrow">REMOVE PRODUCT</div>
          <Modal.Title>Are you sure?</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        {product && (
          <p className="confirm-copy">
            <strong>{product.name}</strong> will be removed from your product catalog. This action cannot be undone.
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={onCancel}>Keep product</Button>
        <Button variant="danger" onClick={onConfirm}>Remove product</Button>
      </Modal.Footer>
    </Modal>
  )
}
