import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Head, Footer } from './Head.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';




createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Head title="fish market" />

    <Footer />
  </StrictMode>
)
