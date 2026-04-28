package com.hospital.backend.models.Paciente;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * Entidad que representa signos vitales (SV) de un paciente.
 */
@Entity
@Table(name = "signos_vitales")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SV {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Boolean realizado;

    @Column(nullable = false)
    private LocalDate fecha;
}
