export default function StockBadge({ quantity, language = 'en' }) {
  const isChinese = language === 'zh'
  if (quantity === 0) return <span className="badge status-badge status-danger">{isChinese ? '缺货' : 'Out of Stock'}</span>
  if (quantity <= 10) return <span className="badge status-badge status-warning">{isChinese ? '库存不足' : 'Low Stock'}</span>
  return <span className="badge status-badge status-success">{isChinese ? '库存充足' : 'In Stock'}</span>
}
