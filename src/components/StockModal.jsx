import { useEffect, useState } from 'react';

export default function StockModal({ show, product, onClose, onUpdate, onAlert }) {
  const [movement, setMovement] = useState('in');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    if (show) {
      setMovement('in');
      setQuantity('');
    }
  }, [show, product]);

  if (!show || !product) return null;

  const submit = (event) => {
    event.preventDefault();
    const amount = Number(quantity);
    if (!Number.isInteger(amount) || amount <= 0) {
      onAlert({ type: 'danger', message: 'Enter a valid positive stock quantity.' });
      return;
    }
    if (movement === 'out' && amount > product.quantity) {
      onAlert({ type: 'danger', message: `Stock out cannot exceed available stock (${product.quantity}).` });
      return;
    }
    const nextQuantity = movement === 'in' ? product.quantity + amount : product.quantity - amount;
    onUpdate(nextQuantity);
    onAlert({ type: 'success', message: `Stock updated. ${product.name} now has ${nextQuantity} units.` });
    onClose();
  };

  return (
    <div className="modal d-block" role="dialog" aria-modal="true">
      <div className="modal-dialog modal-dialog-centered">
        <form className="modal-content" onSubmit={submit}>
          <div className="modal-header">
            <h5 className="modal-title">Manage Stock - {product.name}</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>Current quantity: <strong>{product.quantity}</strong></p>
            <div className="mb-3">
              <label className="form-label" htmlFor="stock-movement">Stock Movement</label>
              <select id="stock-movement" className="form-select" value={movement} onChange={(event) => setMovement(event.target.value)}>
                <option value="in">Stock In</option>
                <option value="out">Stock Out</option>
              </select>
            </div>
            <label className="form-label" htmlFor="stock-quantity">Quantity</label>
            <input id="stock-quantity" className="form-control" type="number" min="1" value={quantity} onChange={(event) => setQuantity(event.target.value)} required />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Update Stock</button>
          </div>
        </form>
      </div>
    </div>
  );
}
