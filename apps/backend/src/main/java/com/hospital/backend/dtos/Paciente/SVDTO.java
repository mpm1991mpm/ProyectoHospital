package com.hospital.backend.dtos.Paciente;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SVDTO {
    private Long id;

    @NotNull
    private Boolean realizado;

    @NotNull
    private LocalDate fecha;
}
