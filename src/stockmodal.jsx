import { useState, useEffect } from "react";
import BaseModal from "./basemodal";
import AlertBox from "./alertbox";
import StockBadge from "./stockbadge";

export default function StockModal({ show, products, selectedId, onClose, onMove }) {
  const [productId, setProductId] = useState("");
  const [type, setType] = useState("in");
  const [qty, setQty] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (show) {
      setProductId(selectedId ?? "");
      setType("in");
      setQty("");
      setError(null);
    }
  }, [show, selectedId]);

  const current = products.find((p) => p.id === Number(productId));

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = onMove(Number(productId), type, Number(qty));
    if (result.ok) onClose();
    else setError({ variant: "danger", message: result.message });
  };

  return (
    <BaseModal
      show={show}
      title="Stock Movement"
      onClose={onClose}
      onSubmit={handleSubmit}
      footer={
        <>
          <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className={`btn btn-${type === "in" ? "success" : "warning"}`}>
            Confirm Stock {type === "in" ? "In" : "Out"}
          </button>
        </>
      }
    >
      <AlertBox alert={error} onClose={() => setError(null)} />
      <div className="mb-3">
        <label className="form-label">Product</label>
        <select className="form-select" value={productId} onChange={(e) => setProductId(e.target.value)}>
          <option value="">-- Select a product --</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>{p.id} - {p.name}</option>
          ))}
        </select>
      </div>
      {current && (
        <p>
          Current stock: <strong>{current.quantity}</strong> <StockBadge quantity={current.quantity} />
        </p>
      )}
      <div className="mb-3">
        <label className="form-label d-block">Movement Type</label>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" id="mv-in" checked={type === "in"} onChange={() => setType("in")} />
          <label className="form-check-label" htmlFor="mv-in">Stock In</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" id="mv-out" checked={type === "out"} onChange={() => setType("out")} />
          <label className="form-check-label" htmlFor="mv-out">Stock Out</label>
        </div>
      </div>
      <div>
        <label className="form-label">Quantity</label>
        <input type="number" min="1" className="form-control" value={qty} onChange={(e) => setQty(e.target.value)} />
      </div>
    </BaseModal>
  );
}