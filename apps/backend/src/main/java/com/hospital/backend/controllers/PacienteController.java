package com.hospital.backend.controllers;

import com.hospital.backend.dtos.PacienteDTO;
import com.hospital.backend.services.PacienteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para la gestión de pacientes.
 * Expone endpoints HTTP para operaciones CRUD sobre pacientes.
 * Incluye endpoint adicional para filtrar pacientes por habitación.
 */
@RestController
@RequestMapping("/api/pacientes")
public class PacienteController {

    @Autowired
    private PacienteService pacienteService;

    /**
     * Obtiene el listado completo de pacientes.
     * GET /api/pacientes
     *
     * @return ResponseEntity con lista de pacientes y código 200 OK
     */
    @GetMapping
    public ResponseEntity<List<PacienteDTO>> getAll() {
        return ResponseEntity.ok(pacienteService.findAll());
    }

    /**
     * Obtiene un paciente específico por su ID.
     * GET /api/pacientes/{id}
     *
     * @param id Identificador del paciente
     * @return ResponseEntity con el paciente encontrado y código 200 OK
     */
    @GetMapping("/{id}")
    public ResponseEntity<PacienteDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(pacienteService.findById(id));
    }

    /**
     * Obtiene todos los pacientes asignados a una habitación específica.
     * GET /api/pacientes/habitacion/{habitacionId}
     *
     * @param habitacionId ID de la habitación
     * @return ResponseEntity con lista de pacientes de la habitación y código 200 OK
     */
    @GetMapping("/habitacion/{habitacionId}")
    public ResponseEntity<List<PacienteDTO>> getByHabitacion(@PathVariable Long habitacionId) {
        return ResponseEntity.ok(pacienteService.findByHabitacionId(habitacionId));
    }

    /**
     * Crea un nuevo paciente.
     * POST /api/pacientes
     * El DTO recibido es validado automáticamente por @Valid.
     * Valida que la habitación asignada exista.
     *
     * @param dto Datos del nuevo paciente
     * @return ResponseEntity con el paciente creado y código 201 CREATED
     */
    @PostMapping
    public ResponseEntity<PacienteDTO> create(@Valid @RequestBody PacienteDTO dto) {
        PacienteDTO created = pacienteService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    /**
     * Actualiza un paciente existente.
     * PUT /api/pacientes/{id}
     * El DTO recibido es validado automáticamente por @Valid.
     * Permite cambiar la habitación asignada.
     *
     * @param id ID del paciente a actualizar
     * @param dto Nuevos datos del paciente
     * @return ResponseEntity con el paciente actualizado y código 200 OK
     */
    @PutMapping("/{id}")
    public ResponseEntity<PacienteDTO> update(@PathVariable Long id, @Valid @RequestBody PacienteDTO dto) {
        return ResponseEntity.ok(pacienteService.update(id, dto));
    }

    /**
     * Elimina un paciente del sistema.
     * DELETE /api/pacientes/{id}
     *
     * @param id ID del paciente a eliminar
     * @return ResponseEntity vacío con código 204 NO CONTENT
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        pacienteService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
