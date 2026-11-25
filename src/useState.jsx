import { useState, useEffect } from 'react';
function Counter() {
    const [count, setCount] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [fishData, setData] = useState([]);


    useEffect(() => {
        const data = fetch("../../public/product.json")
            .then(response => response.json())
            .then(data => {
                setData(data.product);
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
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {fishData.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>{product.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
}

export default Counter;