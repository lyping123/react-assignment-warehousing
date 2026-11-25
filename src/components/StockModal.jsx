// StockModal component
import { useState, useEffect } from "react";

function StockModal({ show, product, onClose, onUpdate, t }) {
  const [moveType, setMoveType] = useState("in");
  const [qty, setQty] = useState("");
  const [errorKey, setErrorKey] = useState("");

  useEffect(() => {
    if (show) {
      setMoveType("in");
      setQty("");
      setErrorKey("");
    }
  }, [show, product]);

  function handleSubmit(e) {
    e.preventDefault();
    setErrorKey("");

    const amount = Number(qty);

    if (!qty || isNaN(amount) || amount <= 0) {
      setErrorKey("errValidQty");
      return;
    }

    if (moveType === "out" && amount > product.quantity) {
      setErrorKey("errStockOut");
      return;
    }

    const newQty =
      moveType === "in"
        ? product.quantity + amount
        : product.quantity - amount;

    onUpdate(product.id, newQty, moveType, amount);
    onClose();
  }

  const errorMessage =
    errorKey === "errStockOut" && product
      ? t.errStockOut(product.quantity)
      : errorKey
      ? t[errorKey]
      : "";

  return (
    <>
      {show && <div className="modal-backdrop fade show"></div>}

      <div
        className={`modal fade ${show ? "show" : ""}`}
        style={{ display: show ? "block" : "none" }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className={`modal-header ${moveType === "in" ? "bg-success" : "bg-danger"} text-white`}>
              <h5 className="modal-title">
                <i className={`bi bi-box-arrow-${moveType === "in" ? "in-down" : "up"} me-2`}></i>
                {moveType === "in" ? t.stockIn : t.stockOut} — {product?.name}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body">
              {product && (
                <div className="mb-3 p-3 bg-light rounded">
                  <small className="text-muted">{t.currentStock}</small>
                  <div className="fs-4 fw-bold text-primary">
                    {product.quantity} {t.units}
                  </div>
                </div>
              )}

              <form id="stockForm" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">{t.movementType}</label>
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className={`btn flex-fill ${moveType === "in" ? "btn-success" : "btn-outline-success"}`}
                      onClick={() => { setMoveType("in"); setErrorKey(""); }}
                    >
                      <i className="bi bi-box-arrow-in-down me-1"></i> {t.stockIn}
                    </button>
                    <button
                      type="button"
                      className={`btn flex-fill ${moveType === "out" ? "btn-danger" : "btn-outline-danger"}`}
                      onClick={() => { setMoveType("out"); setErrorKey(""); }}
                    >
                      <i className="bi bi-box-arrow-up me-1"></i> {t.stockOut}
                    </button>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    {moveType === "in" ? t.qtyToAdd : t.qtyToRemove}
                  </label>
                  <input
                    type="number"
                    className={`form-control ${errorMessage ? "is-invalid" : ""}`}
                    value={qty}
                    onChange={(e) => { setQty(e.target.value); setErrorKey(""); }}
                    placeholder={t.enterQty}
                    min="1"
                  />
                  {errorMessage && <div className="invalid-feedback d-block">{errorMessage}</div>}
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                {t.cancel}
              </button>
              <button
                type="submit"
                form="stockForm"
                className={`btn ${moveType === "in" ? "btn-success" : "btn-danger"}`}
              >
                {moveType === "in" ? t.confirmStockIn : t.confirmStockOut}
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default StockModal;
