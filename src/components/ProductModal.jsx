// ProductModal component
import { useState } from "react";

function ProductModal({ show, onClose, onAdd, t }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  function validate() {
    const newErrors = {};
    if (!form.name.trim())     newErrors.name     = "errName";
    if (!form.category.trim()) newErrors.category = "errCategory";
    if (form.quantity === "" || isNaN(form.quantity) || Number(form.quantity) < 0)
      newErrors.quantity = "errQty";
    if (form.price === "" || isNaN(form.price) || Number(form.price) <= 0)
      newErrors.price = "errPrice";
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newProduct = {
      name: form.name.trim(),
      category: form.category.trim(),
      quantity: Number(form.quantity),
      price: Number(form.price),
    };

    onAdd(newProduct);
    handleClose();
  }

  function handleClose() {
    setForm({ name: "", category: "", quantity: "", price: "" });
    setErrors({});
    onClose();
  }

  return (
    <>
      {show && <div className="modal-backdrop fade show"></div>}

      <div
        className={`modal fade ${show ? "show" : ""}`}
        style={{ display: show ? "block" : "none" }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">
                <i className="bi bi-plus-circle me-2"></i>
                {t.addNewProduct}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={handleClose}
              ></button>
            </div>

            <div className="modal-body">
              <form id="productForm" onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label fw-semibold">{t.productNameLabel}</label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t.productNamePlaceholder}
                  />
                  {errors.name && <div className="invalid-feedback">{t[errors.name]}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">{t.categoryLabel}</label>
                  <select
                    className={`form-select ${errors.category ? "is-invalid" : ""}`}
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  >
                    <option value="">{t.selectCategory}</option>
                    <option value="Electronics">{t.categories.Electronics}</option>
                    <option value="Furniture">{t.categories.Furniture}</option>
                    <option value="Stationery">{t.categories.Stationery}</option>
                    <option value="Tools">{t.categories.Tools}</option>
                    <option value="Others">{t.categories.Others}</option>
                  </select>
                  {errors.category && <div className="invalid-feedback">{t[errors.category]}</div>}
                </div>

                <div className="row">
                  <div className="col-6 mb-3">
                    <label className="form-label fw-semibold">{t.qtyLabel}</label>
                    <input
                      type="number"
                      className={`form-control ${errors.quantity ? "is-invalid" : ""}`}
                      name="quantity"
                      value={form.quantity}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                    />
                    {errors.quantity && <div className="invalid-feedback">{t[errors.quantity]}</div>}
                  </div>
                  <div className="col-6 mb-3">
                    <label className="form-label fw-semibold">{t.priceLabel}</label>
                    <input
                      type="number"
                      className={`form-control ${errors.price ? "is-invalid" : ""}`}
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                    {errors.price && <div className="invalid-feedback">{t[errors.price]}</div>}
                  </div>
                </div>

              </form>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>
                {t.cancel}
              </button>
              <button type="submit" form="productForm" className="btn btn-primary">
                <i className="bi bi-plus-circle me-1"></i>
                {t.addProduct}
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default ProductModal;
