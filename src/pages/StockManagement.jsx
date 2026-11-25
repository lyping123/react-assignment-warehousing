import { useState } from 'react';
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
  Table,
  Badge,
  Alert
} from 'react-bootstrap';

function StockManagement({ products, setProducts, history, setHistory }) {

  const [productId, setProductId] = useState('');
  const [type, setType] = useState('Stock In');
  const [quantity, setQuantity] = useState('');
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');

  // Calculate Total Stock
  const totalStock = products.reduce(
    (total, product) => total + Number(product.quantity),
    0
  );

  // Handle Stock In / Stock Out
  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedProduct = products.find(
      (product) => product.id === Number(productId)
    );

    const amount = Number(quantity);

    if (!selectedProduct || !Number.isInteger(amount) || amount <= 0) {
      setMessage('Please enter valid information.');
      return;
    }

    if (type === 'Stock Out' && amount > selectedProduct.quantity) {
      setMessage('Insufficient stock quantity!');
      return;
    }

    // Update Product Quantity
    setProducts((prevProducts) =>
      prevProducts.map((product) => {

        if (product.id === Number(productId)) {
          return {
            ...product,
            quantity:
              type === 'Stock In'
                ? product.quantity + amount
                : product.quantity - amount
          };
        }

        return product;
      })
    );

    // Record Stock History
    setHistory((prevHistory) => [
      {
        id: Date.now(),
        product: selectedProduct.name,
        type: type,
        quantity: amount,
        date: new Date().toLocaleString()
      },
      ...prevHistory
    ]);

    setMessage(type + ' successful!');

    setProductId('');
    setQuantity('');
  };

  // Search Product
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="mt-5 mb-5">

      <h2 className="fw-bold">Stock Management</h2>

      <p className="text-muted">
        Manage your warehouse stock here.
      </p>

      {/* Stock Summary */}

      <Row className="mt-4">

        <Col md={4} className="mb-3">
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h6 className="text-muted">Total Products</h6>
              <h2 className="fw-bold text-primary">
                {products.length}
              </h2>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-3">
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h6 className="text-muted">Total Stock</h6>
              <h2 className="fw-bold text-success">
                {totalStock}
              </h2>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-3">
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h6 className="text-muted">Transactions</h6>
              <h2 className="fw-bold text-warning">
                {history.length}
              </h2>
            </Card.Body>
          </Card>
        </Col>

      </Row>

      {/* Stock In / Stock Out */}

      <Card className="shadow-sm border-0 mt-4">
        <Card.Body className="p-4">

          <h4 className="mb-4">Stock In / Stock Out</h4>

          {message && (
            <Alert
              variant={
                message.includes('successful') ? 'success' : 'danger'
              }
              dismissible
              onClose={() => setMessage('')}
            >
              {message}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>

            <Row>

              <Col md={4} className="mb-3">

                <Form.Label>Product</Form.Label>

                <Form.Select
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  required
                >
                  <option value="">Select Product</option>

                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} (Stock: {product.quantity})
                    </option>
                  ))}

                </Form.Select>

              </Col>

              <Col md={3} className="mb-3">

                <Form.Label>Transaction Type</Form.Label>

                <Form.Select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="Stock In">Stock In</option>
                  <option value="Stock Out">Stock Out</option>
                </Form.Select>

              </Col>

              <Col md={3} className="mb-3">

                <Form.Label>Quantity</Form.Label>

                <Form.Control
                  type="number"
                  min="1"
                  step="1"
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />

              </Col>

              <Col md={2} className="mb-3 d-flex align-items-end">

                <Button
                  type="submit"
                  variant={type === 'Stock In' ? 'success' : 'danger'}
                  className="w-100"
                >
                  Submit
                </Button>

              </Col>

            </Row>

          </Form>

        </Card.Body>
      </Card>

      {/* Current Stock */}

      <Card className="shadow-sm border-0 mt-4">
        <Card.Body className="p-4">

          <h4 className="mb-3">Current Stock</h4>

          <Form.Control
            className="mb-3"
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Table responsive hover bordered>

            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Available Quantity</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {filteredProducts.map((product, index) => (

                <tr key={product.id}>

                  <td>{index + 1}</td>

                  <td>{product.name}</td>

                  <td>{product.quantity}</td>

                  <td>
                    <Badge
                      bg={product.quantity > 0 ? 'success' : 'danger'}
                    >
                      {product.quantity > 0
                        ? 'In Stock'
                        : 'Out of Stock'}
                    </Badge>
                  </td>

                </tr>

              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No products found.
                  </td>
                </tr>
              )}

            </tbody>

          </Table>

        </Card.Body>
      </Card>

      {/* Stock History */}

      <Card className="shadow-sm border-0 mt-4">
        <Card.Body className="p-4">

          <h4 className="mb-3">Stock History</h4>

          <Table responsive hover bordered>

            <thead className="table-dark">
              <tr>
                <th>No.</th>
                <th>Product</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Date & Time</th>
              </tr>
            </thead>

            <tbody>

              {history.map((item, index) => (

                <tr key={item.id}>

                  <td>{index + 1}</td>

                  <td>{item.product}</td>

                  <td>
                    <Badge
                      bg={item.type === 'Stock In' ? 'success' : 'danger'}
                    >
                      {item.type}
                    </Badge>
                  </td>

                  <td>{item.quantity}</td>

                  <td>{item.date}</td>

                </tr>

              ))}

              {history.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No stock transactions yet.
                  </td>
                </tr>
              )}

            </tbody>

          </Table>

        </Card.Body>
      </Card>

    </Container>
  );
}

export default StockManagement;