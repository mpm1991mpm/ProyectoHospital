package com.hospital.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entidad que representa un paciente del hospital.
 * Cada paciente está asignado a una habitación específica.
 */
@Entity
@Table(name = "pacientes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Paciente {

    /**
     * Identificador único del paciente.
     * Se genera automáticamente mediante estrategia de identidad.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Nombre completo del paciente.
     * Campo obligatorio.
     */
    @NotNull
    @Column(nullable = false)
    private String nombre;

    /**
     * Observaciones médicas o notas sobre el paciente.
     * Campo opcional con un máximo de 500 caracteres.
     */
    @Column(length = 500)
    private String observaciones;

    /**
     * Habitación a la que está asignado el paciente.
     * Relación muchos a uno con la entidad Habitacion.
     * FetchType.LAZY: la habitación se carga solo cuando se accede a ella.
     * Campo obligatorio: todo paciente debe estar en una habitación.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "habitacion_id", nullable = false)
    @NotNull
    private Habitacion habitacion;
}
