import { useState, useEffect } from 'react';
 function Counter() {
     // [currentValue, updaterFunction] = useState(initialValue)
     const [count, setCount] = useState(0);
     const [inputValue, setInputValue] = useState('');
     const [productData, setData] = useState([]);
     useEffect(() => {
         fetch("/product.json")
             .then(response => response.json())
             .then(data => {
                 setData(data.products);
             });
     }, []);
     return (
         <div>
             <p>Count: {count}</p>
             <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
             <button onClick={() => setCount(count + 1)}>Increment</button>
             <table border="1">
                 <thead>
                     <tr>
                         <th>Product ID</th>
                         <th>Product Name</th>
                         <th>Category</th>
                         <th>Quantity</th>
                         <th>Unit Price</th>
                         <th>ACTION</th>
                     </tr>
                 </thead>
                 <tbody>
                     {productData.map((item) => (
                         <tr key={item.id}>
                             <td>{item.id}</td>
                             <td>{item.name}</td>
                             <td>{item.category}</td>
                             <td>{item.quantity}</td>
                             <td>RM {item.price}</td>
                             <td>DELETE</td>
                         </tr>
                     ))}
                 </tbody>
             </table>
         </div>
     );
 }
 export default Counter;