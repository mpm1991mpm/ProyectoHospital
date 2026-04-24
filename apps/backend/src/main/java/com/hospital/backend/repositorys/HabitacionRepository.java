package com.hospital.backend.repositorys;

import com.hospital.backend.models.Habitacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositorio para la gestión de persistencia de Habitacion.
 * Extiende JpaRepository para heredar operaciones CRUD básicas.
 * Spring Data JPA genera automáticamente la implementación en tiempo de ejecución.
 */
@Repository
public interface HabitacionRepository extends JpaRepository<Habitacion, Long> {
    // No requiere métodos adicionales por ahora.
    // JpaRepository ya proporciona: save, findById, findAll, deleteById, etc.
}
