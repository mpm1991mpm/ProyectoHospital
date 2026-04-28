package com.hospital.backend.services;

import com.hospital.backend.dtos.Paciente.*;
import com.hospital.backend.models.Habitacion.Habitacion;
import com.hospital.backend.models.Paciente.*;
import com.hospital.backend.repositorys.HabitacionRepository;
import com.hospital.backend.repositorys.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PacienteService {

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private HabitacionRepository habitacionRepository;

    @Transactional(readOnly = true)
    public List<PacienteDTO> findAll() {
        return pacienteRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PacienteDTO findById(Long id) {
        Paciente paciente = pacienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado con id: " + id));
        return toDTO(paciente);
    }

    @Transactional(readOnly = true)
    public List<PacienteDTO> findByHabitacionId(Long habitacionId) {
        return pacienteRepository.findByHabitacionId(habitacionId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public PacienteDTO create(PacienteDTO dto) {
        Habitacion habitacion = habitacionRepository.findById(dto.getHabitacionId())
                .orElseThrow(() -> new RuntimeException("Habitación no encontrada con id: " + dto.getHabitacionId()));

        validarFechaIngreso(dto.getFechaIngreso());
        validarCama(dto.getCama(), habitacion);

        Paciente paciente = toEntity(dto, habitacion);
        Paciente saved = pacienteRepository.save(paciente);
        return toDTO(saved);
    }

    @Transactional
    public PacienteDTO update(Long id, PacienteDTO dto) {
        Paciente paciente = pacienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado con id: " + id));

        Habitacion habitacion = habitacionRepository.findById(dto.getHabitacionId())
                .orElseThrow(() -> new RuntimeException("Habitación no encontrada con id: " + dto.getHabitacionId()));

        validarFechaIngreso(dto.getFechaIngreso());
        validarCama(dto.getCama(), habitacion);

        updatePacienteFromDTO(paciente, dto, habitacion);
        Paciente updated = pacienteRepository.save(paciente);
        return toDTO(updated);
    }

    @Transactional
    public void delete(Long id) {
        if (!pacienteRepository.existsById(id)) {
            throw new RuntimeException("Paciente no encontrado con id: " + id);
        }
        pacienteRepository.deleteById(id);
    }

    private PacienteDTO toDTO(Paciente paciente) {
        PacienteDTO dto = new PacienteDTO();
        dto.setId(paciente.getId());
        dto.setNombre(paciente.getNombre());
        dto.setDiagnostico(paciente.getDiagnostico());
        dto.setUnidad(paciente.getUnidad());
        dto.setAlta(paciente.getAlta());
        dto.setAmbulancia(paciente.getAmbulancia());
        dto.setObservaciones(paciente.getObservaciones());
        dto.setFechaIQ(paciente.getFechaIQ());
        dto.setFechaIngreso(paciente.getFechaIngreso());
        dto.setAlergias(paciente.getAlergias());
        dto.setColorMarca(paciente.getColorMarca());
        dto.setRevisado(paciente.getRevisado());
        dto.setCama(paciente.getCama());
        dto.setHabitacionId(paciente.getHabitacion().getId());

        if (paciente.getPreanestesia() != null) {
            dto.setPreanestesia(toPreanestesiaDTO(paciente.getPreanestesia()));
        }

        if (paciente.getRx() != null) {
            dto.setRx(toRxDTO(paciente.getRx()));
        }

        if (paciente.getSv() != null) {
            dto.setSv(toSVDTO(paciente.getSv()));
        }

        dto.setAccesosVenosos(paciente.getAccesosVenosos().stream()
                .map(this::toAccesoVenosoDTO)
                .collect(Collectors.toList()));

        dto.setDrenajes(paciente.getDrenajes().stream()
                .map(this::toDrenajeDTO)
                .collect(Collectors.toList()));

        dto.setAnaliticas(paciente.getAnaliticas().stream()
                .map(this::toAnaliticaDTO)
                .collect(Collectors.toList()));

        dto.setCuras(paciente.getCuras().stream()
                .map(this::toCuraDTO)
                .collect(Collectors.toList()));

        dto.setPruebas(paciente.getPruebas().stream()
                .map(this::toPruebaDTO)
                .collect(Collectors.toList()));

        Habitacion hab = paciente.getHabitacion();
        PacienteDTO.HabitacionBasicDTO habitacionDTO = new PacienteDTO.HabitacionBasicDTO(
                hab.getId(),
                hab.getNombre(),
                hab.getPlanta()
        );
        dto.setHabitacion(habitacionDTO);

        return dto;
    }

    private Paciente toEntity(PacienteDTO dto, Habitacion habitacion) {
        Paciente paciente = new Paciente();
        updatePacienteFromDTO(paciente, dto, habitacion);
        return paciente;
    }

    private void updatePacienteFromDTO(Paciente paciente, PacienteDTO dto, Habitacion habitacion) {
        paciente.setNombre(dto.getNombre());
        paciente.setDiagnostico(dto.getDiagnostico());
        paciente.setUnidad(dto.getUnidad());
        paciente.setAlta(dto.getAlta());
        paciente.setAmbulancia(dto.getAmbulancia());
        paciente.setObservaciones(dto.getObservaciones());
        paciente.setFechaIQ(dto.getFechaIQ());
        paciente.setFechaIngreso(dto.getFechaIngreso());
        paciente.setAlergias(dto.getAlergias());
        paciente.setColorMarca(dto.getColorMarca());
        paciente.setRevisado(dto.getRevisado());
        paciente.setCama(dto.getCama());
        paciente.setHabitacion(habitacion);

        if (dto.getPreanestesia() != null) {
            Preanestesia preanestesia = toPreanestesiaEntity(dto.getPreanestesia());
            paciente.setPreanestesia(preanestesia);
        } else {
            paciente.setPreanestesia(null);
        }

        if (dto.getRx() != null) {
            Rx rx = toRxEntity(dto.getRx());
            paciente.setRx(rx);
        } else {
            paciente.setRx(null);
        }

        if (dto.getSv() != null) {
            SV sv = toSVEntity(dto.getSv());
            paciente.setSv(sv);
        } else {
            paciente.setSv(null);
        }

        paciente.getAccesosVenosos().clear();
        if (dto.getAccesosVenosos() != null) {
            for (AccesoVenosoDTO avDto : dto.getAccesosVenosos()) {
                AccesoVenoso av = toAccesoVenosoEntity(avDto);
                av.setPaciente(paciente);
                paciente.getAccesosVenosos().add(av);
            }
        }

        paciente.getDrenajes().clear();
        if (dto.getDrenajes() != null) {
            for (DrenajeDTO dDto : dto.getDrenajes()) {
                Drenaje d = toDrenajeEntity(dDto);
                d.setPaciente(paciente);
                paciente.getDrenajes().add(d);
            }
        }

        paciente.getAnaliticas().clear();
        if (dto.getAnaliticas() != null) {
            for (AnaliticaDTO aDto : dto.getAnaliticas()) {
                Analitica a = toAnaliticaEntity(aDto);
                a.setPaciente(paciente);
                paciente.getAnaliticas().add(a);
            }
        }

        paciente.getCuras().clear();
        if (dto.getCuras() != null) {
            for (CuraDTO cDto : dto.getCuras()) {
                Cura c = toCuraEntity(cDto);
                c.setPaciente(paciente);
                paciente.getCuras().add(c);
            }
        }

        paciente.getPruebas().clear();
        if (dto.getPruebas() != null) {
            for (PruebaDTO pDto : dto.getPruebas()) {
                Prueba p = toPruebaEntity(pDto);
                p.setPaciente(paciente);
                paciente.getPruebas().add(p);
            }
        }
    }

    private PreanestesiaDTO toPreanestesiaDTO(Preanestesia p) {
        return new PreanestesiaDTO(p.getId(), p.getTipaje(), p.getFecha(), p.getPremedicacion());
    }

    private Preanestesia toPreanestesiaEntity(PreanestesiaDTO dto) {
        return new Preanestesia(dto.getId(), dto.getTipaje(), dto.getFecha(), dto.getPremedicacion());
    }

    private RxDTO toRxDTO(Rx rx) {
        return new RxDTO(rx.getId(), rx.getRealizado(), rx.getFecha(), rx.getTramo());
    }

    private Rx toRxEntity(RxDTO dto) {
        return new Rx(dto.getId(), dto.getRealizado(), dto.getFecha(), dto.getTramo());
    }

    private SVDTO toSVDTO(SV sv) {
        return new SVDTO(sv.getId(), sv.getRealizado(), sv.getFecha());
    }

    private SV toSVEntity(SVDTO dto) {
        return new SV(dto.getId(), dto.getRealizado(), dto.getFecha());
    }

    private AccesoVenosoDTO toAccesoVenosoDTO(AccesoVenoso av) {
        return new AccesoVenosoDTO(av.getId(), av.getTipo(), av.getFecha());
    }

    private AccesoVenoso toAccesoVenosoEntity(AccesoVenosoDTO dto) {
        return new AccesoVenoso(dto.getId(), dto.getTipo(), dto.getFecha(), null);
    }

    private DrenajeDTO toDrenajeDTO(Drenaje d) {
        return new DrenajeDTO(d.getId(), d.getTipo());
    }

    private Drenaje toDrenajeEntity(DrenajeDTO dto) {
        return new Drenaje(dto.getId(), dto.getTipo(), null);
    }

    private AnaliticaDTO toAnaliticaDTO(Analitica a) {
        return new AnaliticaDTO(a.getId(), a.getRealizada(), a.getFecha());
    }

    private Analitica toAnaliticaEntity(AnaliticaDTO dto) {
        return new Analitica(dto.getId(), dto.getRealizada(), dto.getFecha(), null);
    }

    private CuraDTO toCuraDTO(Cura c) {
        return new CuraDTO(c.getId(), c.getNombre(), c.getObservaciones(), c.getFecha());
    }

    private Cura toCuraEntity(CuraDTO dto) {
        return new Cura(dto.getId(), dto.getNombre(), dto.getObservaciones(), dto.getFecha(), null);
    }

    private PruebaDTO toPruebaDTO(Prueba p) {
        return new PruebaDTO(p.getId(), p.getNombre(), p.getObservaciones(), p.getFecha());
    }

    private Prueba toPruebaEntity(PruebaDTO dto) {
        return new Prueba(dto.getId(), dto.getNombre(), dto.getObservaciones(), dto.getFecha(), null);
    }

    private void validarCama(Integer cama, Habitacion habitacion) {
        if (cama == null) {
            throw new RuntimeException("El número de cama es obligatorio");
        }

        if (habitacion.getCapacidad() == com.hospital.backend.models.Habitacion.Capacidad.INDIVIDUAL) {
            if (cama != 1) {
                throw new RuntimeException("Las habitaciones individuales solo pueden tener cama número 1");
            }
        } else if (habitacion.getCapacidad() == com.hospital.backend.models.Habitacion.Capacidad.DOBLE) {
            if (cama != 1 && cama != 2) {
                throw new RuntimeException("Las habitaciones dobles solo pueden tener cama número 1 o 2");
            }
        }
    }

    private void validarFechaIngreso(LocalDate fechaIngreso) {
        if (fechaIngreso == null) {
            throw new RuntimeException("La fecha de ingreso es obligatoria");
        }
    }
}
