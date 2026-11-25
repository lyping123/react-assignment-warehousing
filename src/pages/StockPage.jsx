import { useMemo, useState } from "react";
import { Badge, Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { getStockStatus } from "../utils/stockStatus";

export default function StockPage({ products, onStockClick }) {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())), [products, search]);
  const total = products.reduce((sum, p) => sum + p.quantity, 0);
  const low = products.filter((p) => p.quantity > 0 && p.quantity <= 10).length;
  const out = products.filter((p) => p.quantity === 0).length;

  return (
    <>
      <div className="page-heading d-flex flex-wrap justify-content-between align-items-end gap-3">
        <div><div className="eyebrow">INVENTORY / STOCK</div><h1>Stock Management</h1><p>Track stock levels and record stock-in or stock-out movements.</p></div>
        <Button onClick={onStockClick} className="add-button"><i className="bi bi-arrow-left-right me-2"></i>Stock Movement</Button>
      </div>
      <Row className="g-3 mb-4">
        <Col sm={6} lg={4}><Card className="metric-card"><Card.Body><div className="metric-label">TOTAL STOCK</div><div className="metric-value">{total.toLocaleString()}</div><div className="metric-foot">Units currently available</div></Card.Body></Card></Col>
        <Col sm={6} lg={4}><Card className="metric-card"><Card.Body><div className="metric-label">LOW STOCK</div><div className="metric-value text-warning">{low}</div><div className="metric-foot">1–10 units remaining</div></Card.Body></Card></Col>
        <Col sm={6} lg={4}><Card className="metric-card"><Card.Body><div className="metric-label">OUT OF STOCK</div><div className="metric-value text-danger">{out}</div><div className="metric-foot">Products with zero quantity</div></Card.Body></Card></Col>
      </Row>
      <Card className="content-card"><Card.Body className="p-0">
        <div className="table-toolbar"><div><h5>Current Stock Levels</h5><span>Stock status updates automatically</span></div><div className="search-wrap"><i className="bi bi-search"></i><Form.Control placeholder="Search product name..." value={search} onChange={(e) => setSearch(e.target.value)} /></div></div>
        <div className="table-responsive"><Table hover align="middle" className="product-table mb-0"><thead><tr><th>PRODUCT</th><th>PRODUCT ID</th><th>CATEGORY</th><th>AVAILABLE QUANTITY</th><th>STOCK STATUS</th><th className="text-end">ACTION</th></tr></thead><tbody>
          {filtered.map((p) => { const status = getStockStatus(p.quantity); return <tr key={p.id}><td><div className="product-name"><span className="product-icon"><i className="bi bi-box-seam"></i></span><strong>{p.name}</strong></div></td><td className="text-muted">#{p.id}</td><td>{p.category}</td><td><strong className="fs-6">{p.quantity}</strong> <span className="text-muted small">units</span></td><td><Badge bg={status.variant} className={`status-badge ${status.variant === "warning" ? "text-dark" : ""}`}>{status.label}</Badge></td><td className="text-end"><Button size="sm" variant="outline-primary" onClick={onStockClick}>Update Stock</Button></td></tr>; })}
          {filtered.length === 0 && <tr><td colSpan="6" className="text-center text-muted py-5">No products found.</td></tr>}
        </tbody></Table></div>
      </Card.Body></Card>
      <div className="stock-hint mt-3"><i className="bi bi-info-circle me-2"></i><strong>Stock status guide:</strong> 0 = Out of Stock · 1–10 = Low Stock · More than 10 = In Stock</div>
    </>
  );
}