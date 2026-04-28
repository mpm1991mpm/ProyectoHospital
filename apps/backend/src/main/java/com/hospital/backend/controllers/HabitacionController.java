package com.hospital.backend.controllers;

import com.hospital.backend.dtos.Habitacion.HabitacionDTO;
import com.hospital.backend.services.HabitacionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para la gestión de habitaciones.
 * Expone endpoints HTTP para operaciones CRUD sobre habitaciones.
 * Todas las respuestas utilizan DTOs en lugar de entidades JPA.
 */
@RestController
@RequestMapping("/api/habitaciones")
public class HabitacionController {

    @Autowired
    private HabitacionService habitacionService;

    /**
     * Obtiene el listado completo de habitaciones.
     * GET /api/habitaciones
     *
     * @return ResponseEntity con lista de habitaciones y código 200 OK
     */
    @GetMapping
    public ResponseEntity<List<HabitacionDTO>> getAll() {
        return ResponseEntity.ok(habitacionService.findAll());
    }

    /**
     * Obtiene una habitación específica por su ID.
     * GET /api/habitaciones/{id}
     *
     * @param id Identificador de la habitación
     * @return ResponseEntity con la habitación encontrada y código 200 OK
     */
    @GetMapping("/{id}")
    public ResponseEntity<HabitacionDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(habitacionService.findById(id));
    }

    /**
     * Crea una nueva habitación.
     * POST /api/habitaciones
     * El DTO recibido es validado automáticamente por @Valid.
     *
     * @param dto Datos de la nueva habitación
     * @return ResponseEntity con la habitación creada y código 201 CREATED
     */
    @PostMapping
    public ResponseEntity<HabitacionDTO> create(@Valid @RequestBody HabitacionDTO dto) {
        HabitacionDTO created = habitacionService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    /**
     * Actualiza una habitación existente.
     * PUT /api/habitaciones/{id}
     * El DTO recibido es validado automáticamente por @Valid.
     *
     * @param id ID de la habitación a actualizar
     * @param dto Nuevos datos de la habitación
     * @return ResponseEntity con la habitación actualizada y código 200 OK
     */
    @PutMapping("/{id}")
    public ResponseEntity<HabitacionDTO> update(@PathVariable Long id, @Valid @RequestBody HabitacionDTO dto) {
        return ResponseEntity.ok(habitacionService.update(id, dto));
    }

    /**
     * Elimina una habitación del sistema.
     * DELETE /api/habitaciones/{id}
     *
     * @param id ID de la habitación a eliminar
     * @return ResponseEntity vacío con código 204 NO CONTENT
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        habitacionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
