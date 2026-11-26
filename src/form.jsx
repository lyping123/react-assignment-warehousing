import { useState } from "react";
import Alert from "./components/alert.jsx";

export default function Form() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [alertbox, setAlert] = useState({ msg: '', type: '', show: false });

    const handleSubmit = (event) => {
        event.preventDefault();

        if (Number(id) <= 0) {
            setAlert({ msg: 'Product ID must be greater than 0.', type: 'danger', show: true });
            return;
        }
        if (Number(quantity) < 0) {
            setAlert({ msg: 'Quantity cannot be negative.', type: 'danger', show: true });
            return;
        }
        if (Number(price) < 0) {
            setAlert({ msg: 'Unit Price cannot be negative.', type: 'danger', show: true });
            return;
        }

        setAlert({ msg: 'Product data submitted successfully!', type: 'success', show: true });
        setId('');
        setName('');
        setCategory('');
        setQuantity('');
        setPrice('');
    }

    return (
        <div className="container">

            <Alert props={alertbox} />
            <form onSubmit={handleSubmit}>
                <h3 className="panel-title">Add New Product</h3>
                <div className="row">
                    <div className="col-lg-6 col-md-12  mb-3">
                        <label htmlFor="id" className="form-label">Product ID</label>
                        <input type="number" className="form-control" id="id" value={id} onChange={(e) => setId(e.target.value)} name="id" min="1" required />
                    </div>
                    <div className="col-lg-6 col-md-12 mb-3">
                        <label htmlFor="name" className="form-label">Product Name</label>
                        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} name="name" required />
                    </div>
                    <div className="col-lg-6 col-md-12 mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <input type="text" className="form-control" id="category" value={category} onChange={(e) => setCategory(e.target.value)} name="category" required />
                    </div>
                    <div className="col-lg-6 col-md-12 mb-3">
                        <label htmlFor="quantity" className="form-label">Quantity</label>
                        <input type="number" className="form-control" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} name="quantity" min="0" required />
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="price" className="form-label">Unit Price</label>
                        <input type="number" className="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} name="price" min="0" step="0.01" required />
                    </div>
                    <button type="submit" className="btn btn-outline-primary w-50 m-auto p-2">Submit</button>
                </div>
            </form>
        </div>
    );

}