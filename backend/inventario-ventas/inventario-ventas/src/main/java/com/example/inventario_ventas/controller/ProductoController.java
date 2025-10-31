package com.example.inventario_ventas.controller;

import com.example.inventario_ventas.model.Producto;
import com.example.inventario_ventas.repository.ProductoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:5173") // <-- permite conexión desde React
public class ProductoController {

    private final ProductoRepository productoRepository;

    public ProductoController(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    @GetMapping
    public List<Producto> listarProductos() {
        return productoRepository.findAll();
    }

    @PostMapping
    public Producto crearProducto(@RequestBody Producto producto) {
        return productoRepository.save(producto);
    }

    @PutMapping("/{id}")
    public Producto actualizarProducto(@PathVariable Long id, @RequestBody Producto productoActualizado) {
        return productoRepository.findById(id)
                .map(producto -> {
                    producto.setNombre(productoActualizado.getNombre());
                    producto.setPrecioUnitario(productoActualizado.getPrecioUnitario());
                    producto.setStockActual(productoActualizado.getStockActual());
                    producto.setProveedor(productoActualizado.getProveedor());
                    return productoRepository.save(producto);
                })
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    @DeleteMapping("/{id}")
    public void eliminarProducto(@PathVariable Long id) {
        productoRepository.deleteById(id);
    }
}