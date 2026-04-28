package com.hospital.backend.services;

import com.hospital.backend.dtos.Habitacion.HabitacionDTO;
import com.hospital.backend.models.Habitacion.Habitacion;
import com.hospital.backend.repositorys.HabitacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio que contiene la lógica de negocio para la gestión de habitaciones.
 * Actúa como capa intermedia entre el controlador y el repositorio.
 * Maneja conversiones entre entidades JPA y DTOs.
 */
@Service
public class HabitacionService {

    @Autowired
    private HabitacionRepository habitacionRepository;

    /**
     * Obtiene todas las habitaciones del sistema.
     * Transacción de solo lectura para optimizar el rendimiento.
     *
     * @return Lista de DTOs con todas las habitaciones
     */
    @Transactional(readOnly = true)
    public List<HabitacionDTO> findAll() {
        return habitacionRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Busca una habitación por su ID.
     *
     * @param id Identificador de la habitación
     * @return DTO de la habitación encontrada
     * @throws RuntimeException si no se encuentra la habitación
     */
    @Transactional(readOnly = true)
    public HabitacionDTO findById(Long id) {
        Habitacion habitacion = habitacionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Habitación no encontrada con id: " + id));
        return toDTO(habitacion);
    }

    /**
     * Crea una nueva habitación en el sistema.
     *
     * @param dto DTO con los datos de la nueva habitación
     * @return DTO de la habitación creada con su ID generado
     */
    @Transactional
    public HabitacionDTO create(HabitacionDTO dto) {
        Habitacion habitacion = toEntity(dto);
        Habitacion saved = habitacionRepository.save(habitacion);
        return toDTO(saved);
    }

    /**
     * Actualiza los datos de una habitación existente.
     *
     * @param id ID de la habitación a actualizar
     * @param dto DTO con los nuevos datos
     * @return DTO de la habitación actualizada
     * @throws RuntimeException si no se encuentra la habitación
     */
    @Transactional
    public HabitacionDTO update(Long id, HabitacionDTO dto) {
        Habitacion habitacion = habitacionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Habitación no encontrada con id: " + id));

        habitacion.setNombre(dto.getNombre());
        habitacion.setPlanta(dto.getPlanta());
        habitacion.setCapacidad(dto.getCapacidad());
        habitacion.setObservaciones(dto.getObservaciones());

        Habitacion updated = habitacionRepository.save(habitacion);
        return toDTO(updated);
    }

    /**
     * Elimina una habitación del sistema.
     *
     * @param id ID de la habitación a eliminar
     * @throws RuntimeException si no se encuentra la habitación
     */
    @Transactional
    public void delete(Long id) {
        if (!habitacionRepository.existsById(id)) {
            throw new RuntimeException("Habitación no encontrada con id: " + id);
        }
        habitacionRepository.deleteById(id);
    }

    /**
     * Convierte una entidad Habitacion a su DTO correspondiente.
     *
     * @param habitacion Entidad a convertir
     * @return DTO con los datos de la habitación
     */
    private HabitacionDTO toDTO(Habitacion habitacion) {
        return new HabitacionDTO(
                habitacion.getId(),
                habitacion.getNombre(),
                habitacion.getPlanta(),
                habitacion.getCapacidad(),
                habitacion.getObservaciones()
        );
    }

    /**
     * Convierte un DTO a una entidad Habitacion.
     * Utilizado para crear nuevas habitaciones.
     *
     * @param dto DTO con los datos
     * @return Nueva entidad Habitacion
     */
    private Habitacion toEntity(HabitacionDTO dto) {
        Habitacion habitacion = new Habitacion();
        habitacion.setNombre(dto.getNombre());
        habitacion.setPlanta(dto.getPlanta());
        habitacion.setCapacidad(dto.getCapacidad());
        habitacion.setObservaciones(dto.getObservaciones());
        return habitacion;
    }
}
