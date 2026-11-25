import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const empty = { name: "", category: "", quantity: "", price: "" };

export default function ProductModal({ show, onClose, onSave }) {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const close = () => { setForm(empty); setError(""); onClose(); };

  const submit = (e) => {
    e.preventDefault();
    const quantity = Number(form.quantity);
    const price = Number(form.price);
    if (!form.name.trim() || !form.category.trim()) return setError("Name and category are required.");
    if (!Number.isInteger(quantity) || quantity < 0) return setError("Quantity must be a whole number, 0 or more.");
    if (!(price > 0)) return setError("Unit price must be greater than 0.");
    onSave({ name: form.name.trim(), category: form.category.trim(), quantity, price });
    close();
  };

  return (
    <Modal show={show} onHide={close} centered>
      <Form onSubmit={submit}>
        <Modal.Header closeButton><Modal.Title>Add product</Modal.Title></Modal.Header>
        <Modal.Body>
          {error && <div className="text-danger mb-3">{error}</div>}
          <Form.Group className="mb-3">
            <Form.Label>Product name</Form.Label>
            <Form.Control name="name" value={form.name} onChange={change} autoFocus />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control name="category" value={form.category} onChange={change} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control type="number" min="0" name="quantity" value={form.quantity} onChange={change} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Unit price</Form.Label>
            <Form.Control type="number" min="0" step="0.01" name="price" value={form.price} onChange={change} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>Cancel</Button>
          <Button type="submit" variant="primary">Add product</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
