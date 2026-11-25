import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const emptyForm = { name: "", category: "", quantity: "", price: "" };

export default function ProductModal({ show, onClose, onSave }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleClose = () => {
    setForm(emptyForm);
    setError("");
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const quantity = Number(form.quantity);
    const price = Number(form.price);
    if (!form.name.trim() || !form.category.trim()) return setError("Name and category are required.");
    if (!Number.isInteger(quantity) || quantity < 0) return setError("Quantity must be a whole number, 0 or more.");
    if (!(price > 0)) return setError("Unit price must be greater than 0.");
    onSave({ name: form.name.trim(), category: form.category.trim(), quantity, price });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="text-danger mb-3">{error}</div>}
          <Form.Group className="mb-3">
            <Form.Label>Product name</Form.Label>
            <Form.Control name="name" value={form.name} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control name="category" value={form.category} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control type="number" min="0" name="quantity" value={form.quantity} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Unit price</Form.Label>
            <Form.Control type="number" min="0" step="0.01" name="price" value={form.price} onChange={handleChange} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="primary">Add product</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
