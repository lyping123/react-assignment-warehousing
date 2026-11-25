import { Button, Modal } from "react-bootstrap";

export default function ConfirmModal({ show, product, onCancel, onConfirm }) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton><Modal.Title>Remove Product</Modal.Title></Modal.Header>
      <Modal.Body>
        Are you sure you want to remove <strong>{product?.name}</strong> (#{product?.id})? This action cannot be undone.
      </Modal.Body>
      <Modal.Footer><Button variant="light" onClick={onCancel}>Cancel</Button><Button variant="danger" onClick={onConfirm}><i className="bi bi-trash3 me-1"></i>Yes, Remove</Button></Modal.Footer>
    </Modal>
  );
}