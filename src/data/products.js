// Fixed product data array
// This is our "database" – stored in JS and managed with React state

const initialProducts = [
  { id: 1001, name: "Wireless Mouse",   category: "Electronics", quantity: 120, price: 25.50 },
  { id: 1002, name: "Keyboard",         category: "Electronics", quantity: 8,   price: 45.00 },
  { id: 1003, name: "Office Chair",     category: "Furniture",   quantity: 0,   price: 180.00 },
  { id: 1004, name: "Monitor",          category: "Electronics", quantity: 25,  price: 350.00 },
  { id: 1005, name: "Desk Lamp",        category: "Furniture",   quantity: 5,   price: 30.00 },
  { id: 1006, name: "USB-C Hub",        category: "Electronics", quantity: 50,  price: 55.00 },
  { id: 1007, name: "Notebook A4",      category: "Stationery",  quantity: 200, price: 3.50  },
  { id: 1008, name: "Whiteboard Marker",category: "Stationery",  quantity: 10,  price: 1.20  },
];

export default initialProducts;
