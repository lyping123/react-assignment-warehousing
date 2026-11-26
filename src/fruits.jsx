import { useState } from 'react';
import Table from './table.jsx';

const products = [
    {
        id: 1001,
        name: 'Wireless Mouse',
        category: 'Electronics',
        quantity: 120,
        price: 25.5,
    },
    {
        id: 1002,
        name: 'Keyboard',
        category: 'Electronics',
        quantity: 8,
        price: 45.0,
    },
    {
        id: 1003,
        name: 'Office Chair',
        category: 'Furniture',
        quantity: 0,
        price: 180.0,
    },
    {
        id: 1004,
        name: 'Monitor',
        category: 'Electronics',
        quantity: 25,
        price: 350.0,
    },
];

const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Category', accessor: 'category' },
    { header: 'Quantity', accessor: 'quantity' },
    { header: 'Stock Status', accessor: 'stockStatus' },
    { header: 'Unit Price', accessor: 'price' },
];

export default function Fruits() {
    const [tableData, setTableData] = useState(products);

    const onRemove = (item) => {
        setTableData((currentData) =>
            currentData.filter((row) => row.id !== item.id)
        );
    };

    return (
        <div className="container">
            <h1 className="mt-4">Products List</h1>
            <Table data={tableData} columns={columns} onRemove={onRemove} />
        </div>
    );
}