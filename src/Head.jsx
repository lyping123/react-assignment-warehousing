import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Image from './components/image.jsx';
import Form from './form.jsx';
import Counter from './useState.jsx';
import Grid from './grid.jsx';
import Fruits from './fruits.jsx';
import Fish from './fish.jsx';
import TransitionHook from './TransitionHook.jsx';


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
                                    <Link className="nav-link" aria-current="page" onClick={() => setActiveNav('/image')} to="/image">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={() => setActiveNav('/form')} to="/form">Form</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={() => setActiveNav('/grid')} to="/grid">grid</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={() => setActiveNav('/useState')} to="/useState">useState</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Dropdown
                                    </Link>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><Link className="dropdown-item" to="/fruits">Fruits</Link></li>
                                        <li><Link className="dropdown-item" to="/fish">Fish</Link></li>
                                        <li><Link className="dropdown-item" to="/something-else">Something else here</Link></li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={() => setActiveNav('/TransitionHook')} to="/TransitionHook">useTransition </Link>
                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>

                <Routes>
                    <Route path="/image" element={<Image />} />
                    <Route path="/form" element={<Form />} />
                    <Route path="/grid" element={<Grid />} />
                    <Route path="/fruits" element={<Fruits />} />
                    <Route path="/fish" element={<Fish />} />
                    <Route path="/useState" element={<Counter />} />
                    <Route path="/TransitionHook" element={<TransitionHook />} />
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