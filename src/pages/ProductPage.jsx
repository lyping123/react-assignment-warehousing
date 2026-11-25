// ProductPage – Product Management Page
import { useState, useEffect } from "react";
import ProductTable  from "../components/ProductTable";
import ProductModal  from "../components/ProductModal";
import ConfirmModal  from "../components/ConfirmModal";
import AlertBox      from "../components/AlertBox";

function ProductPage({ products, setProducts, t }) {
  const [search,       setSearch]       = useState("");
  const [showAdd,      setShowAdd]      = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [alert,        setAlert]        = useState(null);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleAdd(newProduct) {
    // Auto-increment Product ID based on the highest existing ID (starts at 1001)
    const nextId =
      products.length > 0
        ? Math.max(...products.map((p) => p.id)) + 1
        : 1001;

    const productWithId = { ...newProduct, id: nextId };
    setProducts([...products, productWithId]);
    setAlert({ type: "success", message: t.alertAdded(productWithId.name) });
  }

  function handleDeleteClick(product) {
    setDeleteTarget(product);
  }

  function handleConfirmDelete() {
    setProducts(products.filter((p) => p.id !== deleteTarget.id));
    setAlert({ type: "danger", message: t.alertRemoved(deleteTarget.name) });
    setDeleteTarget(null);
  }

  return (
    <div className="container my-4">

      <div className="d-flex align-items-center mb-3">
        <i className="bi bi-box-seam fs-3 me-2 text-primary"></i>
        <h2 className="mb-0">{t.productMgmt}</h2>
      </div>

      <AlertBox alert={alert} onClose={() => setAlert(null)} t={t} />

      {/* Search bar + Add button */}
      <div className="row g-2 mb-3">
        <div className="col-12 col-md-8">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder={t.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                className="btn btn-outline-secondary"
                onClick={() => setSearch("")}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>
        </div>
        <div className="col-12 col-md-4 d-flex justify-content-md-end">
          <button
            className="btn btn-primary w-100"
            onClick={() => setShowAdd(true)}
          >
            <i className="bi bi-plus-circle me-1"></i>
            {t.addProduct}
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="card text-center border-0 shadow-sm">
            <div className="card-body">
              <div className="fs-4 fw-bold text-primary">{products.length}</div>
              <small className="text-muted">{t.totalProducts}</small>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card text-center border-0 shadow-sm">
            <div className="card-body">
              <div className="fs-4 fw-bold text-success">
                {products.filter((p) => p.quantity > 10).length}
              </div>
              <small className="text-muted">{t.inStock}</small>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card text-center border-0 shadow-sm">
            <div className="card-body">
              <div className="fs-4 fw-bold text-warning">
                {products.filter((p) => p.quantity >= 1 && p.quantity <= 10).length}
              </div>
              <small className="text-muted">{t.lowStock}</small>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card text-center border-0 shadow-sm">
            <div className="card-body">
              <div className="fs-4 fw-bold text-danger">
                {products.filter((p) => p.quantity === 0).length}
              </div>
              <small className="text-muted">{t.outOfStock}</small>
            </div>
          </div>
        </div>
      </div>

      {/* Product table */}
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>
            <i className="bi bi-table me-2"></i>
            {t.productList}
          </span>
          <span className="badge bg-primary">{t.recordsCount(filteredProducts.length)}</span>
        </div>
        <div className="card-body p-0">
          <ProductTable
            products={filteredProducts}
            onDelete={handleDeleteClick}
            t={t}
          />
        </div>
      </div>

      <ProductModal
        show={showAdd}
        onClose={() => setShowAdd(false)}
        onAdd={handleAdd}
        t={t}
      />

      <ConfirmModal
        show={deleteTarget !== null}
        product={deleteTarget}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
        t={t}
      />

    </div>
  );
}

export default ProductPage;
