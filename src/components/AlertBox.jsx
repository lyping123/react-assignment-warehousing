import Alert from 'react-bootstrap/Alert'

export default function AlertBox({ alert, onDismiss }) {
  if (!alert) return null

  return (
    <Alert
      key={alert.id}
      variant={alert.type}
      dismissible
      onClose={onDismiss}
      className="app-alert"
      role="status"
    >
      <i className={`bi ${alert.type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'}`} aria-hidden="true" />
      {alert.message}
    </Alert>
  )
}
