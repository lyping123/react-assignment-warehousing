export default function ConfirmModal({ show, product, language = 'en', onClose, onConfirm }) {
  if (!show || !product) return null
  const isChinese = language === 'zh'

  return (
    <div className="modal d-block modal-backdrop-custom" role="dialog" aria-modal="true">
      <div className="modal-dialog modal-dialog-centered modal-sm">
        <div className="modal-content warehouse-modal">
          <div className="modal-body text-center confirm-body">
            <div className="confirm-icon"><i className="bi bi-trash3" /></div>
            <h5>{isChinese ? '删除产品？' : 'Remove product?'}</h5>
            <p>{isChinese ? '确定要删除 ' : 'Are you sure you want to remove '}<strong>{product.name}</strong> (#{product.id})?</p>
          </div>
          <div className="modal-footer justify-content-center">
            <button type="button" className="btn btn-light" onClick={onClose}>{isChinese ? '取消' : 'Cancel'}</button>
            <button type="button" className="btn btn-danger" onClick={onConfirm}>
              <i className="bi bi-trash3 me-2" />{isChinese ? '删除' : 'Remove'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
