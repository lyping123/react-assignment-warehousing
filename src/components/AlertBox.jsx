// AlertBox component
function AlertBox({ alert, onClose, t }) {
  if (!alert) return null;

  return (
    <div
      className={`alert alert-${alert.type} alert-dismissible fade show`}
      role="alert"
    >
      {alert.type === "success" && <i className="bi bi-check-circle-fill me-2"></i>}
      {alert.type === "danger"  && <i className="bi bi-x-circle-fill me-2"></i>}
      {alert.type === "warning" && <i className="bi bi-exclamation-triangle-fill me-2"></i>}

      {alert.message}

      <button
        type="button"
        className="btn-close"
        onClick={onClose}
        aria-label={t.closeLabel}
      ></button>
    </div>
  );
}

export default AlertBox;
