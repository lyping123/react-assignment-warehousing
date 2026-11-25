import { useState } from "react";
import BaseModal from "./basemodal";
import AlertBox from "./alertbox";

const empty = { name: "", category: "", quantity: "", price: "" };

export default function ProductModal({ show, onClose, onSave }) {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const fail = (message) => setError({ variant: "danger", message });

  const close = () => {
    setForm(empty);
    setError(null);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const quantity = Number(form.quantity);
    const price = Number(form.price);
    if (!form.name.trim() || !form.category.trim()) return fail("Name and category are required.");
    if (form.quantity === "" || !Number.isInteger(quantity) || quantity < 0)
      return fail("Quantity must be a whole number (0 or more).");
    if (form.price === "" || isNaN(price) || price <= 0) return fail("Unit price must be greater than 0.");
    onSave({ name: form.name.trim(), category: form.category.trim(), quantity, price });
    close();
  };

  return (
    <BaseModal
      show={show}
      title="Add New Product"
      onClose={close}
      onSubmit={handleSubmit}
      footer={
        <>
          <button type="button" className="btn btn-secondary" onClick={close}>Cancel</button>
          <button type="submit" className="btn btn-primary">Add Product</button>
        </>
      }
    >
      <AlertBox alert={error} onClose={() => setError(null)} />
      <div className="mb-3">
        <label className="form-label">Product Name</label>
        <input className="form-control" name="name" value={form.name} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Category</label>
        <input className="form-control" name="category" value={form.category} onChange={handleChange} />
      </div>
      <div className="row">
        <div className="col-6">
          <label className="form-label">Quantity</label>
          <input type="number" min="0" className="form-control" name="quantity" value={form.quantity} onChange={handleChange} />
        </div>
        <div className="col-6">
          <label className="form-label">Unit Price ($)</label>
          <input type="number" min="0" step="0.01" className="form-control" name="price" value={form.price} onChange={handleChange} />
        </div>
      </div>
    </BaseModal>
  );
}