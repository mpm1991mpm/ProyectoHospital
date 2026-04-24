package com.hospital.backend.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO (Data Transfer Object) para transferir datos de Habitacion entre capas.
 * Se utiliza para exponer datos en la API REST sin exponer la entidad JPA directamente.
 * Incluye validaciones para garantizar la integridad de los datos recibidos.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HabitacionDTO {

    /**
     * Identificador único de la habitación.
     * Null al crear, presente al leer/actualizar.
     */
    private Long id;

    /**
     * Número de la habitación.
     * Validación: no puede estar vacío ni ser solo espacios en blanco.
     */
    @NotBlank(message = "El número de habitación es obligatorio")
    private String numero;

    /**
     * Planta donde se encuentra la habitación.
     * Validación: no puede estar vacío ni ser solo espacios en blanco.
     */
    @NotBlank(message = "La planta es obligatoria")
    private String planta;

    /**
     * Observaciones adicionales sobre la habitación.
     * Campo opcional, sin validaciones.
     */
    private String observaciones;
}
