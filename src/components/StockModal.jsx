import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function StockModal({ show, onHide, products, onMove }) {
  const [productId, setProductId] = useState("");
  const [movement, setMovement] = useState("in");
  const [quantity, setQuantity] = useState("1");
  const [error, setError] = useState("");

  useEffect(() => {
    if (show) {
      setProductId(products[0] ? String(products[0].id) : "");
      setMovement("in");
      setQuantity("1");
      setError("");
    }
  }, [show, products]);

  const selected = products.find((p) => String(p.id) === productId);

  function handleSubmit(event) {
    event.preventDefault();
    const amount = Number(quantity);
    if (!selected) return setError("Please select a product.");
    if (!Number.isInteger(amount) || amount <= 0) return setError("Enter a whole number greater than zero.");
    if (movement === "out" && amount > selected.quantity) {
      return setError(`Not enough stock. Available quantity: ${selected.quantity}.`);
    }
    onMove(selected.id, movement, amount);
    onHide();
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton><Modal.Title>Stock Movement</Modal.Title></Modal.Header>
        <Modal.Body>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <Form.Group className="mb-3"><Form.Label>Select Product</Form.Label>
            <Form.Select value={productId} onChange={(e) => setProductId(e.target.value)}>
              {products.map((p) => <option key={p.id} value={p.id}>{p.name} (Available: {p.quantity})</option>)}
            </Form.Select>
          </Form.Group>
          {selected && <div className="stock-available mb-3"><span>Current available stock</span><strong>{selected.quantity} units</strong></div>}
          <Form.Group className="mb-3"><Form.Label>Movement Type</Form.Label>
            <div className="d-flex gap-2">
              <Button type="button" className="flex-fill" variant={movement === "in" ? "success" : "outline-success"} onClick={() => setMovement("in")}><i className="bi bi-box-arrow-in-down me-2"></i>Stock In</Button>
              <Button type="button" className="flex-fill" variant={movement === "out" ? "danger" : "outline-danger"} onClick={() => setMovement("out")}><i className="bi bi-box-arrow-up me-2"></i>Stock Out</Button>
            </div>
          </Form.Group>
          <Form.Group><Form.Label>Movement Quantity</Form.Label><Form.Control type="number" min="1" step="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} /></Form.Group>
        </Modal.Body>
        <Modal.Footer><Button variant="light" onClick={onHide}>Cancel</Button><Button type="submit" variant="primary">Update Stock</Button></Modal.Footer>
      </Form>
    </Modal>
  );
}