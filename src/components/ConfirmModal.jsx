// ConfirmModal component
function ConfirmModal({ show, product, onConfirm, onCancel, t }) {
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

            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">
                <i className="bi bi-trash me-2"></i>
                {t.confirmDelete}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onCancel}
              ></button>
            </div>

            <div className="modal-body">
              {product && (
                <p>
                  {t.confirmDeletePrefix}
                  <strong>{product.name}</strong>
                  {t.confirmDeleteSuffix}
                </p>
              )}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancel}
              >
                {t.cancel}
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={onConfirm}
              >
                <i className="bi bi-trash me-1"></i>
                {t.yesDelete}
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmModal;
