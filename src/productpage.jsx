import { useState } from "react";
import Alert from "./alert.jsx";
import Modal from "./components/modal.jsx";
import Table from "./components/table.jsx";

const empty = { name: "", category: "", quantity: "0", price: "" };

const columns = [
  { header: "Product ID", accessor: "id" },
  { header: "Product Name", accessor: "name" },
  { header: "Category", accessor: "category" },
  { header: "Quantity", accessor: "quantity" },
  { header: "Price (RM)", accessor: "price", render: (p) => Number(p).toFixed(2) },
];

const fields = [
  ["name", "Product name", 12],
  ["category", "Category", 12],
  ["quantity", "Initial quantity", 6, { type: "number", min: 0, step: 1 }],
  ["price", "Price (RM)", 6, { type: "number", min: 0.01, step: 0.01 }],
];

export default function ProductPage({ products, onAddProduct, onRemoveProduct, onStockIn }) {
  const [open, setOpen] = useState(false);
  const [p, setP] = useState(empty);
  const [alert, setAlert] = useState({ show: false });
  const notify = (msg) => setAlert({ show: true, type: "success", msg });

  const add = (e) => {
    e.preventDefault();
    if (!p.name.trim() || !p.category.trim()) return;
    onAddProduct({ ...p, name: p.name.trim(), category: p.category.trim(), quantity: +p.quantity, price: +p.price });
    setP(empty);
    setOpen(false);
    notify("Product added successfully.");
  };

  return (
    <main className="container py-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="h2 mb-0">Product Management</h1>
        <button className="btn btn-primary" onClick={() => setOpen(true)}>
          <i className="bi bi-plus-lg me-2" />Add Product
        </button>
      </div>

      <div className="mt-3"><Alert props={alert} /></div>

      <Table
        data={products}
        columns={columns}
        onRemove={(id) => { onRemoveProduct(id); notify("Product removed successfully."); }}
        onStockIn={(id, q) => { onStockIn(id, q); notify(`Stock updated. ${q} unit(s) added.`); }}
      />

      <Modal
        open={open}
        title="Add New Product"
        onClose={() => setOpen(false)}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setOpen(false)}>Cancel</button>
            <button type="submit" form="add-form" className="btn btn-primary">Add Product</button>
          </>
        }
      >
        <form id="add-form" className="row" onSubmit={add}>
          {fields.map(([key, label, col, extra]) => (
            <div key={key} className={`col-md-${col} mb-3`}>
              <label className="form-label">{label}</label>
              <input
                className="form-control"
                required
                value={p[key]}
                onChange={(e) => setP({ ...p, [key]: e.target.value })}
                {...extra}
              />
            </div>
          ))}
        </form>
      </Modal>
    </main>
  );
}