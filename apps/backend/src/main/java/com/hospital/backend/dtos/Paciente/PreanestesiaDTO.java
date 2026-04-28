package com.hospital.backend.dtos.Paciente;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PreanestesiaDTO {
    private Long id;

    @NotNull
    private Boolean tipaje;

    @NotNull
    private LocalDate fecha;

    private String premedicacion;
}
