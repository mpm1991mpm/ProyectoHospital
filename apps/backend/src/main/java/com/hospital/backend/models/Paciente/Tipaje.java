package com.hospital.backend.models.Paciente;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * Entidad que representa un tipaje de un paciente.
 * Un paciente puede tener multiples tipajes.
 */
@Entity
@Table(name = "tipajes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tipaje {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate fecha;

    @Column(length = 1000)
    private String observaciones;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "paciente_id", nullable = false)
    private Paciente paciente;
}
