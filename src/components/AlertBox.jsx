import { useEffect } from 'react'

function AlertBox({ alert, onClose }) {
  useEffect(() => {
    if (!alert) return

    const timer = setTimeout(() => {
      onClose()
    }, 4000)

    return () => clearTimeout(timer)
  }, [alert, onClose])

  if (!alert) return null

  const iconClass =
    alert.type === 'success'
      ? 'bi-check-circle-fill'
      : 'bi-exclamation-triangle-fill'

  return (
    <div
      className={`alert alert-${alert.type} alert-dismissible fade show d-flex align-items-center`}
      role="alert"
    >
      <i className={`bi ${iconClass} me-2`}></i>
      <div>{alert.message}</div>
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={onClose}
      ></button>
    </div>
  )
}

export default AlertBox
