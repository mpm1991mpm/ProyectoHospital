package com.hospital.backend.dtos.Paciente;

import com.hospital.backend.models.Paciente.TipoAccesoVenoso;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccesoVenosoDTO {
    private Long id;

    @NotNull
    private TipoAccesoVenoso tipo;

    @NotNull
    private LocalDate fecha;
}
