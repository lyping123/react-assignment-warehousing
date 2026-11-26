
import { useState } from "react";

function ProductManagement({ products, setProducts }) {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productName.trim() || quantity === "" || Number(quantity) < 0) {
      setMessage("Please enter valid product details.");
      return;
    }

    if (editId !== null) {
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.id === editId
            ? {
                ...product,
                name: productName,
                quantity: Number(quantity)
              }
            : product
        )
      );

      setMessage("Product updated successfully!");
      setEditId(null);
    } else {
      const newProduct = {
        id: Date.now(),
        name: productName,
        quantity: Number(quantity)
      };

      setProducts(prevProducts => [...prevProducts, newProduct]);

      setMessage("Product added successfully!");
    }

    setProductName("");
    setQuantity("");
  };

  const handleEdit = (product) => {
    setProductName(product.name);
    setQuantity(String(product.quantity));
    setEditId(product.id);
    setMessage("");
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    setProducts(prevProducts =>
      prevProducts.filter(product => product.id !== id)
    );

    setMessage("Product deleted successfully!");

    if (editId === id) {
      setEditId(null);
      setProductName("");
      setQuantity("");
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalStock = products.reduce(
    (total, product) => total + Number(product.quantity),
    0
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Product Management</h2>

      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="card shadow p-3">
            <h5>Total Products</h5>
            <h3>{products.length}</h3>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card shadow p-3">
            <h5>Total Stock</h5>
            <h3>{totalStock}</h3>
          </div>
        </div>
      </div>

      <div className="card shadow p-4 mb-4">
        <h4>{editId !== null ? "Edit Product" : "Add Product"}</h4>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control"
              value={productName}
              onChange={e => setProductName(e.target.value)}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              min="0"
              className="form-control"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              placeholder="Enter quantity"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary me-2">
            {editId !== null ? "Update Product" : "Add Product"}
          </button>

          {editId !== null && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setEditId(null);
                setProductName("");
                setQuantity("");
              }}
            >
              Cancel
            </button>
          )}
        </form>

        {message && <p className="mt-3 mb-0">{message}</p>}
      </div>

      <div className="card shadow p-4">
        <h4 className="mb-3">Product List</h4>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search product..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>No.</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>

                  <td>
                    <span
                      className={`badge ${
                        product.quantity > 0
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {product.quantity > 0
                        ? "In Stock"
                        : "Out of Stock"}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductManagement;
