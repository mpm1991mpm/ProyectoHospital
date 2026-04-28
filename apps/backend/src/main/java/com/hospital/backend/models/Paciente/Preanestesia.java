package com.hospital.backend.models.Paciente;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * Entidad que representa la información de preanestesia de un paciente.
 */
@Entity
@Table(name = "preanestesias")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Preanestesia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Boolean tipaje;

    @Column(nullable = false)
    private LocalDate fecha;

    @Column(length = 500)
    private String premedicacion;
}
