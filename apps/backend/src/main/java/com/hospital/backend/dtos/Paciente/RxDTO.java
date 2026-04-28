package com.hospital.backend.dtos.Paciente;

import com.hospital.backend.models.Paciente.Tramo;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RxDTO {
    private Long id;

    @NotNull
    private Boolean realizado;

    @NotNull
    private LocalDate fecha;

    @NotNull
    private Tramo tramo;
}
