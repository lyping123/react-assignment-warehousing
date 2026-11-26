
import { useState } from "react";

function StockManagement({
  products,
  setProducts,
  history,
  setHistory
}) {
  const [productId, setProductId] = useState("");
  const [type, setType] = useState("Stock In");
  const [quantity, setQuantity] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const totalStock = products.reduce(
    (total, product) => total + Number(product.quantity),
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedProduct = products.find(
      product => product.id === Number(productId)
    );

    const amount = Number(quantity);

    if (!selectedProduct) {
      setMessage("Please select a product.");
      return;
    }

    if (!Number.isInteger(amount) || amount <= 0) {
      setMessage("Please enter a valid quantity.");
      return;
    }

    if (type === "Stock Out" && amount > selectedProduct.quantity) {
      setMessage("Not enough stock available!");
      return;
    }

    setProducts(prevProducts =>
      prevProducts.map(product => {
        if (product.id === selectedProduct.id) {
          return {
            ...product,
            quantity:
              type === "Stock In"
                ? product.quantity + amount
                : product.quantity - amount
          };
        }

        return product;
      })
    );

    const newTransaction = {
      id: Date.now(),
      product: selectedProduct.name,
      type: type,
      quantity: amount,
      date: new Date().toLocaleString()
    };

    setHistory(prevHistory => [
      newTransaction,
      ...prevHistory
    ]);

    setMessage("Stock transaction successful!");

    setProductId("");
    setQuantity("");
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Stock Management</h2>

      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card shadow p-3">
            <h5>Total Products</h5>
            <h3>{products.length}</h3>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow p-3">
            <h5>Total Stock</h5>
            <h3>{totalStock}</h3>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow p-3">
            <h5>Transactions</h5>
            <h3>{history.length}</h3>
          </div>
        </div>
      </div>

      <div className="card shadow p-4 mb-4">
        <h4 className="mb-3">Stock Transaction</h4>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Select Product</label>

            <select
              className="form-select"
              value={productId}
              onChange={e => setProductId(e.target.value)}
              required
            >
              <option value="">Choose product</option>

              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} (Current: {product.quantity})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Transaction Type</label>

            <select
              className="form-select"
              value={type}
              onChange={e => setType(e.target.value)}
            >
              <option value="Stock In">Stock In</option>
              <option value="Stock Out">Stock Out</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Quantity</label>

            <input
              type="number"
              min="1"
              step="1"
              className="form-control"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              placeholder="Enter quantity"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit Transaction
          </button>
        </form>

        {message && <p className="mt-3 mb-0">{message}</p>}
      </div>

      <div className="card shadow p-4 mb-4">
        <h4 className="mb-3">Current Stock</h4>

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
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                </tr>
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card shadow p-4">
        <h4 className="mb-3">Stock History</h4>

        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>No.</th>
                <th>Product</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {history.map((record, index) => (
                <tr key={record.id}>
                  <td>{index + 1}</td>
                  <td>{record.product}</td>
                  <td>
                    <span
                      className={`badge ${
                        record.type === "Stock In"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {record.type}
                    </span>
                  </td>
                  <td>{record.quantity}</td>
                  <td>{record.date}</td>
                </tr>
              ))}

              {history.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">
                    No stock history available.
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

export default StockManagement;
