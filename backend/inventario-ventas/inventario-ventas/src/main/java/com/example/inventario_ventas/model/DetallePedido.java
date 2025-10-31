package com.example.inventario_ventas.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "detalle_pedido")
public class DetallePedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer cantidad;
    private Double precioUnitarioAlMomento;

    @ManyToOne
    @JoinColumn(name = "pedido_id")
    @JsonIgnore   // 👈 AGREGA ESTA LÍNEA
    private Pedido pedido;

    @ManyToOne
    @JoinColumn(name = "producto_id")
    private Producto producto;

    public DetallePedido() {}

    public DetallePedido(Producto producto, Integer cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
        this.precioUnitarioAlMomento = producto.getPrecioUnitario();
    }

    // Getters y setters
    public Long getId() { return id; }
    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }
    public Double getPrecioUnitarioAlMomento() { return precioUnitarioAlMomento; }
    public Pedido getPedido() { return pedido; }
    public void setPedido(Pedido pedido) { this.pedido = pedido; }
    public Producto getProducto() { return producto; }
    public void setProducto(Producto producto) { this.producto = producto; }
    public void setPrecioUnitarioAlMomento(Double precioUnitarioAlMomento) {
        this.precioUnitarioAlMomento = precioUnitarioAlMomento;
    }
}