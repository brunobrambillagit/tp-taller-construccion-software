import { useState, useEffect } from "react";
import { crearProducto, actualizarProducto } from "../services/productoService";

function FormProducto({ productoSeleccionado, onGuardado }) {
  const [producto, setProducto] = useState({
    nombre: "",
    precioUnitario: "",
    stockActual: "",
    proveedor: "",
  });

  useEffect(() => {
    if (productoSeleccionado) {
      setProducto(productoSeleccionado);
    }
  }, [productoSeleccionado]);

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (producto.id) {
      actualizarProducto(producto.id, producto).then(onGuardado);
    } else {
      crearProducto(producto).then(onGuardado);
    }

    setProducto({ nombre: "", precioUnitario: "", stockActual: "", proveedor: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{producto.id ? "Editar Producto" : "Nuevo Producto"}</h2>

      <input type="text" name="nombre" placeholder="Nombre" value={producto.nombre} onChange={handleChange} required />

      <input type="number" name="precioUnitario" placeholder="Precio" value={producto.precioUnitario} onChange={handleChange} required />

      <input type="number" name="stockActual" placeholder="Stock" value={producto.stockActual} onChange={handleChange} required />

      <input type="text" name="proveedor" placeholder="Proveedor" value={producto.proveedor} onChange={handleChange} required />

      <button type="submit">Guardar</button>
    </form>
  );
}

export default FormProducto;
