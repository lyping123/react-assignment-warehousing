import { useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import ProductTable from "../components/ProductTable";
import StockModal from "../components/StockModal";
import { getStatus } from "../data";

export default function StockPage({ products, setProducts, notify }) {
  const [selectedId, setSelectedId] = useState(null);
  const selected = products.find((p) => p.id === selectedId) || null;

  const moveStock = (id, type, n) => {
    const p = products.find((x) => x.id === id);
    if (type === "out" && n > p.quantity) {
      notify("danger", `Not enough stock for ${p.name}. Available: ${p.quantity}.`);
      return;
    }
    const newQty = type === "in" ? p.quantity + n : p.quantity - n;
    setProducts(products.map((x) => (x.id === id ? { ...x, quantity: newQty } : x)));
    notify("success", `Stock ${type === "in" ? "in" : "out"} complete: ${p.name} is now ${newQty}.`);
  };

  const count = (label) => products.filter((p) => getStatus(p.quantity).label === label).length;

  return (
    <>
      <Row className="g-3 mb-3">
        {[["In Stock", "success"], ["Low Stock", "warning"], ["Out of Stock", "danger"]].map(([label, color]) => (
          <Col xs={12} sm={4} key={label}>
            <Card border={color}><Card.Body>
              <div className="text-muted">{label}</div>
              <div className="fs-3 fw-semibold">{count(label)}</div>
            </Card.Body></Card>
          </Col>
        ))}
      </Row>
      <Card>
        <Card.Body>
          <Card.Title as="h4" className="mb-3">Stock levels</Card.Title>
          <ProductTable products={products} onStock={(p) => setSelectedId(p.id)} />
        </Card.Body>
      </Card>
      <StockModal show={!!selected} product={selected} onClose={() => setSelectedId(null)} onMove={moveStock} />
    </>
  );
}
