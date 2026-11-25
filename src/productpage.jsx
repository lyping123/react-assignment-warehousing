import { useState } from "react";
import ProductTable from "../components/ProductTable";
import ProductModal from "../components/ProductModal";
import ConfirmModal from "../components/ConfirmModal";

export default function ProductPage({ products, onAdd, onRemove }) {
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [toRemove, setToRemove] = useState(null);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  const confirmRemove = () => {
    onRemove(toRemove.id);
    setToRemove(null);
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header"><h5 className="mb-0">Product Management</h5></div>
      <div className="card-body">
        <div className="row g-2 mb-3">
          <div className="col-12 col-md-8">
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-search"></i></span>
              <input
                className="form-control"
                placeholder="Search by product name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="col-12 col-md-4 d-grid">
            <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
              <i className="bi bi-plus-lg me-1"></i>Add Product
            </button>
          </div>
        </div>

        <ProductTable products={filtered} mode="product" onRemove={setToRemove} />
      </div>

      <ProductModal show={showAdd} onClose={() => setShowAdd(false)} onSave={onAdd} />
      <ConfirmModal show={!!toRemove} product={toRemove} onConfirm={confirmRemove} onCancel={() => setToRemove(null)} />
    </div>
  );
}