package com.example.inventario_ventas.service;

import com.example.inventario_ventas.model.DetallePedido;
import com.example.inventario_ventas.model.Pedido;
import com.example.inventario_ventas.model.Producto;
import com.example.inventario_ventas.repository.PedidoRepository;
import com.example.inventario_ventas.repository.ProductoRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ProductoRepository productoRepository;

    public PedidoService(PedidoRepository pedidoRepository, ProductoRepository productoRepository) {
        this.pedidoRepository = pedidoRepository;
        this.productoRepository = productoRepository;
    }

    @Transactional  // ✅ IMPORTANTE: si falla algo, hace rollback automático
    public Pedido crearPedido(Pedido pedido) {

        double total = 0.0;

        for (DetallePedido detalle : pedido.getDetalles()) {

            Producto producto = productoRepository
                    .findById(detalle.getProducto().getId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

            if (producto.getStockActual() < detalle.getCantidad()) {
                throw new RuntimeException("No hay stock suficiente para: " + producto.getNombre());
            }

            producto.setStockActual(producto.getStockActual() - detalle.getCantidad());
            productoRepository.save(producto);

            detalle.setPrecioUnitarioAlMomento(producto.getPrecioUnitario());
            detalle.setPedido(pedido);

            total += detalle.getCantidad() * detalle.getPrecioUnitarioAlMomento();
        }

        pedido.setTotalFinal(total);

        return pedidoRepository.save(pedido);
    }
}