import StockBadge from './StockBadge.jsx'

export default function ProductTable({ products, language = 'en', onEdit, onRemove }) {
  const isChinese = language === 'zh'
  const labels = isChinese
    ? ['产品编号', '产品名称', '类别', '数量', '单价', '状态', '操作']
    : ['Product ID', 'Product Name', 'Category', 'Quantity', 'Unit Price', 'Status', 'Action']

  return (
    <div className="table-responsive">
      <table className="table align-middle mb-0 inventory-table">
        <thead>
          <tr>
            {labels.map((label, index) => (
              <th key={label} className={index === 6 ? 'text-end' : ''}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="7" className="empty-state">
                <i className="bi bi-search" />
                <span>{isChinese ? '找不到符合条件的产品。' : 'No matching products found.'}</span>
              </td>
            </tr>
          ) : products.map((product) => (
            <tr key={product.id}>
              <td><span className="product-id">#{product.id}</span></td>
              <td><strong>{product.name}</strong></td>
              <td><span className="category-pill">{product.category}</span></td>
              <td><span className="quantity-value">{product.quantity}</span></td>
              <td>${product.price.toFixed(2)}</td>
              <td><StockBadge quantity={product.quantity} language={language} /></td>
              <td className="text-end">
                <div className="table-actions">
                  <button className="btn btn-edit" title={isChinese ? '编辑产品' : 'Edit product'} onClick={() => onEdit(product)}>
                    <i className="bi bi-pencil" />
                  </button>
                  <button className="btn btn-remove" title={isChinese ? '删除产品' : 'Remove product'} onClick={() => onRemove(product)}>
                    <i className="bi bi-trash3" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
