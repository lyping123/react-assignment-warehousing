import { useState } from "react";
import { Modal, Form, Button, ButtonGroup } from "react-bootstrap";

export default function StockModal({ show, product, onClose, onSubmit }) {
  const [type, setType] = useState("in");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleClose = () => {
    setType("in");
    setAmount("");
    setError("");
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const qty = Number(amount);
    if (!Number.isInteger(qty) || qty <= 0) return setError("Enter a whole number greater than 0.");
    if (type === "out" && qty > product.quantity) {
      return setError(`Only ${product.quantity} in stock. Stock-out cannot exceed available stock.`);
    }
    onSubmit(product.id, type, qty);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Stock movement: {product?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Current stock: <strong>{product?.quantity}</strong></p>
          <ButtonGroup className="mb-3 w-100">
            <Button variant={type === "in" ? "success" : "outline-success"} onClick={() => { setType("in"); setError(""); }}>
              Stock In
            </Button>
            <Button variant={type === "out" ? "danger" : "outline-danger"} onClick={() => { setType("out"); setError(""); }}>
              Stock Out
            </Button>
          </ButtonGroup>
          <Form.Group>
            <Form.Label>Quantity</Form.Label>
            <Form.Control type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)} isInvalid={!!error} />
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="primary">Confirm</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
