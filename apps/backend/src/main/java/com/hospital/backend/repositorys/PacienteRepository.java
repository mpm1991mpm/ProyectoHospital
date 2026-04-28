package com.hospital.backend.repositorys;

import com.hospital.backend.models.Paciente.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio para la gestión de persistencia de Paciente.
 * Extiende JpaRepository para heredar operaciones CRUD básicas.
 * Incluye consultas personalizadas para búsquedas específicas.
 */
@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {

    /**
     * Busca todos los pacientes asignados a una habitación específica.
     * Spring Data JPA genera automáticamente la consulta basándose en el nombre del método.
     *
     * @param habitacionId ID de la habitación
     * @return Lista de pacientes en la habitación especificada
     */
    List<Paciente> findByHabitacionId(Long habitacionId);
}
