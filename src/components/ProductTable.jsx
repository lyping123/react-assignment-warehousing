import { Badge, Button, Table } from "react-bootstrap";
import { getStockStatus } from "../utils/stockStatus";

export default function ProductTable({ products, onRemove }) {
  if (products.length === 0) {
    return <div className="empty-state"><i className="bi bi-inbox"></i><h5>No products found</h5><p className="text-muted mb-0">Try another search or add a new product.</p></div>;
  }

  return (
    <div className="table-responsive">
      <Table hover align="middle" className="product-table mb-0">
        <thead>
          <tr><th>PRODUCT</th><th>PRODUCT ID</th><th>CATEGORY</th><th>QUANTITY</th><th>UNIT PRICE</th><th>STATUS</th><th className="text-end">ACTION</th></tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const status = getStockStatus(product.quantity);
            return (
              <tr key={product.id}>
                <td><div className="product-name"><span className="product-icon"><i className="bi bi-box-seam"></i></span><strong>{product.name}</strong></div></td>
                <td className="text-muted">#{product.id}</td>
                <td>{product.category}</td>
                <td><strong>{product.quantity}</strong> <span className="text-muted small">units</span></td>
                <td>RM {Number(product.price).toFixed(2)}</td>
                <td><Badge bg={status.variant} className={`status-badge ${status.variant === "warning" ? "text-dark" : ""}`}>{status.label}</Badge></td>
                <td className="text-end"><Button variant="outline-danger" size="sm" onClick={() => onRemove(product)}><i className="bi bi-trash3 me-1"></i>Remove</Button></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}