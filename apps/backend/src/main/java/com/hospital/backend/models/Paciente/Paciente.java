package com.hospital.backend.models.Paciente;

import com.hospital.backend.models.Habitacion.Habitacion;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Entidad que representa un paciente del hospital.
 */
@Entity
@Table(name = "pacientes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Paciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(nullable = false)
    private String nombre;

    @NotNull
    @Column(nullable = false, length = 1000)
    private String diagnostico;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Unidad unidad;

    @NotNull
    @Column(nullable = false)
    private Boolean alta;

    @Column
    private Boolean ambulancia;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "preanestesia_id")
    private Preanestesia preanestesia;

    @OneToMany(mappedBy = "paciente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AccesoVenoso> accesosVenosos = new ArrayList<>();

    @OneToMany(mappedBy = "paciente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Drenaje> drenajes = new ArrayList<>();

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "rx_id")
    private Rx rx;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "sv_id")
    private SV sv;

    @Column(length = 1000)
    private String observaciones;

    @Column
    private LocalDateTime fechaIQ;

    @NotNull
    @Column(name = "fecha_ingreso", nullable = false)
    private LocalDate fechaIngreso;

    @OneToMany(mappedBy = "paciente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Analitica> analiticas = new ArrayList<>();

    @OneToMany(mappedBy = "paciente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Cura> curas = new ArrayList<>();

    @OneToMany(mappedBy = "paciente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Prueba> pruebas = new ArrayList<>();

    @OneToMany(mappedBy = "paciente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Tipaje> tipajes = new ArrayList<>();

    @Column(length = 500)
    private String alergias;

    @Column(name = "color_marca", length = 20)
    private String colorMarca;

    @NotNull
    @Column(nullable = false)
    private Boolean revisado = false;

    @NotNull
    @Column(nullable = false)
    private Integer cama;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "habitacion_id", nullable = false)
    @NotNull
    private Habitacion habitacion;
}
