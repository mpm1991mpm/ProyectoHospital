package com.hospital.backend.dtos.Paciente;

import com.hospital.backend.models.Paciente.TipoDrenaje;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DrenajeDTO {
    private Long id;

    @NotNull
    private TipoDrenaje tipo;
}
