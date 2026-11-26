import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProductTable from './productstable.jsx';

function Head(props) {
    const products = [
  {
    id: 1001,
    name: "Wireless Mouse",
    category: "Electronics",
    quantity: 120,
    price: 25.5,
  },
  {
    id: 1002,
    name: "Keyboard",
    category: "Electronics",
    quantity: 8,
    price: 45.0,
  },
  {
    id: 1003,
    name: "Office Chair",
    category: "Furniture",
    quantity: 0,
    price: 180.0,
  },
  {
    id: 1004,
    name: "Monitor",
    category: "Electronics",
    quantity: 25,
    price: 350.0,
  },
];
const onRemove = (product) => {
  const index = products.findIndex((p) => p.id === product.id);
    if (index !== -1) {
        products.splice(index, 1);
    }
}

    const setActiveNav = (active) => {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === active) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };


    const title = props.title;
    return (
        <>
            <BrowserRouter>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand" onClick={() => setActiveNav('/')} to="/">{title}</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">

                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" onClick={() => setActiveNav('/productstable')} to="/productstable">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={() => setActiveNav('/stock')} to="/stock">Stock
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <Routes>
                  
                    <Route path="/productstable" element={<ProductTable products={products} onRemove={onRemove} />} />
                
                </Routes>
            </BrowserRouter>
        </>
    );
}

function Footer() {
    return (
        <>
            <footer>
                <p>© 2024 My React App. All rights reserved.</p>
            </footer>
        </>
    );
}

export { Head, Footer };