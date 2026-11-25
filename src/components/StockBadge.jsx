// StockBadge component
function StockBadge({ quantity, t }) {
  if (quantity === 0) {
    return <span className="badge bg-danger">{t.outOfStock}</span>;
  } else if (quantity <= 10) {
    return <span className="badge bg-warning text-dark">{t.lowStock}</span>;
  } else {
    return <span className="badge bg-success">{t.inStock}</span>;
  }
}

export default StockBadge;
