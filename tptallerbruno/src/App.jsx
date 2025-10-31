import { Link } from "react-router-dom";

function App() {
  return (
    <div className="container text-center mt-4">

      <h2 className="mb-4 fw-bold">Sistema de gestión FixFast</h2>

      <div className="d-grid gap-3 col-6 mx-auto">
        <Link to="/productos" className="btn btn-primary btn-lg">📦 Listado de productos</Link>
        <Link to="/carrito" className="btn btn-success btn-lg">🛒 Carrito de compras</Link>
        <Link to="/pedidos" className="btn btn-info btn-lg text-white">📄 Listado de pedidos</Link>
      </div>

    </div>
  );
}

export default App;
