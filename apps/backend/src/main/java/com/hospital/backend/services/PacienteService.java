package com.hospital.backend.services;

import com.hospital.backend.dtos.PacienteDTO;
import com.hospital.backend.models.Habitacion;
import com.hospital.backend.models.Paciente;
import com.hospital.backend.repositorys.HabitacionRepository;
import com.hospital.backend.repositorys.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio que contiene la lógica de negocio para la gestión de pacientes.
 * Actúa como capa intermedia entre el controlador y el repositorio.
 * Maneja conversiones entre entidades JPA y DTOs, y valida la relación con habitaciones.
 */
@Service
public class PacienteService {

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private HabitacionRepository habitacionRepository;

    /**
     * Obtiene todos los pacientes del sistema.
     * Transacción de solo lectura para optimizar el rendimiento.
     *
     * @return Lista de DTOs con todos los pacientes
     */
    @Transactional(readOnly = true)
    public List<PacienteDTO> findAll() {
        return pacienteRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Busca un paciente por su ID.
     *
     * @param id Identificador del paciente
     * @return DTO del paciente encontrado
     * @throws RuntimeException si no se encuentra el paciente
     */
    @Transactional(readOnly = true)
    public PacienteDTO findById(Long id) {
        Paciente paciente = pacienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado con id: " + id));
        return toDTO(paciente);
    }

    /**
     * Busca todos los pacientes asignados a una habitación específica.
     *
     * @param habitacionId ID de la habitación
     * @return Lista de DTOs de pacientes en la habitación
     */
    @Transactional(readOnly = true)
    public List<PacienteDTO> findByHabitacionId(Long habitacionId) {
        return pacienteRepository.findByHabitacionId(habitacionId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Crea un nuevo paciente en el sistema.
     * Valida que la habitación asignada exista antes de crear el paciente.
     *
     * @param dto DTO con los datos del nuevo paciente
     * @return DTO del paciente creado con su ID generado
     * @throws RuntimeException si la habitación especificada no existe
     */
    @Transactional
    public PacienteDTO create(PacienteDTO dto) {
        Habitacion habitacion = habitacionRepository.findById(dto.getHabitacionId())
                .orElseThrow(() -> new RuntimeException("Habitación no encontrada con id: " + dto.getHabitacionId()));

        Paciente paciente = toEntity(dto, habitacion);
        Paciente saved = pacienteRepository.save(paciente);
        return toDTO(saved);
    }

    /**
     * Actualiza los datos de un paciente existente.
     * Valida que tanto el paciente como la nueva habitación existan.
     *
     * @param id ID del paciente a actualizar
     * @param dto DTO con los nuevos datos
     * @return DTO del paciente actualizado
     * @throws RuntimeException si no se encuentra el paciente o la habitación
     */
    @Transactional
    public PacienteDTO update(Long id, PacienteDTO dto) {
        Paciente paciente = pacienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado con id: " + id));

        Habitacion habitacion = habitacionRepository.findById(dto.getHabitacionId())
                .orElseThrow(() -> new RuntimeException("Habitación no encontrada con id: " + dto.getHabitacionId()));

        paciente.setNombre(dto.getNombre());
        paciente.setObservaciones(dto.getObservaciones());
        paciente.setHabitacion(habitacion);

        Paciente updated = pacienteRepository.save(paciente);
        return toDTO(updated);
    }

    /**
     * Elimina un paciente del sistema.
     *
     * @param id ID del paciente a eliminar
     * @throws RuntimeException si no se encuentra el paciente
     */
    @Transactional
    public void delete(Long id) {
        if (!pacienteRepository.existsById(id)) {
            throw new RuntimeException("Paciente no encontrado con id: " + id);
        }
        pacienteRepository.deleteById(id);
    }

    /**
     * Convierte una entidad Paciente a su DTO correspondiente.
     * Extrae solo el ID de la habitación para evitar cargar toda la entidad.
     *
     * @param paciente Entidad a convertir
     * @return DTO con los datos del paciente
     */
    private PacienteDTO toDTO(Paciente paciente) {
        PacienteDTO dto = new PacienteDTO();
        dto.setId(paciente.getId());
        dto.setNombre(paciente.getNombre());
        dto.setObservaciones(paciente.getObservaciones());
        dto.setHabitacionId(paciente.getHabitacion().getId());

        // Incluir datos básicos de la habitación
        Habitacion hab = paciente.getHabitacion();
        PacienteDTO.HabitacionBasicDTO habitacionDTO = new PacienteDTO.HabitacionBasicDTO(
                hab.getId(),
                hab.getNumero(),
                hab.getPlanta()
        );
        dto.setHabitacion(habitacionDTO);

        return dto;
    }

    /**
     * Convierte un DTO a una entidad Paciente.
     * Utilizado para crear nuevos pacientes.
     *
     * @param dto DTO con los datos
     * @param habitacion Entidad Habitacion ya cargada
     * @return Nueva entidad Paciente
     */
    private Paciente toEntity(PacienteDTO dto, Habitacion habitacion) {
        Paciente paciente = new Paciente();
        paciente.setNombre(dto.getNombre());
        paciente.setObservaciones(dto.getObservaciones());
        paciente.setHabitacion(habitacion);
        return paciente;
    }
}
