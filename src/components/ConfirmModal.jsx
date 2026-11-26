import { useEffect } from 'react';

export default function ConfirmModal({ show, product, onClose, onConfirm }) {
  useEffect(() => {
    if (!show) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [show, onClose]);

  if (!show || !product) return null;

  return (
    <div className="modal d-flex" role="dialog" aria-modal="true" aria-labelledby="confirm-removal-title">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="confirm-removal-title">Confirm Removal</h5>
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
