
import { useState } from "react";
import Table from "./components/table.jsx";
import Alert from "./alert.jsx";

export default function StockPage({ products, onRemoveProduct, onStockIn, onStockOut }) {
  const [alert, setAlert] = useState({ show: false, type: "", msg: "" });
  const [productId, setProductId] = useState("");
  const [movement, setMovement] = useState("in");
  const [qty, setQty] = useState("");
  const [error, setError] = useState("");

  const selected = products.find((p) => p.id === Number(productId));

  const showAlert = (msg) => setAlert({ show: true, type: "success", msg });

  const handleRemoveProduct = (id) => {
    onRemoveProduct(id);
    showAlert("Product removed successfully.");
  };

  const handleMove = (e) => {
    e.preventDefault();
    const n = Number(qty);

    if (!selected) return setError("Please select a product.");
    if (!Number.isInteger(n) || n <= 0)
      return setError("Enter a whole number above 0.");
    if (movement === "out" && n > selected.quantity)
      return setError(`Only ${selected.quantity} available.`);

    (movement === "in" ? onStockIn : onStockOut)(selected.id, n);

    setError("");
    setQty("");
    showAlert(`Stock ${movement === "in" ? "In" : "Out"} successful: ${selected.name}.`);
  };

  const columns = [
    { header: "Product ID", accessor: "id" },
    { header: "Product Name", accessor: "name" },
    { header: "Category", accessor: "category" },
    { header: "Current Stock", accessor: "quantity" },
    { header: "Price (RM)", accessor: "price", render: (price) => Number(price).toFixed(2) },
  ];

  return (
    <main className="container py-4">
      <h1 className="h2 mb-0">Stock Management</h1>
      <p className="text-muted mt-2">Receive stock and keep inventory quantities up to date.</p>

      <div className="mt-3">
        <Alert props={alert} />
      </div>

      <form className="mt-3" onSubmit={handleMove}>
        {error && <div className="alert alert-danger py-1 small">{error}</div>}

        <div className="input-group input-group-sm">
          <select
            className="form-select"
            value={productId}
            onChange={(e) => { setProductId(e.target.value); setError(""); }}
          >
            <option value="">Select product</option>
            {products.map((x) => (
              <option key={x.id} value={x.id}>{x.name} ({x.quantity})</option>
            ))}
          </select>

          <select
            className="form-select"
            value={movement}
            onChange={(e) => { setMovement(e.target.value); setError(""); }}
          >
            <option value="in">Stock In</option>
            <option value="out">Stock Out</option>
          </select>

          <input
            className="form-control"
            type="number"
            min="1"
            placeholder="Qty"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />

          <button className="btn btn-success" type="submit">Confirm</button>
        </div>
      </form>

      <Table
        data={products}
        columns={columns}
        onRemove={handleRemoveProduct}
      />
    </main>
  );
}
