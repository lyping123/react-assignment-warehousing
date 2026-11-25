import React, { useState, useEffect } from 'react';
 import Table from './components/table.jsx';
 import AlertBox from './alert.jsx';
 export default function StockPage() {
     const [tableData, setTableData] = useState([]);
     const [alertMsg, setAlertMsg] = useState({show:false, type:"", msg:""});
     const products = [
         { id:1001, name:"Wireless Mouse", category:"Electronics", quantity:120, price:25.5 },
         { id:1002, name:"Keyboard", category:"Electronics", quantity:8, price:45.0 },
         { id:1003, name:"Office Chair", category:"Furniture", quantity:0, price:180.0 },
         { id:1004, name:"Monitor", category:"Electronics", quantity:25, price:350.0 }
     ];
     useEffect(() => {
         setTableData(products);
     }, []);
     const columns = [
         { header: "Product ID", accessor: "id" },
         { header: "Product Name", accessor: "name" },
         { header: "Category", accessor: "category" },
         { header: "Current Stock", accessor: "quantity" },
         { header: "Price (RM)", accessor: "price" }
     ];
     return (
         <>
             <h1>Stock Management</h1>
             <AlertBox props={alertMsg} />
             <Table data={tableData} columns={columns} />
         </>
     );
 }