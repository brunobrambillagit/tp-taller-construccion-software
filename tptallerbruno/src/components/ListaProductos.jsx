import { useEffect, useState } from "react";
import { getProductos, eliminarProducto } from "../services/productoService";
import { Link } from "react-router-dom";
import FormProducto from "./FormProducto";
import "./Carrito.css";



function ListaProductos({ onEditar }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = () => {
    getProductos().then((response) => setProductos(response.data));
  };

  const handleEliminar = (id) => {
    eliminarProducto(id).then(() => cargarProductos());
  };

  return (
  <div className="container mt-4">

    <h2 className="titulo-carrito text-center">Listado de productos</h2>

    {/* FORMULARIO PARA CREAR PRODUCTOS */}
    <div className="card p-3 mb-4 shadow">
      <FormProducto onGuardado={cargarProductos} />
    </div>

    {/* TABLA DE PRODUCTOS */}
    <table className="table table-bordered table-hover text-center">
      <thead className="table-dark">
        <tr>
          <th>Nombre</th>
          <th>Precio Unitario</th>
          <th>Stock</th>
          <th>Proveedor</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((p) => (
          <tr key={p.id}>
            <td>{p.nombre}</td>
            <td>{p.precioUnitario}</td>
            <td>{p.stockActual}</td>
            <td>{p.proveedor}</td>
            <td>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => onEditar(p)}
              >
                ✏ Editar
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleEliminar(p.id)}
              >
                🗑 Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <Link to="/" className="btn btn-secondary mt-3">
      ⬅ Volver al menú
    </Link>
  </div>
  );
}
export default ListaProductos;