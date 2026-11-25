export default function ConfirmModal({ show, product, onClose, onConfirm }) {
  if (!show || !product) return null;
  return (
    <div className="modal d-block" role="dialog" aria-modal="true">
      <div className="modal-backdrop show"></div>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Removal</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">Remove <strong>{product.name}</strong> from inventory?</div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={onConfirm}>Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
}
