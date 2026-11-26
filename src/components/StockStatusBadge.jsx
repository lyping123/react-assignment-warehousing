import Badge from 'react-bootstrap/Badge';

export function getStockStatus(quantity) {
    const stockQuantity = Number(quantity);

    if (stockQuantity === 0) {
        return { label: 'Out of Stock', variant: 'danger' };
    }
    if (stockQuantity >= 1 && stockQuantity <= 10) {
        return { label: 'Low Stock', variant: 'warning' };
    }
    return { label: 'In Stock', variant: 'success' };
}

export default function StockStatusBadge({ quantity }) {
    const status = getStockStatus(quantity);

    return (
        <Badge bg={status.variant} pill>
            {status.label}
        </Badge>
    );
}
