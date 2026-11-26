import { useState } from "react";
import { Row, Col, Form, InputGroup, Button, Card } from "react-bootstrap";
import ProductTable from "./productstable.jsx";
import ProductModal from "./productmodal";
import ConfirmModal from "./comfirmmodal";

export default function ProductsPage({ products, setProducts, showAlert }) {
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [toRemove, setToRemove] = useState(null);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (data) => {
    const nextId = products.length
      ? Math.max(...products.map((p) => p.id)) + 1
      : 1001;
    setProducts([...products, { id: nextId, ...data }]);
    showAlert("success", `"${data.name}" was added.`);
  };

  const handleRemove = () => {
    setProducts(products.filter((p) => p.id !== toRemove.id));
    showAlert("success", `"${toRemove.name}" was removed.`);
    setToRemove(null);
  };

  return (
    <Card body>
      <Row className="g-2 mb-3 align-items-center">
        <Col xs={12} md={6}>
          <h4 className="mb-0">Product Management</h4>
        </Col>
        <Col xs={8} md={4}>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-search"></i>
            </InputGroup.Text>
            <Form.Control
              placeholder="Search by product name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs={4} md={2} className="d-grid">
          <Button onClick={() => setShowAdd(true)}>
            <i className="bi bi-plus-lg"></i> Add
          </Button>
        </Col>
      </Row>

      <ProductTable products={filtered} onRemove={setToRemove} />

      <ProductModal
        show={showAdd}
        onClose={() => setShowAdd(false)}
        onSave={handleAdd}
      />
      <ConfirmModal
        show={!!toRemove}
        product={toRemove}
        onConfirm={handleRemove}
        onCancel={() => setToRemove(null)}
      />
    </Card>
  );
}