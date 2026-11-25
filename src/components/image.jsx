import { useState, useEffect } from "react";
import "../index.css";

export default function Image() {
    const [fishData, setFishData] = useState([]);

    useEffect(() => {
        fetch("../../public/fish.json")
            .then((response) => response.json())
            .then((data) => {

                setFishData(data.fish);
            });
    }, []);
    return (
        fishData.map((product) => (
             <div key={product.id} className="mt-4 text-center w-100">
                <img className="rounded mx-auto d-block" src={product.image} alt={product.name} />
                <p className="image-text">{product.name}</p>
                <p>Price: ${product.price}</p>
            </div>
        ))
    );
}