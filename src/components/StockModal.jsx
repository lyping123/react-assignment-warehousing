import { useEffect, useState } from 'react'

export default function StockModal({ show, products, selectedProduct, language = 'en', onClose, onUpdate }) {
  const [productId, setProductId] = useState('')
  const [operation, setOperation] = useState('in')
  const [amount, setAmount] = useState('')
  const isChinese = language === 'zh'

  useEffect(() => {
    if (show) {
      setProductId(selectedProduct ? String(selectedProduct.id) : (products[0] ? String(products[0].id) : ''))
      setOperation('in')
      setAmount('')
    }
  }, [show, selectedProduct, products])

  if (!show) return null

  const current = products.find((product) => product.id === Number(productId))

  const submit = (event) => {
    event.preventDefault()
    if (!current) return
    if (onUpdate(current.id, operation, Number(amount))) onClose()
  }

  return (
    <div className="modal d-block modal-backdrop-custom" role="dialog" aria-modal="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content warehouse-modal">
          <div className="modal-header">
            <div>
              <span className="modal-eyebrow">{isChinese ? '库存变动' : 'Inventory movement'}</span>
              <h5 className="modal-title">{isChinese ? '管理库存' : 'Manage Stock'}</h5>
            </div>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
          </div>
          <form onSubmit={submit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">{isChinese ? '产品' : 'Product'}</label>
                <select className="form-select" value={productId} onChange={(event) => setProductId(event.target.value)}>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>{product.name} — #{product.id}</option>
                  ))}
                </select>
              </div>

              {current && (
                <div className="current-stock">
                  <span>{isChinese ? '可用库存' : 'Available stock'}</span>
                  <strong>{current.quantity} {isChinese ? '件' : 'units'}</strong>
                </div>
              )}

              <div className="operation-toggle" role="group" aria-label="Stock operation">
                <button type="button" className={operation === 'in' ? 'active' : ''} onClick={() => setOperation('in')}>
                  <i className="bi bi-box-arrow-in-down me-2" />{isChinese ? '入库' : 'Stock In'}
                </button>
                <button type="button" className={operation === 'out' ? 'active out' : ''} onClick={() => setOperation('out')}>
                  <i className="bi bi-box-arrow-up me-2" />{isChinese ? '出库' : 'Stock Out'}
                </button>
              </div>

              <label className="form-label">{isChinese ? '数量' : 'Quantity'}</label>
              <input type="number" min="1" className="form-control amount-input" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder={isChinese ? '输入数量' : 'Enter amount'} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-light" onClick={onClose}>{isChinese ? '取消' : 'Cancel'}</button>
              <button type="submit" className="btn btn-primary" disabled={!current || products.length === 0}>
                {isChinese ? '完成操作' : 'Complete Operation'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
