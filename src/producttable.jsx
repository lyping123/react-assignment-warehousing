import StockBadge from "./stockbadge";

export default function ProductTable({ products, mode = "product", onRemove, onSelect }) {
  const isProduct = mode === "product";
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Category</th>
            <th className="text-end">Quantity</th>
            {isProduct && <th className="text-end">Unit Price</th>}
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={isProduct ? 7 : 6} className="text-center text-muted">No products found.</td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td className="text-end">{p.quantity}</td>
                {isProduct && <td className="text-end">${p.price.toFixed(2)}</td>}
                <td><StockBadge quantity={p.quantity} /></td>
                <td>
                  {isProduct ? (
                    <button className="btn btn-sm btn-outline-danger" onClick={() => onRemove(p)}>
                      <i className="bi bi-trash me-1"></i>Remove
                    </button>
                  ) : (
                    <button className="btn btn-sm btn-primary" onClick={() => onSelect(p)}>
                      <i className="bi bi-arrow-left-right me-1"></i>Stock Movement
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}