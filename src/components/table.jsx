import { useState } from "react";
import Modal from "./modal.jsx";

export default function Table({ data, columns, onRemove, onStockIn }) {
  const [pendingRemoval, setPendingRemoval] = useState(null);
  const [stockProduct, setStockProduct] = useState(null);
  const [stockQuantity, setStockQuantity] = useState("1");

  const handleStockSubmit = (event) => {
    event.preventDefault();
    const quantity = Number(stockQuantity);

    if (
      !Number.isSafeInteger(quantity) ||
      quantity <= 0 ||
      !stockProduct ||
      !Number.isSafeInteger(stockProduct.quantity + quantity)
    ) {
      return;
    }

    onStockIn(stockProduct.id, quantity);
    setStockProduct(null);
  };

  const getStatus = (quantity) => {
    if (quantity === 0) return <span className="badge bg-danger">Out of Stock</span>;
    if (quantity <= 10) return <span className="badge bg-warning text-dark">Low Stock</span>;
    return <span className="badge bg-success">In Stock</span>;
  };

  return (
    <>
      <Modal
        open={Boolean(pendingRemoval)}
        title="Confirm product removal"
        onClose={() => setPendingRemoval(null)}
        footer={
          <>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setPendingRemoval(null)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                onRemove(pendingRemoval.id);
                setPendingRemoval(null);
              }}
            >
              Remove product
            </button>
          </>
        }
      >
        <p className="mb-0">
          Are you sure you want to remove <strong>{pendingRemoval?.name}</strong>?
          This action cannot be undone.
        </p>
      </Modal>

      <Modal
        open={Boolean(stockProduct)}
        title="Stock IN"
        onClose={() => setStockProduct(null)}
        footer={
          <>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setStockProduct(null)}
            >
              Cancel
            </button>
            <button type="submit" form="stock-in-form" className="btn btn-primary">
              Confirm Stock IN
            </button>
          </>
        }
      >
        {stockProduct && (
          <form id="stock-in-form" onSubmit={handleStockSubmit}>
            <p>
              Product: <strong>{stockProduct.name}</strong>
            </p>
            <p>Current stock: {stockProduct.quantity}</p>
            <label htmlFor="stock-in-quantity" className="form-label">
              Quantity to add
            </label>
            <input
              id="stock-in-quantity"
              className="form-control"
              type="number"
              min="1"
              step="1"
              required
              value={stockQuantity}
              onChange={(event) => setStockQuantity(event.target.value)}
            />
          </form>
        )}
      </Modal>

      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover align-middle mt-4">
          <thead className="table-dark">
            <tr>
              {columns.map((column) => (
                <th key={column.accessor}>{column.header}</th>
              ))}
              <th>Stock Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 2} className="text-center text-muted py-4">
                  No products found.
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id}>
                  {columns.map((column) => (
                    <td key={column.accessor}>
                      {column.render
                        ? column.render(item[column.accessor], item)
                        : item[column.accessor]}
                    </td>
                  ))}
                  <td>{getStatus(item.quantity)}</td>
                  <td className="text-center text-nowrap">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm me-1"
                      onClick={() => {
                        setStockQuantity("1");
                        setStockProduct(item);
                      }}
                    >
                      Stock
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => setPendingRemoval(item)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
