import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <Container className="mt-5">

      <div className="mb-4">
        <h2 className="fw-bold">Dashboard</h2>
        <p className="text-muted">
          Welcome to Warehouse Inventory Management System.
        </p>
      </div>

      <Row className="g-4">

        <Col md={6}>
          <Card className="dashboard-card shadow-sm h-100">
            <Card.Body className="p-4 text-center">

              <i className="bi bi-box-seam dashboard-icon text-primary"></i>

              <Card.Title className="mt-3">
                Product Management
              </Card.Title>

              <Card.Text className="text-muted">
                Manage your warehouse products.
                Add, search and remove products.
              </Card.Text>

              <Link to="/products" className="btn btn-primary">
                Manage Products
              </Link>

            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="dashboard-card shadow-sm h-100">
            <Card.Body className="p-4 text-center">

              <i className="bi bi-clipboard-data dashboard-icon text-success"></i>

              <Card.Title className="mt-3">
                Stock Management
              </Card.Title>

              <Card.Text className="text-muted">
                Manage your stock quantity.
                Perform Stock In and Stock Out operations.
              </Card.Text>

              <Link to="/stock" className="btn btn-success">
                Manage Stock
              </Link>

            </Card.Body>
          </Card>
        </Col>

      </Row>

      <div className="text-center mt-5 text-muted">
        <small>Warehouse Inventory System © 2026</small>
      </div>

    </Container>
  );
}

export default Dashboard;