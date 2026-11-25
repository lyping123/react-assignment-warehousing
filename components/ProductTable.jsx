import { Table, Badge, Button } from "react-bootstrap";
import { getStatus } from "../data";

export default function ProductTable({ products, onRemove, onStock }) {
  return (
    <div className="table-responsive">
      <Table striped hover className="align-middle">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Category</th>
            <th className="text-end">Qty</th>
            <th className="text-end">Unit Price</th>
            <th>Status</th><th></th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr><td colSpan={7} className="text-center text-muted py-4">No products found.</td></tr>
          )}
          {products.map((p) => {
            const s = getStatus(p.quantity);
            return (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td className="text-end">{p.quantity}</td>
                <td className="text-end">${p.price.toFixed(2)}</td>
                <td><Badge bg={s.bg} text={s.bg === "warning" ? "dark" : undefined}>{s.label}</Badge></td>
                <td className="text-end text-nowrap">
                  {onStock && (
                    <Button size="sm" variant="primary" className="me-2" onClick={() => onStock(p)}>
                      <i className="bi bi-arrow-left-right me-1" />Move stock
                    </Button>
                  )}
                  {onRemove && (
                    <Button size="sm" variant="outline-danger" onClick={() => onRemove(p)}>
                      <i className="bi bi-trash me-1" />Remove
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
