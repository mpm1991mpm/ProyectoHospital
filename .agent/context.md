# ProyectoHospital — Contexto del proyecto para el agente

## Objetivo del proyecto

Este proyecto consiste en desarrollar una aplicación web para gestión básica de pacientes y habitaciones en un entorno sanitario.

El objetivo inicial es construir un MVP sencillo, claro y mantenible que permita:

- gestionar habitaciones
- gestionar pacientes
- asignar cada paciente a una habitación
- permitir que una habitación tenga uno o varios pacientes
- mostrar una interfaz visual moderna, limpia y usable desde escritorio y móvil

Por ahora, el alcance funcional es únicamente un CRUD de:

- Pacientes
- Habitaciones

## Stack tecnológico

### Monorepo
- Nx.dev

### Frontend
- Angular
- Interfaz moderna, responsive y visualmente cuidada
- El diseño debe sentirse limpio, profesional y cómodo de usar
- Priorizar buena UX antes que complejidad visual innecesaria

### Backend
- Spring Boot
- Maven
- API REST

### Base de datos
- MySQL
- Ejecutada en Docker

## Estado actual del proyecto

Actualmente el proyecto ya dispone de:

- monorepo con Nx
- frontend Angular
- backend Spring Boot con Maven
- MySQL en Docker
- conexión del backend con la base de datos funcionando

## Dominio inicial

### Entidades principales

#### Habitacion
Representa una habitación del hospital o centro.

Campos iniciales sugeridos:
- id
- numero
- planta
- observaciones

#### Paciente
Representa un paciente asignado a una habitación.

Campos iniciales sugeridos:
- id
- nombre
- observaciones
- habitacion

## Relación entre entidades

La relación debe ser:

- una habitación puede tener uno o varios pacientes
- un paciente pertenece a una única habitación

Modelo conceptual:

- `Habitacion 1 --- N Paciente`

## Requisitos funcionales del MVP

### CRUD de Habitaciones
Debe permitir:
- crear habitación
- listar habitaciones
- ver detalle de habitación
- editar habitación
- eliminar habitación

### CRUD de Pacientes
Debe permitir:
- crear paciente
- listar pacientes
- ver detalle de paciente
- editar paciente
- eliminar paciente

### Relación Paciente-Habitación
Debe permitirse:
- asignar una habitación a un paciente al crear o editar
- ver los pacientes asociados a una habitación
- mostrar en el listado de pacientes la habitación asignada

## Requisitos de interfaz

La interfaz debe ser visualmente atractiva y moderna.

### Estilo deseado
- diseño limpio
- aspecto profesional
- componentes modernos
- buena separación visual
- responsive
- experiencia cómoda en móvil y escritorio

### Directrices visuales
- no hacer una interfaz recargada
- usar tarjetas, tablas limpias y formularios claros
- jerarquía visual clara
- botones consistentes
- colores suaves y profesionales
- navegación simple

### Pantallas mínimas del MVP
- dashboard o pantalla inicial simple
- listado de habitaciones
- formulario de creación/edición de habitación
- detalle de habitación con pacientes asociados
- listado de pacientes
- formulario de creación/edición de paciente
- detalle de paciente

## Requisitos técnicos backend

### Arquitectura
Usar una estructura clara y mantenible, preferiblemente separando:

- controller
- service
- repository
- entity
- dto
- mapper (si hace falta más adelante)

### API
La API debe seguir estilo REST.

Ejemplos esperados:
- `/api/habitaciones`
- `/api/pacientes`

### Validaciones
Añadir validaciones básicas desde el principio, por ejemplo:
- nombre de paciente obligatorio
- apellidos obligatorios
- habitación obligatoria para paciente
- número de habitación obligatorio

### Persistencia
Usar JPA/Hibernate.

## Requisitos técnicos frontend

### Angular
Generar una estructura ordenada por funcionalidades.

Ejemplo orientativo:
- features/habitaciones
- features/pacientes
- shared
- core

### Buenas prácticas
- componentes reutilizables cuando tenga sentido
- servicios para llamadas HTTP
- tipado claro
- formularios reactivos
- separación entre lógica y presentación

## Qué debe priorizar el agente

Cuando genere código, priorizar lo siguiente:

1. claridad
2. mantenibilidad
3. simplicidad
4. coherencia con el stack elegido
5. UX limpia y moderna

## Qué NO debe hacer el agente

- no sobreingenierizar
- no añadir autenticación todavía
- no añadir microservicios
- no meter librerías innecesarias
- no complicar el diseño con patrones excesivos
- no inventar más entidades de dominio aún
- no introducir lógica hospitalaria avanzada en esta fase

## Alcance actual

En esta fase SOLO se quiere construir:

- modelo Habitacion
- modelo Paciente
- relación entre ambos
- CRUD básico completo
- interfaz moderna y usable

## Evolución futura prevista

Más adelante, el proyecto podría crecer con:
- login
- roles
- observaciones clínicas
- constantes vitales
- incidencias
- medicación
- historial por paciente

Pero eso no forma parte del MVP actual.

## Instrucciones para el agente

Cuando propongas o generes código:

- respeta el stack actual
- mantén la solución sencilla
- genera código funcional y consistente
- si propones estructura, que sea realista para este tamaño de proyecto
- si creas frontend, prioriza una UI bonita y clara
- si creas backend, prioriza un CRUD limpio y bien organizado
- no cambies tecnologías salvo petición explícita
- no añadas seguridad de momento
- no añadas funcionalidades fuera del alcance actual

## Resultado esperado de esta fase

El resultado esperado es una aplicación inicial donde se pueda:

- crear habitaciones
- listar habitaciones
- editar habitaciones
- borrar habitaciones
- crear pacientes
- listar pacientes
- editar pacientes
- borrar pacientes
- asignar pacientes a habitaciones
- visualizar qué pacientes pertenecen a cada habitación

con una interfaz atractiva y un backend limpio.
