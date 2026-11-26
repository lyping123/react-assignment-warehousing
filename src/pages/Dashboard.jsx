
import { Link } from "react-router-dom";

function Dashboard({ products }) {
  const totalProducts = products.length;

  const totalStock = products.reduce(
    (total, product) => total + Number(product.quantity),
    0
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Dashboard</h2>

      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card shadow p-4">
            <h5>Total Products</h5>
            <h2>{totalProducts}</h2>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card shadow p-4">
            <h5>Total Stock</h5>
            <h2>{totalStock}</h2>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Link to="/products" className="btn btn-primary me-2">
          Product Management
        </Link>

        <Link to="/stock" className="btn btn-success">
          Stock Management
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
