import { Modal, Button } from "react-bootstrap";

export default function ConfirmModal({ show, product, onConfirm, onClose }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton><Modal.Title>Remove product</Modal.Title></Modal.Header>
      <Modal.Body>
        Remove <strong>{product?.name}</strong> from the inventory? This can't be undone.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="danger" onClick={onConfirm}>Remove product</Button>
      </Modal.Footer>
    </Modal>
  );
}
