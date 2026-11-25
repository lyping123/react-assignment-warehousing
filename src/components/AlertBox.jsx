import { useEffect } from 'react'

export default function AlertBox({ alert, language = 'en', onClose }) {
  useEffect(() => {
    if (!alert) return undefined
    const timer = setTimeout(onClose, 5000)
    return () => clearTimeout(timer)
  }, [alert, onClose])

  if (!alert) return null

  const icon = alert.type === 'danger'
    ? 'bi-exclamation-triangle'
    : alert.type === 'warning'
      ? 'bi-trash'
      : 'bi-check-circle'

  return (
    <div className={`alert alert-${alert.type} alert-dismissible fade show app-alert`} role="alert">
      <i className={`bi ${icon} me-2`} />
      <span>{alert.message}</span>
      <button type="button" className="btn-close" aria-label={language === 'zh' ? '关闭' : 'Close'} onClick={onClose} />
    </div>
  )
}
