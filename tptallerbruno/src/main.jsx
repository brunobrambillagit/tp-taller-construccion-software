import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ListaProductos from './components/ListaProductos.jsx'
import Carrito from './components/Carrito.jsx'
import ListaPedidos from './components/ListaPedidos.jsx'
import "bootstrap/dist/css/bootstrap.min.css";


import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ToastContainer position="top-right" autoClose={2500} />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/productos" element={<ListaProductos />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/pedidos" element={<ListaPedidos />} />
    </Routes>
  </BrowserRouter>
)
