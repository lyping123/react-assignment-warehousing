export default function StockBadge({ quantity }) {
  if (quantity === 0) return <span className="badge text-bg-danger">Out of Stock</span>;
  if (quantity <= 10) return <span className="badge text-bg-warning">Low Stock</span>;
  return <span className="badge text-bg-success">In Stock</span>;
}