// Interfaces para el sistema universitario

export interface Facultad {
  id: number;
  nombre: string;
  codigo: string;
  descripcion?: string;
  decano?: string;
  fechaCreacion?: string;
}

export interface Programa {
  id: number;
  nombre: string;
  codigo: string;
  facultadId: number;
  nivel: 'Pregrado' | 'Posgrado' | 'Maestría' | 'Doctorado' | 'Técnico' | 'Tecnológico';
  duracionSemestres: number;
  director?: string;
  creditos: number;
  descripcion?: string;
  fechaCreacion?: string;
  estado?: 'Activo' | 'Inactivo' | 'Suspendido';
  modalidad: string;
}

export interface Materia {
  id: number;
  nombre: string;
  codigo: string;
  programaId: number;
  semestre: number;
  creditos: number;
  horasTeoricas: number;
  horasPracticas: number;
  prerequisitos?: number[];
  estado: string;
  descripcion?: string;
  profesor:string
  tipo:string
}

export interface Estudiante {
  id: number;
  nombre: string;
  apellido: string;
  carnet: string;
  programaId: number;
  semestre: number;
  email: string;
  telefono: string;
  estado: 'Activo' | 'Inactivo' | 'Egresado' | 'Suspendido';
  fechaIngreso?: string;
  fechaNacimiento?: string;
  direccion?: string;
}

export interface Calificaciones {
  parcial1: number;
  parcial2: number;
  final: number;
  promedio: number;
}

export interface EstudianteMateria {
  estudianteId: number;
  materiaId: number;
  calificaciones: Calificaciones;
  asistencia: number; // Porcentaje de asistencia
  observaciones?: string;
}

export interface IndicadoresEstres {
  asistencia: number; // Porcentaje de asistencia
  rendimiento: number; // Rendimiento académico (0-100)
  cargaAcademica: number; // Nivel de carga académica (0-100)
}

export interface AnalisisEstres {
  id: number;
  estudianteId: number;
  nivelEstres: number; // (0-100)
  nivelAnsiedad: number; // (0-100)
  riesgoDesercion: number; // (0-100)
  ultimaActualizacion: string; // Fecha
  indicadores: IndicadoresEstres;
  observaciones?: string;
}