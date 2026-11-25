import { useState } from "react";
import Alert from "./components/alert.jsx";

export default function Form() {
    const [name, setFish] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [alertbox, setAlert] = useState({ msg: '', type: '', show: false });
    const [fishData, setFishData] = useState([name, price, image]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFishData([name, price, image]);
        const jsonData = JSON.stringify({ name, price, image });
        try {
            const response = await fetch('http://localhost:8080/api/post.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newItems: jsonData }) // Convert to valid JSON string
            });

            if (response.ok) setAlert({ msg: 'Data saved successfully!', type: 'success', show: true });


        } catch (error) {
            console.error('Error saving data:', error);
            setAlert({ msg: 'Data fail to save!', type: 'danger', show: true });
        }
    }

    return (
        <div className="container">

            <Alert props={alertbox} />
            <form>
                <h3 for="name" className="panel-title">Add New Fish:</h3>
                <div className="row">
                    <div className="col-lg-6 col-md-12  mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setFish(e.target.value)} name="name" placeholder="Fish name.." />
                    </div>
                    <div className="col-lg-6 col-md-12 mb-3">
                        <label htmlFor="price" className="form-label">price</label>
                        <input type="text" className="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} name="price" placeholder="Fish name.." />
                    </div>
                    <div for="image" className="mb-3">
                        <label htmlFor="image" className="form-label">image</label>
                        <input type="text" className="form-control" id="image" value={image} onChange={(e) => setImage(e.target.value)} name="image" placeholder="Fish name.." />
                    </div>
                    <button type="submit" className="btn btn-outline-primary w-50 m-auto p-2" onClick={handleSubmit}>Submit</button>
                </div>
            </form>
        </div>
    );

}