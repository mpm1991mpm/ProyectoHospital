package com.hospital.backend.dtos.Paciente;

import com.hospital.backend.models.Paciente.Unidad;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO principal para transferir datos de Paciente.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PacienteDTO {

    private Long id;

    @NotBlank(message = "El nombre del paciente es obligatorio")
    private String nombre;

    @NotBlank(message = "El diagnostico es obligatorio")
    private String diagnostico;

    @NotNull(message = "La unidad es obligatoria")
    private Unidad unidad;

    @NotNull(message = "El campo alta es obligatorio")
    private Boolean alta;

    private Boolean ambulancia;

    private PreanestesiaDTO preanestesia;

    private List<AccesoVenosoDTO> accesosVenosos;

    private List<DrenajeDTO> drenajes;

    private RxDTO rx;

    private SVDTO sv;

    private String observaciones;

    private LocalDateTime fechaIQ;

    @NotNull(message = "La fecha de ingreso es obligatoria")
    private LocalDate fechaIngreso;

    private List<AnaliticaDTO> analiticas;

    private List<CuraDTO> curas;

    private List<PruebaDTO> pruebas;

    private List<TipajeDTO> tipajes;

    private String alergias;

    private String colorMarca;

    @NotNull
    private Boolean revisado;

    @NotNull(message = "El número de cama es obligatorio")
    private Integer cama;

    @NotNull(message = "La habitación es obligatoria")
    private Long habitacionId;

    private HabitacionBasicDTO habitacion;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class HabitacionBasicDTO {
        private Long id;
        private String nombre;
        private String planta;
    }
}
