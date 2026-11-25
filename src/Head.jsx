import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import ProductPage from './ProductPage';
import StockPage from './StockPage';

function Head(props) {

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
                                    <Link className="nav-link" onClick={() => setActiveNav('/product')} to="/product">Product Management</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={() => setActiveNav('/stock')} to="/stock">Stock Management</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <Routes>
                    <Route path="/product" element={<ProductPage />} />
                    <Route path="/stock" element={<StockPage />} />
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