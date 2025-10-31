import { useState, useEffect } from "react";
import { getProductos } from "../services/productoService";
import { crearPedido } from "../services/pedidoService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


function Carrito() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [nombreComprador, setNombreComprador] = useState("");

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = () => {
    getProductos().then((res) => setProductos(res.data));
  };

  const agregarAlCarrito = (producto) => {
    // verificar si ya está en el carrito
    const existe = carrito.find((item) => item.id === producto.id);

    if (existe) {
      // si ya está, aumentar cantidad
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      // si no está, agregar con cantidad inicial = 1
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
      toast.info(`➕ ${producto.nombre} agregado al carrito`);
  };

  const vaciarCarrito = () => setCarrito([]);

  const enviarPedido = () => {
    const pedido = {
      nombreComprador,
      detalles: carrito.map((item) => ({
        producto: { id: item.id },
        cantidad: item.cantidad,
      })),
    };

    crearPedido(pedido)
      .then((res) => {
        toast.success(`✅ Pedido creado (ID: ${res.data.id})`);
        vaciarCarrito();
      })
      .catch((error) => {
        toast.error(`❌ Error: ${error.response?.data || error.message}`);
      });
  };

  return (
    <div>
      <h2>Carrito de Compras</h2>

      {/* ingresar nombre */}
      <input
        type="text"
        placeholder="Nombre del comprador"
        value={nombreComprador}
        onChange={(e) => setNombreComprador(e.target.value)}
      />

      {/* listado de productos */}
      <h3>Productos disponibles</h3>
      <table className="table table-bordered table-hover text-center">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio Unitario</th>
            <th>Stock</th>
            <th>Proveedor</th>
            <th></th>
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
              <button className="btn btn-success btn-sm" onClick={() => agregarAlCarrito(p)}>
                 + Agregar
              </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* tabla carrito */}
      <h3>Carrito</h3>
      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map((item) => (
              <tr key={item.id}>
                <td>{item.nombre}</td>
                <td>{item.cantidad}</td>
                <td>{item.precioUnitario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h4 className="text-end mt-3 fw-bold">
        Total: $
        {carrito.reduce(
          (total, item) => total + item.precioUnitario * item.cantidad,
          0
        )}
      </h4>

      {/* botones */}
      <button className="btn btn-outline-danger" onClick={vaciarCarrito}>
        🗑 Vaciar carrito
      </button>
      <button className="btn btn-primary" onClick={enviarPedido} disabled={carrito.length === 0}>
        ✅ Confirmar pedido
      </button>
      <Link to="/">
      <Link to="/" className="btn btn-secondary mt-3">⬅ Volver al menú</Link>
      </Link>
    </div>
  );
}

export default Carrito;
