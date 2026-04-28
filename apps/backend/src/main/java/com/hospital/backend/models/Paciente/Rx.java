package com.hospital.backend.models.Paciente;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * Entidad que representa una radiografía (Rx) de un paciente.
 */
@Entity
@Table(name = "radiografias")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Rx {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Boolean realizado;

    @Column(nullable = false)
    private LocalDate fecha;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Tramo tramo;
}
