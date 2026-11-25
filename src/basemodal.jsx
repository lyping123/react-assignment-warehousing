export default function BaseModal({ show, title, onClose, onSubmit, footer, children }) {
  if (!show) return null;
  const Wrapper = onSubmit ? "form" : "div";
  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog" onClick={onClose}>
        <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
            </div>
            <Wrapper onSubmit={onSubmit}>
              <div className="modal-body">{children}</div>
              <div className="modal-footer">{footer}</div>
            </Wrapper>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
}