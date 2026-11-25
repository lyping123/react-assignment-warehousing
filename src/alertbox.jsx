export default function AlertBox({ alert, onClose }) {
  if (!alert) return null;
  const icon = alert.variant === "success" ? "bi-check-circle-fill" : "bi-exclamation-triangle-fill";
  return (
    <div className={`alert alert-${alert.variant} alert-dismissible`} role="alert">
      <i className={`bi ${icon} me-2`}></i>
      {alert.message}
      <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
    </div>
  );
}