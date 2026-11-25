import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import form from './form';
import Counter from './useState.jsx';

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

    