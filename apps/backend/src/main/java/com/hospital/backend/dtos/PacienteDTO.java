package com.hospital.backend.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO (Data Transfer Object) para transferir datos de Paciente entre capas.
 * Se utiliza para exponer datos en la API REST sin exponer la entidad JPA directamente.
 * Incluye tanto el ID de la habitación como sus datos básicos para mostrar en el frontend.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PacienteDTO {

    /**
     * Identificador único del paciente.
     * Null al crear, presente al leer/actualizar.
     */
    private Long id;

    /**
     * Nombre completo del paciente.
     * Validación: no puede estar vacío ni ser solo espacios en blanco.
     */
    @NotBlank(message = "El nombre del paciente es obligatorio")
    private String nombre;

    /**
     * Observaciones médicas o notas sobre el paciente.
     * Campo opcional, sin validaciones.
     */
    private String observaciones;

    /**
     * ID de la habitación a la que está asignado el paciente.
     * Validación: no puede ser null, todo paciente debe tener habitación.
     */
    @NotNull(message = "La habitación es obligatoria")
    private Long habitacionId;

    /**
     * Datos básicos de la habitación asignada.
     * Solo se incluye en las respuestas GET, no en las peticiones POST/PUT.
     */
    private HabitacionBasicDTO habitacion;

    /**
     * DTO interno para datos básicos de habitación.
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class HabitacionBasicDTO {
        private Long id;
        private String numero;
        private String planta;
    }
}
