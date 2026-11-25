import { useState } from "react";
import { Modal, Form, Button, ButtonGroup, Badge } from "react-bootstrap";
import { getStatus } from "../data";

export default function StockModal({ show, product, onClose, onMove }) {
  const [type, setType] = useState("in");
  const [qty, setQty] = useState("");
  const [error, setError] = useState("");

  const close = () => { setType("in"); setQty(""); setError(""); onClose(); };

  const submit = (e) => {
    e.preventDefault();
    const n = Number(qty);
    if (!Number.isInteger(n) || n <= 0) return setError("Enter a whole number greater than 0.");
    if (type === "out" && n > product.quantity)
      return setError(`Stock out can't exceed available stock (${product.quantity}).`);
    onMove(product.id, type, n);
    close();
  };

  if (!product) return null;
  const s = getStatus(product.quantity);

  return (
    <Modal show={show} onHide={close} centered>
      <Form onSubmit={submit}>
        <Modal.Header closeButton><Modal.Title>Move stock: {product.name}</Modal.Title></Modal.Header>
        <Modal.Body>
          <p>
            Current stock: <strong>{product.quantity}</strong>{" "}
            <Badge bg={s.bg} text={s.bg === "warning" ? "dark" : undefined}>{s.label}</Badge>
          </p>
          <ButtonGroup className="mb-3 w-100">
            <Button variant={type === "in" ? "success" : "outline-success"} onClick={() => { setType("in"); setError(""); }}>Stock in</Button>
            <Button variant={type === "out" ? "danger" : "outline-danger"} onClick={() => { setType("out"); setError(""); }}>Stock out</Button>
          </ButtonGroup>
          <Form.Group>
            <Form.Label>Quantity</Form.Label>
            <Form.Control type="number" min="1" value={qty} onChange={(e) => setQty(e.target.value)} isInvalid={!!error} autoFocus />
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>Cancel</Button>
          <Button type="submit" variant="primary">Confirm {type === "in" ? "stock in" : "stock out"}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
