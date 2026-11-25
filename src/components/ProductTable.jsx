export default function ProductTable({ products, StatusBadge, onRemove }) {
  return (
    <div className="table-responsive card">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th>ID</th><th>Product Name</th><th>Category</th><th>Quantity</th>
            <th>Status</th><th>Unit Price</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr><td colSpan="7" className="text-center py-4 text-secondary">No products found</td></tr>
          ) : products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.quantity}</td>
              <td><StatusBadge quantity={product.quantity} /></td>
              <td>${Number(product.price).toFixed(2)}</td>
              <td><button className="btn btn-sm btn-outline-danger" onClick={() => onRemove(product)}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
