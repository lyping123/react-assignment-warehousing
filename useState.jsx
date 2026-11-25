import { useState, useEffect } from 'react';
function Counter() {
    // [currentValue, updaterFunction] = useState(initialValue)
    const [count, setCount] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [productData, setData] = useState([]);


    useEffect(() => {
        const data = fetch("../../public/product.json")
            .then(response => response.json())
            .then(data => {
                setData(data.fish);
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
                    </tr>
                </thead>
                <tbody>
                    {fishData.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default Counter;