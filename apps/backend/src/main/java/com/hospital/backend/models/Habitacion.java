package com.hospital.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/**
 * Entidad que representa una habitación del hospital.
 * Contiene información básica de la habitación y su relación con los pacientes asignados.
 */
@Entity
@Table(name = "habitaciones")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Habitacion {

    /**
     * Identificador único de la habitación.
     * Se genera automáticamente mediante estrategia de identidad.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Número de la habitación.
     * Campo obligatorio que identifica la habitación dentro del hospital.
     */
    @NotNull
    @Column(nullable = false)
    private String numero;

    /**
     * Planta donde se encuentra la habitación.
     * Campo obligatorio para ubicar físicamente la habitación.
     */
    @NotNull
    @Column(nullable = false)
    private String planta;

    /**
     * Observaciones adicionales sobre la habitación.
     * Campo opcional con un máximo de 500 caracteres.
     */
    @Column(length = 500)
    private String observaciones;

    /**
     * Lista de pacientes asignados a esta habitación.
     * Relación uno a muchos con la entidad Paciente.
     * Cascade ALL: las operaciones en la habitación se propagan a los pacientes.
     * orphanRemoval: si un paciente se elimina de la lista, se borra de la BD.
     */
    @OneToMany(mappedBy = "habitacion", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Paciente> pacientes = new ArrayList<>();
}
