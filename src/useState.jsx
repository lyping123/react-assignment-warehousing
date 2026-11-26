import { useState, useEffect } from 'react';
function Counter() {
    // [currentValue, updaterFunction] = useState(initialValue)
    const [count, setCount] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [fishData, setData] = useState([]);


    useEffect(() => {
        const data = fetch("../../public/fish.json")
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
                    {fishData.map((fish) => (
                        <tr key={fish.id}>
                            <td>{fish.name}</td>
                            <td>${fish.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
}
export default Counter;