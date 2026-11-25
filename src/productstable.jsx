import { Table, Button } from "react-bootstrap";
import StockBadge from "./StockBadge";

export default function ProductTable({ products, onRemove }) {
  return (
    <div className="table-responsive">
      <Table striped hover bordered className="align-middle">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center text-muted">No products found.</td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>{p.quantity}</td>
                <td>${p.price.toFixed(2)}</td>
                <td><StockBadge quantity={p.quantity} /></td>
                <td>
                  <Button size="sm" variant="outline-danger" onClick={() => onRemove(p)}>
                    <i className="bi bi-trash"></i> Remove
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}
