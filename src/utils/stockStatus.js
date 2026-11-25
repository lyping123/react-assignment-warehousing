export function getStockStatus(quantity) {
  if (quantity === 0) return { label: "Out of Stock", variant: "danger" };
  if (quantity <= 10) return { label: "Low Stock", variant: "warning" };
  return { label: "In Stock", variant: "success" };
}