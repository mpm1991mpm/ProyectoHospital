package com.hospital.backend.models.Paciente;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entidad que representa un drenaje de un paciente.
 * Un paciente puede tener múltiples drenajes.
 */
@Entity
@Table(name = "drenajes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Drenaje {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoDrenaje tipo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "paciente_id", nullable = false)
    private Paciente paciente;
}
