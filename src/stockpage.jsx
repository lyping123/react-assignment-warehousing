import { useState } from "react";
import ProductTable from "../components/ProductTable";
import StockModal from "../components/StockModal";

export default function StockPage({ products, onMove }) {
  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const open = (product) => {
    setSelectedId(product ? product.id : null);
    setShow(true);
  };

  const total = products.reduce((sum, p) => sum + p.quantity, 0);
  const low = products.filter((p) => p.quantity > 0 && p.quantity <= 10).length;
  const out = products.filter((p) => p.quantity === 0).length;

  const summary = [
    ["Total Units", total, "primary"],
    ["Low Stock Items", low, "warning"],
    ["Out of Stock Items", out, "danger"],
  ];

  return (
    <>
      <div className="row g-3 mb-3">
        {summary.map(([label, value, color]) => (
          <div className="col-12 col-md-4" key={label}>
            <div className={`card text-center shadow-sm border-${color}`}>
              <div className="card-body">
                <h6 className="card-subtitle text-muted">{label}</h6>
                <p className="card-title display-6 mb-0">{value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Stock Management</h5>
          <button className="btn btn-sm btn-primary" onClick={() => open(null)}>
            <i className="bi bi-plus-lg me-1"></i>New Stock Movement
          </button>
        </div>
        <div className="card-body">
          <ProductTable products={products} mode="stock" onSelect={open} />
        </div>
      </div>

      <StockModal show={show} products={products} selectedId={selectedId} onClose={() => setShow(false)} onMove={onMove} />
    </>
  );
}