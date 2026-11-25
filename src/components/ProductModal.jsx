import { useEffect, useState } from 'react'

const emptyProduct = { id: '', name: '', category: '', quantity: '', price: '' }

export default function ProductModal({ show, onClose, onAdd, onEdit, product, language = 'en' }) {
  const [form, setForm] = useState(emptyProduct)
  const [error, setError] = useState('')
  const isChinese = language === 'zh'
  const isEditing = Boolean(product)

  useEffect(() => {
    if (show) {
      setForm(product
        ? { id: product.id, name: product.name, category: product.category, quantity: product.quantity, price: product.price }
        : emptyProduct)
      setError('')
    }
  }, [show, product])

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const submit = (event) => {
    event.preventDefault()
    const id = Number(form.id)
    const quantity = Number(form.quantity)
    const price = Number(form.price)

    if (!form.name.trim() || !form.category.trim() || !form.id) {
      setError(isChinese ? '请填写所有必填项目。' : 'Please complete all required fields.')
      return
    }
    if (!Number.isInteger(id) || id <= 0) {
      setError(isChinese ? '产品编号必须是正整数。' : 'Product ID must be a positive whole number.')
      return
    }
    if (!Number.isInteger(quantity) || quantity < 0) {
      setError(isChinese ? '数量必须是零或正整数。' : 'Quantity must be zero or a positive whole number.')
      return
    }
    if (!Number.isFinite(price) || price < 0) {
      setError(isChinese ? '单价必须是零或正数。' : 'Unit price must be zero or a positive number.')
      return
    }

    const savedProduct = {
      id,
      name: form.name.trim(),
      category: form.category.trim(),
      quantity,
      price,
    }
    if (isEditing) onEdit(savedProduct)
    else onAdd(savedProduct)
  }

  if (!show) return null

  return (
    <div className="modal d-block modal-backdrop-custom" role="dialog" aria-modal="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content warehouse-modal">
          <div className="modal-header">
            <div>
              <span className="modal-eyebrow">{isChinese ? (isEditing ? '更新库存资料' : '新增库存项目') : (isEditing ? 'Update inventory item' : 'New inventory item')}</span>
              <h5 className="modal-title">{isChinese ? (isEditing ? '编辑产品' : '添加产品') : (isEditing ? 'Edit Product' : 'Add Product')}</h5>
            </div>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
          </div>
          <form onSubmit={submit}>
            <div className="modal-body">
              {error && <div className="alert alert-danger py-2">{error}</div>}
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">{isChinese ? '产品编号' : 'Product ID'}</label>
                  <input name="id" type="number" min="1" className="form-control" value={form.id} onChange={updateField} disabled={isEditing} />
                </div>
                <div className="col-md-8">
                  <label className="form-label">{isChinese ? '产品名称' : 'Product Name'}</label>
                  <input name="name" className="form-control" value={form.name} onChange={updateField} placeholder={isChinese ? '例如：USB-C 数据线' : 'e.g. USB-C Cable'} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">{isChinese ? '类别' : 'Category'}</label>
                  <input name="category" className="form-control" value={form.category} onChange={updateField} placeholder={isChinese ? '例如：电子产品' : 'e.g. Electronics'} />
                </div>
                <div className="col-md-3">
                  <label className="form-label">{isChinese ? '数量' : 'Quantity'}</label>
                  <input name="quantity" type="number" min="0" className="form-control" value={form.quantity} onChange={updateField} />
                </div>
                <div className="col-md-3">
                  <label className="form-label">{isChinese ? '单价' : 'Unit Price'}</label>
                  <input name="price" type="number" min="0" step="0.01" className="form-control" value={form.price} onChange={updateField} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-light" onClick={onClose}>{isChinese ? '取消' : 'Cancel'}</button>
              <button type="submit" className="btn btn-primary"><i className={`bi ${isEditing ? 'bi-check-lg' : 'bi-plus-lg'} me-2`} />{isChinese ? (isEditing ? '保存更改' : '添加产品') : (isEditing ? 'Save Changes' : 'Add Product')}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
