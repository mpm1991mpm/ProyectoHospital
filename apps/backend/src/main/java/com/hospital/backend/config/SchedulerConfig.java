package com.hospital.backend.config;

import com.hospital.backend.repositorys.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.transaction.annotation.Transactional;

/**
 * Configuración de tareas programadas.
 * Ejecuta tareas automáticas en intervalos definidos.
 */
@Configuration
@EnableScheduling
public class SchedulerConfig {

    @Autowired
    private PacienteRepository pacienteRepository;

    /**
     * Resetea el campo 'revisado' de todos los pacientes a false cada día a las 00:00.
     * Cron expression: "0 0 0 * * *" = segundo 0, minuto 0, hora 0, todos los días
     */
    @Scheduled(cron = "0 0 0 * * *")
    @Transactional
    public void resetRevisadoDiario() {
        pacienteRepository.findAll().forEach(paciente -> {
            paciente.setRevisado(false);
            pacienteRepository.save(paciente);
        });
    }
}
