// ProductTable component
import StockBadge from "./StockBadge";

function ProductTable({ products, onDelete, t }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-bordered align-middle mb-0">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>{t.colId}</th>
            <th>{t.colName}</th>
            <th>{t.colCategory}</th>
            <th>{t.colQty}</th>
            <th>{t.colPrice}</th>
            <th>{t.colStatus}</th>
            <th>{t.colAction}</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center text-muted py-4">
                <i className="bi bi-inbox fs-3 d-block mb-2"></i>
                {t.noProducts}
              </td>
            </tr>
          ) : (
            products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td><span className="badge bg-secondary">{product.id}</span></td>
                <td className="fw-semibold">{product.name}</td>
                <td>
                  <span className="badge bg-info text-dark">
                    {t.categories[product.category] || product.category}
                  </span>
                </td>
                <td>{product.quantity}</td>
                <td>RM {product.price.toFixed(2)}</td>
                <td>
                  <StockBadge quantity={product.quantity} t={t} />
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(product)}
                    title={t.deleteTitle}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
