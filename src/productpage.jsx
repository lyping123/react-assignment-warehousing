
import React, { useState, useEffect } from 'react';
 import Table from './components/table.jsx';
 export default function Warehouse() {
     const [tableData, setTableData] = useState([]);
     useEffect(() => {
         setTableData(warehouseProducts);
     }, []);
     const warehouseProducts = [
         { id: 1, name: 'Wireless Mouse', price: 'RM18.00' },
         { id: 2, name: 'Notebook', price: 'RM4.50' },
         { id: 3, name: 'Office Chair', price: 'RM120.00' },
         { id: 4, name: 'Box of Pens', price: 'RM6.00' },
     ];
     const columns = [
         { header: 'ID', accessor: 'id' },
         { header: 'Product Name', accessor: 'name' },
         { header: 'Price', accessor: 'price' },
     ];
     const onRemove = (item) => {
         const updatedData = tableData.filter((row) => row.id !== item.id);
         setTableData(updatedData);
     }
     return (
         <>
             <h1>Warehouse List</h1>
             <Table data={tableData} columns={columns} onRemove={onRemove} />
         </>
     )
    }