import axios from "axios";

const API_URL = "http://localhost:8080/api/pedidos";

export const crearPedido = (pedido) => axios.post(API_URL, pedido);

export const getPedidos = () => axios.get(API_URL);
