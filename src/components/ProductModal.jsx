import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const emptyForm = { name: "", category: "", quantity: "0", price: "" };

export default function ProductModal({ show, onHide, onSave, nextId }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (show) {
      setForm(emptyForm);
      setError("");
    }
  }, [show]);

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.name.trim() || !form.category.trim() || form.price === "") {
      setError("Please complete all product fields.");
      return;
    }
    if (Number(form.quantity) < 0 || Number(form.price) < 0) {
      setError("Quantity and price cannot be negative.");
      return;
    }
    onSave({
      id: nextId,
      name: form.name.trim(),
      category: form.category.trim(),
      quantity: Number(form.quantity),
      price: Number(form.price),
    });
    onHide();
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton><Modal.Title>Add New Product</Modal.Title></Modal.Header>
        <Modal.Body>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <Form.Group className="mb-3"><Form.Label>Product Name</Form.Label><Form.Control name="name" value={form.name} onChange={updateField} placeholder="e.g. Wireless Headphones" /></Form.Group>
          <Form.Group className="mb-3"><Form.Label>Category</Form.Label><Form.Control name="category" value={form.category} onChange={updateField} placeholder="e.g. Electronics" /></Form.Group>
          <div className="row">
            <Form.Group className="col-sm-6 mb-3"><Form.Label>Quantity</Form.Label><Form.Control type="number" min="0" name="quantity" value={form.quantity} onChange={updateField} /></Form.Group>
            <Form.Group className="col-sm-6 mb-3"><Form.Label>Unit Price (RM)</Form.Label><Form.Control type="number" min="0" step="0.01" name="price" value={form.price} onChange={updateField} placeholder="0.00" /></Form.Group>
          </div>
          <small className="text-muted">Product ID will be generated automatically: #{nextId}</small>
        </Modal.Body>
        <Modal.Footer><Button variant="light" onClick={onHide}>Cancel</Button><Button type="submit" variant="primary"><i className="bi bi-plus-lg me-1"></i>Add Product</Button></Modal.Footer>
      </Form>
    </Modal>
  );
}