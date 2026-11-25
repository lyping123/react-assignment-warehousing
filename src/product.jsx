import React, { useState, useEffect } from 'react';
import Table from './components/table.jsx';
export default function Product() {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        setTableData(product);
    }, []);

   const product = [
  {
    id: 1001,
    name: "Wireless Mouse",
    category: "Electronics",
    quantity: 120,
    price: 25.5,
  },
  {
    id: 1002,
    name: "Keyboard",
    category: "Electronics",
    quantity: 8,
    price: 45.0,
  },
  {
    id: 1003,
    name: "Office Chair",
    category: "Furniture",
    quantity: 0,
    price: 180.0,
  },
  {
    id: 1004,
    name: "Monitor",
    category: "Electronics",
    quantity: 25,
    price: 350.0,
  },
];

    const onRemove = (item) => {
        const updatedData = tableData.filter((row) => row.id !== item.id);
        setTableData(updatedData);
    }


    return (
        <>
            <h1>Product List</h1>
            <Table data={tableData} columns={columns} onRemove={onRemove} />
        </>
    )
}