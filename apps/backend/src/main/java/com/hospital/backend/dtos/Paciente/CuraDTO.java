package com.hospital.backend.dtos.Paciente;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CuraDTO {
    private Long id;

    @NotBlank
    private String nombre;

    private String observaciones;

    @NotNull
    private LocalDate fecha;
}
