import { useMemo, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import ProductTable from "../components/ProductTable";

export default function ProductsPage({ products, onAddClick, onRemoveClick }) {
  const [search, setSearch] = useState("");
  const filteredProducts = useMemo(
    () => products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())),
    [products, search]
  );
  const totalUnits = products.reduce((sum, p) => sum + p.quantity, 0);

  return (
    <>
      <div className="page-heading d-flex flex-wrap justify-content-between align-items-end gap-3">
        <div><div className="eyebrow">INVENTORY / PRODUCTS</div><h1>Product Management</h1><p>Manage your warehouse products and product information.</p></div>
        <Button onClick={onAddClick} className="add-button"><i className="bi bi-plus-lg me-2"></i>Add New Product</Button>
      </div>
      <Row className="g-3 mb-4">
        <Col sm={6} lg={4}><Card className="metric-card"><Card.Body><div className="metric-label">TOTAL PRODUCTS</div><div className="metric-value">{products.length}</div><div className="metric-foot"><i className="bi bi-box-seam me-1"></i>Products in catalogue</div></Card.Body></Card></Col>
        <Col sm={6} lg={4}><Card className="metric-card"><Card.Body><div className="metric-label">TOTAL STOCK UNITS</div><div className="metric-value">{totalUnits.toLocaleString()}</div><div className="metric-foot"><i className="bi bi-stack me-1"></i>Across all products</div></Card.Body></Card></Col>
        <Col sm={6} lg={4}><Card className="metric-card"><Card.Body><div className="metric-label">LOW / OUT OF STOCK</div><div className="metric-value">{products.filter((p) => p.quantity <= 10).length}</div><div className="metric-foot"><i className="bi bi-exclamation-circle me-1"></i>Products need attention</div></Card.Body></Card></Col>
      </Row>
      <Card className="content-card">
        <Card.Body className="p-0">
          <div className="table-toolbar"><div><h5>All Products</h5><span>{filteredProducts.length} products found</span></div><div className="search-wrap"><i className="bi bi-search"></i><Form.Control aria-label="Search products" placeholder="Search product name..." value={search} onChange={(e) => setSearch(e.target.value)} /></div></div>
          <ProductTable products={filteredProducts} onRemove={onRemoveClick} />
        </Card.Body>
      </Card>
    </>
  );
}