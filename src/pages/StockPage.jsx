// StockPage – Stock Management Page
import { useState, useEffect } from "react";
import StockBadge from "../components/StockBadge";
import StockModal from "../components/StockModal";
import AlertBox   from "../components/AlertBox";

function StockPage({ products, setProducts, t }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [alert,           setAlert]           = useState(null);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  function handleStockUpdate(productId, newQty, moveType, amount) {
    setProducts(
      products.map((p) =>
        p.id === productId ? { ...p, quantity: newQty } : p
      )
    );

    const product = products.find((p) => p.id === productId);
    if (moveType === "in") {
      setAlert({
        type: "success",
        message: t.alertStockIn(product.name, amount, newQty),
      });
    } else {
      setAlert({
        type: "warning",
        message: t.alertStockOut(product.name, amount, newQty),
      });
    }
  }

  return (
    <div className="container my-4">

      <div className="d-flex align-items-center mb-3">
        <i className="bi bi-graph-up-arrow fs-3 me-2 text-success"></i>
        <h2 className="mb-0">{t.stockMgmt}</h2>
      </div>

      <AlertBox alert={alert} onClose={() => setAlert(null)} t={t} />

      <p className="text-muted">
        {t.stockHintPrefix}
        <strong>{t.manageStock}</strong>
        {t.stockHintSuffix}
      </p>

      <div className="card shadow-sm">
        <div className="card-header">
          <i className="bi bi-clipboard-data me-2"></i>
          {t.currentStockLevels}
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>{t.colName}</th>
                  <th>{t.colCategory}</th>
                  <th>{t.colCurrentQty}</th>
                  <th>{t.colUnitPrice}</th>
                  <th>{t.colStatus}</th>
                  <th>{t.colAction}</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center text-muted py-4">
                      {t.noProductsAvailable}
                    </td>
                  </tr>
                ) : (
                  products.map((product, index) => (
                    <tr key={product.id}>
                      <td>{index + 1}</td>
                      <td className="fw-semibold">{product.name}</td>
                      <td>
                        <span className="badge bg-info text-dark">
                          {t.categories[product.category] || product.category}
                        </span>
                      </td>
                      <td className={
                        product.quantity === 0 ? "text-danger fw-bold" :
                        product.quantity <= 10 ? "text-warning fw-bold" :
                        "text-success fw-bold"
                      }>
                        {product.quantity}
                      </td>
                      <td>RM {product.price.toFixed(2)}</td>
                      <td><StockBadge quantity={product.quantity} t={t} /></td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => setSelectedProduct(product)}
                        >
                          <i className="bi bi-boxes me-1"></i>
                          {t.manageStock}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <StockModal
        show={selectedProduct !== null}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onUpdate={handleStockUpdate}
        t={t}
      />

    </div>
  );
}

export default StockPage;
