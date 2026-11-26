import { useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import StockBadge from "./stockbadge";
import StockModal from "./stockmodal";

export default function StockPage({ products, setProducts, showAlert }) {
  const [selected, setSelected] = useState(null);

  const handleMove = (id, type, qty) => {
    const product = products.find((p) => p.id === id);
    const newQty = type === "in" ? product.quantity + qty : product.quantity - qty;
    setProducts(products.map((p) => (p.id === id ? { ...p, quantity: newQty } : p)));
    showAlert(
      "success",
      `${type === "in" ? "Stock in" : "Stock out"} of ${qty} for "${product.name}". New quantity: ${newQty}.`
    );
  };

  return (
    <>
      <h4 className="mb-3">Stock Management</h4>
      <Row xs={1} sm={2} lg={3} className="g-3">
        {products.map((p) => (
          <Col key={p.id}>
            <Card className="h-100">
              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start">
                  <Card.Title>{p.name}</Card.Title>
                  <StockBadge quantity={p.quantity} />
                </div>
                <Card.Subtitle className="text-muted mb-3">
                  {p.category} · ID {p.id}
                </Card.Subtitle>
                <div className="display-6 mb-3">{p.quantity}</div>
                <Button
                  className="mt-auto"
                  variant="outline-primary"
                  onClick={() => setSelected(p)}
                >
                  <i className="bi bi-arrow-left-right"></i> Move stock
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <StockModal
        key={selected?.id}
        show={!!selected}
        product={selected && products.find((p) => p.id === selected.id)}
        onClose={() => setSelected(null)}
        onSubmit={handleMove}
      />
    </>
  );
}