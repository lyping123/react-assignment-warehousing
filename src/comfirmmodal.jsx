import { Modal, Button } from "react-bootstrap";

export default function ConfirmModal({ show, product, onConfirm, onCancel }) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Remove product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to remove <strong>{product?.name}</strong>? This cannot be undone.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button variant="danger" onClick={onConfirm}>Remove</Button>
      </Modal.Footer>
    </Modal>
  );
}
