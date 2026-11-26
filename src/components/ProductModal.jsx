import { useEffect, useState } from 'react';

export default function ProductModal({ show, products, onClose, onAdd }) {
  const emptyForm = { name: '', category: '', quantity: '', price: '' };
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (show) setForm(emptyForm);
  }, [show]);

  if (!show) return null;

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const handleSubmit = (event) => {
    event.preventDefault();
    const quantity = Number(form.quantity);
    const price = Number(form.price);
    if (!form.name.trim() || !form.category.trim() || !Number.isFinite(quantity) || quantity < 0 || !Number.isFinite(price) || price < 0) return;
    const nextId = products.length ? Math.max(...products.map((product) => product.id)) + 1 : 1001;
    onAdd({ id: nextId, name: form.name.trim(), category: form.category.trim(), quantity, price });
  };

  return (
    <div className="modal d-block" role="dialog" aria-modal="true">
      <div className="modal-dialog modal-dialog-centered">
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h5 className="modal-title">Add Product</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label" htmlFor="product-name">Product Name</label>
                <input id="product-name" className="form-control" name="name" value={form.name} onChange={update} required />
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="product-category">Category</label>
                <input id="product-category" className="form-control" name="category" value={form.category} onChange={update} required />
              </div>
              <div className="col-md-3">
                <label className="form-label" htmlFor="product-quantity">Quantity</label>
                <input id="product-quantity" className="form-control" name="quantity" type="number" min="0" value={form.quantity} onChange={update} required />
              </div>
              <div className="col-md-3">
                <label className="form-label" htmlFor="product-price">Price</label>
                <input id="product-price" className="form-control" name="price" type="number" min="0" step="0.01" value={form.price} onChange={update} required />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  );
}
