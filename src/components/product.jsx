import Table from './components/table.jsx';
export default function Fish() {
    const fish = [
        { id: 1001, name: 'Wireless Mouse', price: '$25.50' },
        { id: 1002, name: 'Keyboard', price: '$45.00' },
        { id: 1003, name: 'Office Chair', price: '$180.00' },
        { id: 1004, name: 'Monitor', price: '$350.00' },
    ];
    const columns = [
        { header: 'ID', accessor: 'id' },
        { header: 'Product Name', accessor: 'name' },
        { header: 'Price', accessor: 'price' },
    ];

    return (
        <>
            <h1>Product List</h1>
            <Table data={product} columns={columns} />
        </>
    )
}