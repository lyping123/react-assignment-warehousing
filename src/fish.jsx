import { useState } from 'react';
import Table from './table.jsx';

const fish = [
    { id: 1, name: 'Salmon', category: 'Seafood', quantity: 40, price: 10 },
    { id: 2, name: 'Tuna', category: 'Seafood', quantity: 25, price: 12 },
    { id: 3, name: 'Trout', category: 'Seafood', quantity: 18, price: 8 },
];

const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Category', accessor: 'category' },
    { header: 'Quantity', accessor: 'quantity' },
    { header: 'Stock Status', accessor: 'stockStatus' },
    { header: 'Price', accessor: 'price' },
];

export default function Fish() {
    const [tableData, setTableData] = useState(fish);

    const onRemove = (item) => {
        setTableData((currentData) =>
            currentData.filter((row) => row.id !== item.id)
        );
    };

    return (
        <div className="container">
            <h1 className="mt-4">Fish List</h1>
            <Table data={tableData} columns={columns} onRemove={onRemove} />
        </div>
    );
}