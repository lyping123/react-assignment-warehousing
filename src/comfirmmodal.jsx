import BaseModal from "./basemodal";

export default function ConfirmModal({ show, product, onConfirm, onCancel }) {
  return (
    <BaseModal
      show={show}
      title="Confirm Removal"
      onClose={onCancel}
      footer={
        <>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          <button type="button" className="btn btn-danger" onClick={onConfirm}>Remove</button>
        </>
      }
    >
      Are you sure you want to remove <strong>{product?.name}</strong> (ID {product?.id})? This cannot be undone.
    </BaseModal>
  );
}