import { Badge } from "react-bootstrap";

export default function StockBadge({ quantity }) {
  if (quantity === 0) return <Badge bg="danger">Out of Stock</Badge>;
  if (quantity <= 10) return <Badge bg="warning" text="dark">Low Stock</Badge>;
  return <Badge bg="success">In Stock</Badge>;
}
