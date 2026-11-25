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

function ProductManagement({ products, setProducts }) {

  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [search, setSearch] = useState('');
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');

  // Add / Update Product
  const handleSubmit = (e) => {
    e.preventDefault();

    const name = productName.trim();
    const amount = Number(quantity);

    if (!name || !Number.isInteger(amount) || amount < 0) {
      setMessage('Please enter valid product details.');
      return;
    }

    if (editId !== null) {

      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.id === editId
            ? { ...product, name: name, quantity: amount }
            : product
        )
      );

      setMessage('Product updated successfully!');

      setEditId(null);

    } else {

      const newProduct = {
        id: Date.now(),
        name: name,
        quantity: amount
      };

      setProducts(prevProducts => [
        ...prevProducts,
        newProduct
      ]);

      setMessage('Product added successfully!');
    }

    setProductName('');
    setQuantity('');
  };

  // Edit Product
  const handleEdit = (product) => {
    setEditId(product.id);
    setProductName(product.name);
    setQuantity(String(product.quantity));
    setMessage('');
  };

  // Cancel Edit
  const handleCancel = () => {
    setEditId(null);
    setProductName('');
    setQuantity('');
    setMessage('');
  };

  // Delete Product
  const handleDelete = (id) => {

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this product?'
    );

    if (!confirmDelete) return;

    setProducts(prevProducts =>
      prevProducts.filter(product => product.id !== id)
    );

    setMessage('Product deleted successfully!');

    if (editId === id) {
      handleCancel();
    }
  };

  // Search Product
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="mt-5 mb-5">

      <h2 className="fw-bold">Product Management</h2>

      <p className="text-muted">
        Manage all warehouse products here.
      </p>

      {/* Product Summary */}

      <Row className="mt-4">

        <Col md={6} className="mb-3">

          <Card className="shadow-sm border-0">

            <Card.Body>

              <h6 className="text-muted">Total Products</h6>

              <h2 className="fw-bold text-primary">
                {products.length}
              </h2>

            </Card.Body>

          </Card>

        </Col>

        <Col md={6} className="mb-3">

          <Card className="shadow-sm border-0">

            <Card.Body>

              <h6 className="text-muted">Total Stock</h6>

              <h2 className="fw-bold text-success">
                {products.reduce(
                  (total, product) => total + product.quantity,
                  0
                )}
              </h2>

            </Card.Body>

          </Card>

        </Col>

      </Row>

      {/* Add / Edit Product */}

      <Card className="shadow-sm border-0 mt-4">

        <Card.Body className="p-4">

          <h4 className="mb-4">
            {editId !== null ? 'Edit Product' : 'Add New Product'}
          </h4>

          {message && (

            <Alert
              variant={message.includes('successfully') ? 'success' : 'danger'}
              dismissible
              onClose={() => setMessage('')}
            >
              {message}
            </Alert>

          )}

          <Form onSubmit={handleSubmit}>

            <Row>

              <Col md={5} className="mb-3">

                <Form.Label>Product Name</Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  value={productName}
                  onChange={e => setProductName(e.target.value)}
                  required
                />

              </Col>

              <Col md={4} className="mb-3">

                <Form.Label>Quantity</Form.Label>

                <Form.Control
                  type="number"
                  min="0"
                  step="1"
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={e => setQuantity(e.target.value)}
                  required
                />

              </Col>

              <Col md={3} className="mb-3 d-flex align-items-end">

                <Button
                  type="submit"
                  variant="primary"
                  className="w-100"
                >
                  {editId !== null ? 'Update Product' : 'Add Product'}
                </Button>

              </Col>

            </Row>

            {editId !== null && (

              <Button
                variant="secondary"
                onClick={handleCancel}
              >
                Cancel Edit
              </Button>

            )}

          </Form>

        </Card.Body>

      </Card>

      {/* Product List */}

      <Card className="shadow-sm border-0 mt-4">

        <Card.Body className="p-4">

          <h4 className="mb-3">Product List</h4>

          <Form.Control
            className="mb-3"
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <Table responsive hover bordered>

            <thead className="table-dark">

              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {filteredProducts.map(product => (

                <tr key={product.id}>

                  <td>{product.id}</td>

                  <td>{product.name}</td>

                  <td>{product.quantity}</td>

                  <td>

                    <Badge
                      bg={product.quantity > 0 ? 'success' : 'danger'}
                    >
                      {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </Badge>

                  </td>

                  <td>

                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Button>

                  </td>

                </tr>

              ))}

              {filteredProducts.length === 0 && (

                <tr>

                  <td colSpan="5" className="text-center text-muted">
                    No products found.
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

export default ProductManagement;