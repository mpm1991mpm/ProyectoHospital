package com.hospital.backend.dtos.Paciente;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnaliticaDTO {
    private Long id;

    @NotNull
    private Boolean realizada;

    @NotNull
    private LocalDate fecha;
}
