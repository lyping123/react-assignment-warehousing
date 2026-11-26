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
        fishData.map((fish) => (
            <div key={fish.id} className="mt-4 text-center w-100">
                <img className="rounded mx-auto d-block" src={fish.image} alt={fish.name} />
                <p className="image-text">{fish.name}</p>
                <p>Price: ${fish.price}</p>
            </div>
        ))
    );
}