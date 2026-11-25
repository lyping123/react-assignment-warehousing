import { useState } from "react";
import { Row, Col, Card, Form, Button, InputGroup } from "react-bootstrap";
import ProductTable from "../components/ProductTable";
import ProductModal from "../components/ProductModal";
import ConfirmModal from "../components/ConfirmModal";

export default function ProductPage({ products, setProducts, notify }) {
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [toRemove, setToRemove] = useState(null);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  const addProduct = (data) => {
    const nextId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1001;
    setProducts([...products, { id: nextId, ...data }]);
    notify("success", `"${data.name}" was added.`);
  };

  const removeProduct = () => {
    setProducts(products.filter((p) => p.id !== toRemove.id));
    notify("success", `"${toRemove.name}" was removed.`);
    setToRemove(null);
  };

  return (
    <Card>
      <Card.Body>
        <Row className="g-2 mb-3 align-items-center">
          <Col xs={12} md><Card.Title as="h4" className="mb-0">Products</Card.Title></Col>
          <Col xs={12} sm={8} md={5}>
            <InputGroup>
              <InputGroup.Text><i className="bi bi-search" /></InputGroup.Text>
              <Form.Control placeholder="Search by product name" value={search} onChange={(e) => setSearch(e.target.value)} />
            </InputGroup>
          </Col>
          <Col xs={12} sm={4} md="auto">
            <Button className="w-100" onClick={() => setShowAdd(true)}><i className="bi bi-plus-lg me-1" />Add product</Button>
          </Col>
        </Row>
        <ProductTable products={filtered} onRemove={setToRemove} />
      </Card.Body>
      <ProductModal show={showAdd} onClose={() => setShowAdd(false)} onSave={addProduct} />
      <ConfirmModal show={!!toRemove} product={toRemove} onConfirm={removeProduct} onClose={() => setToRemove(null)} />
    </Card>
  );
}
