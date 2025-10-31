package com.example.inventario_ventas.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "pedido")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombreComprador;
    private LocalDateTime fecha;
    private Double totalFinal;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL)
    private List<DetallePedido> detalles;

    public Pedido() {
        this.fecha = LocalDateTime.now();
    }

    public Pedido(String nombreComprador) {
        this.nombreComprador = nombreComprador;
        this.fecha = LocalDateTime.now();
    }

    // Getters y setters
    public Long getId() { return id; }
    public String getNombreComprador() { return nombreComprador; }
    public void setNombreComprador(String nombreComprador) { this.nombreComprador = nombreComprador; }
    public LocalDateTime getFecha() { return fecha; }
    public Double getTotalFinal() { return totalFinal; }
    public void setTotalFinal(Double totalFinal) { this.totalFinal = totalFinal; }
    public List<DetallePedido> getDetalles() { return detalles; }
    public void setDetalles(List<DetallePedido> detalles) { this.detalles = detalles; }
}
