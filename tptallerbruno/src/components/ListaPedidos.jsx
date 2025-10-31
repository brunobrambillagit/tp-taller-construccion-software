import { useEffect, useState } from "react";
import { getPedidos } from "../services/pedidoService";
import { Link } from "react-router-dom";
import "./Carrito.css";


function ListaPedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    cargarPedidos();
  }, []);

  const cargarPedidos = () => {
    getPedidos().then((res) => setPedidos(res.data));
  };

  return (
    <div>
    <h2 className="titulo-carrito">Listado de pedidos</h2>

      {pedidos.length === 0 ? (
        <p>No hay pedidos registrados.</p>
      ) : (
        <table className="table table-bordered table-hover text-center">
          <thead>
            <tr>
              <th>ID Pedido</th>
              <th>Comprador</th>
              <th>Fecha</th>
              <th>Total Final</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombreComprador}</td>
                <td>{new Date(p.fecha).toLocaleString()}</td>
                <td>${p.totalFinal}</td>
                <td>
                  <ul>
                    {p.detalles.map((d) => (
                      <li key={d.id}>
                        Producto: {d.producto.nombre} | Cantidad: {d.cantidad} | Precio: {d.precioUnitarioAlMomento}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Link to="/">
      <Link to="/" className="btn btn-secondary mt-3">⬅ Volver al menú</Link>
      </Link>
    </div>
  );
}

export default ListaPedidos;
