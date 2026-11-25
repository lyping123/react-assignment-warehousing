import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Head, Footer } from './Head.jsx';
import Image from './components/image.jsx';
import Form from './form.jsx';
import Grid from './grid.jsx';
import Table from './components/table.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Router } from 'react-router-dom';

const data = [
  { id: 1, name: 'Salmon', price: 10.99 },
  { id: 2, name: 'Tuna', price: 12.99 },
  { id: 3, name: 'Cod', price: 8.99 },
];

const columns = [
  { header: 'ID', accessor: 'id' },
  { header: 'Name', accessor: 'name' },
  { header: 'Price', accessor: 'price' },
];

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Head title="fish market" />

    <Table data={data} columns={columns} />

    <Footer />
  </StrictMode>
)