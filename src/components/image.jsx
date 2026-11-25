import { useState, useEffect } from "react";
import "../index.css";

export default function Image() {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        fetch("../../public/product.json")
            .then((response) => response.json())
            .then((data) => {

                setProductData(data.product);
            });
    }, []);
    return (
        productData.map((product) => (
            <div key={product.id} className="image-border">
                <img className="image" src={product.image} alt={product.name} />
                <p className="image-text">{product.name}</p>
            </div>
        ))
    );
}
