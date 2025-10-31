package com.example.inventario_ventas.model;

import jakarta.persistence.*;

@Entity
@Table(name = "producto")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private Double precioUnitario;
    private Integer stockActual;
    private String proveedor;

    // ✅ Constructor vacío (requerido por JPA)
    public Producto() {}

    // ✅ Constructor con parámetros (opcional)
    public Producto(String nombre, Double precioUnitario, Integer stockActual, String proveedor) {
        this.nombre = nombre;
        this.precioUnitario = precioUnitario;
        this.stockActual = stockActual;
        this.proveedor = proveedor;
    }

    // ✅ Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Double getPrecioUnitario() {
        return precioUnitario;
    }

    public void setPrecioUnitario(Double precioUnitario) {
        this.precioUnitario = precioUnitario;
    }

    public Integer getStockActual() {
        return stockActual;
    }

    public void setStockActual(Integer stockActual) {
        this.stockActual = stockActual;
    }

    public String getProveedor() {
        return proveedor;
    }

    public void setProveedor(String proveedor) {
        this.proveedor = proveedor;
    }
}