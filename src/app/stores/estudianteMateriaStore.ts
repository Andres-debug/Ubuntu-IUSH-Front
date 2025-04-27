import { create } from 'zustand';
import { EstudianteMateria, Calificaciones } from '../types';

// Datos de ejemplo para relaciones estudiante-materia
const estudianteMateriaData: EstudianteMateria[] = [
  // Carlos Rodríguez (estudianteId: 1)
  {
    estudianteId: 1,
    materiaId: 1, // Programación I
    calificaciones: {
      parcial1: 4.5,
      parcial2: 4.8,
      final: 4.7,
      promedio: 4.68
    },
    asistencia: 95,
    observaciones: 'Excelente desempeño en la materia'
  },
  {
    estudianteId: 1,
    materiaId: 2, // Cálculo Diferencial
    calificaciones: {
      parcial1: 3.8,
      parcial2: 4.0,
      final: 4.2,
      promedio: 4.0
    },
    asistencia: 90,
    observaciones: 'Buen desempeño general'
  },
  {
    estudianteId: 1,
    materiaId: 3, // Programación II
    calificaciones: {
      parcial1: 4.2,
      parcial2: 4.5,
      final: 4.6,
      promedio: 4.45
    },
    asistencia: 92,
    observaciones: 'Muy buenas habilidades de programación'
  },

  // Ana María López (estudianteId: 2)
  {
    estudianteId: 2,
    materiaId: 1, // Programación I
    calificaciones: {
      parcial1: 4.0,
      parcial2: 4.2,
      final: 4.3,
      promedio: 4.18
    },
    asistencia: 88,
    observaciones: 'Buen rendimiento académico'
  },
  {
    estudianteId: 2,
    materiaId: 2, // Cálculo Diferencial
    calificaciones: {
      parcial1: 4.3,
      parcial2: 4.5,
      final: 4.7,
      promedio: 4.52
    },
    asistencia: 93,
    observaciones: 'Excelente en matemáticas'
  },
  {
    estudianteId: 2,
    materiaId: 3, // Programación II
    calificaciones: {
      parcial1: 3.9,
      parcial2: 4.0,
      final: 4.2,
      promedio: 4.05
    },
    asistencia: 85,
    observaciones: 'Buen desempeño pero con margen de mejora'
  },

  // Juan Pablo Martínez (estudianteId: 3)
  {
    estudianteId: 3,
    materiaId: 1, // Programación I
    calificaciones: {
      parcial1: 3.5,
      parcial2: 3.8,
      final: 4.0,
      promedio: 3.78
    },
    asistencia: 80,
    observaciones: 'Mejoró a lo largo del semestre'
  },
  {
    estudianteId: 3,
    materiaId: 2, // Cálculo Diferencial
    calificaciones: {
      parcial1: 3.3,
      parcial2: 3.5,
      final: 3.7,
      promedio: 3.52
    },
    asistencia: 82,
    observaciones: 'Necesita refuerzo en algunos temas'
  },

  // Laura González (estudianteId: 4)
  {
    estudianteId: 4,
    materiaId: 7, // Mecánica de Suelos
    calificaciones: {
      parcial1: 4.2,
      parcial2: 4.4,
      final: 4.6,
      promedio: 4.42
    },
    asistencia: 90,
    observaciones: 'Excelente comprensión de conceptos'
  },
  {
    estudianteId: 4,
    materiaId: 8, // Estructuras
    calificaciones: {
      parcial1: 4.1,
      parcial2: 4.3,
      final: 4.5,
      promedio: 4.32
    },
    asistencia: 92,
    observaciones: 'Destaca en diseño estructural'
  },

  // Andrés Silva (estudianteId: 5)
  {
    estudianteId: 5,
    materiaId: 7, // Mecánica de Suelos
    calificaciones: {
      parcial1: 3.9,
      parcial2: 4.1,
      final: 4.0,
      promedio: 4.0
    },
    asistencia: 85,
    observaciones: 'Buen rendimiento general'
  },

  // María José Pérez (estudianteId: 6)
  {
    estudianteId: 6,
    materiaId: 10, // Procesos Industriales
    calificaciones: {
      parcial1: 4.4,
      parcial2: 4.6,
      final: 4.8,
      promedio: 4.62
    },
    asistencia: 95,
    observaciones: 'Destacada participación en clase'
  },
  {
    estudianteId: 6,
    materiaId: 11, // Gestión de Calidad
    calificaciones: {
      parcial1: 4.3,
      parcial2: 4.5,
      final: 4.7,
      promedio: 4.52
    },
    asistencia: 93,
    observaciones: 'Excelente trabajo en proyectos prácticos'
  },

  // Daniel Torres (estudianteId: 7)
  {
    estudianteId: 7,
    materiaId: 12, // Fundamentos de Administración
    calificaciones: {
      parcial1: 4.2,
      parcial2: 4.0,
      final: 4.3,
      promedio: 4.18
    },
    asistencia: 88,
    observaciones: 'Buen análisis de casos empresariales'
  },
  {
    estudianteId: 7,
    materiaId: 13, // Marketing
    calificaciones: {
      parcial1: 4.5,
      parcial2: 4.7,
      final: 4.8,
      promedio: 4.68
    },
    asistencia: 92,
    observaciones: 'Destaca en estrategias de mercadeo'
  },

  // Valentina Ospina (estudianteId: 8)
  {
    estudianteId: 8,
    materiaId: 12, // Fundamentos de Administración
    calificaciones: {
      parcial1: 3.8,
      parcial2: 4.0,
      final: 4.2,
      promedio: 4.0
    },
    asistencia: 85,
    observaciones: 'Buen desempeño con potencial de mejora'
  },

  // Camila Hernández (estudianteId: 9)
  {
    estudianteId: 9,
    materiaId: 14, // Psicología General
    calificaciones: {
      parcial1: 4.6,
      parcial2: 4.8,
      final: 4.9,
      promedio: 4.78
    },
    asistencia: 96,
    observaciones: 'Destaca en análisis de comportamiento humano'
  },
  {
    estudianteId: 9,
    materiaId: 15, // Psicología Clínica
    calificaciones: {
      parcial1: 4.4,
      parcial2: 4.6,
      final: 4.8,
      promedio: 4.62
    },
    asistencia: 94,
    observaciones: 'Excelente en diagnóstico psicológico'
  },

  // Santiago Ramírez (estudianteId: 10)
  {
    estudianteId: 10,
    materiaId: 16, // Anatomía
    calificaciones: {
      parcial1: 4.3,
      parcial2: 4.5,
      final: 4.7,
      promedio: 4.52
    },
    asistencia: 92,
    observaciones: 'Excelente en prácticas de laboratorio'
  },
  {
    estudianteId: 10,
    materiaId: 17, // Fisiología
    calificaciones: {
      parcial1: 4.4,
      parcial2: 4.6,
      final: 4.8,
      promedio: 4.62
    },
    asistencia: 93,
    observaciones: 'Destacado desempeño académico'
  },

  // Isabella Castro (estudianteId: 11)
  {
    estudianteId: 11,
    materiaId: 16, // Anatomía
    calificaciones: {
      parcial1: 4.1,
      parcial2: 4.3,
      final: 4.5,
      promedio: 4.32
    },
    asistencia: 90,
    observaciones: 'Buen rendimiento en prácticas clínicas'
  },
  {
    estudianteId: 11,
    materiaId: 17, // Fisiología
    calificaciones: {
      parcial1: 4.2,
      parcial2: 4.4,
      final: 4.6,
      promedio: 4.42
    },
    asistencia: 91,
    observaciones: 'Destaca en análisis de casos clínicos'
  },

  // Sebastián Morales (estudianteId: 12)
  {
    estudianteId: 12,
    materiaId: 18, // Derecho Civil
    calificaciones: {
      parcial1: 4.0,
      parcial2: 4.2,
      final: 4.4,
      promedio: 4.22
    },
    asistencia: 88,
    observaciones: 'Buena argumentación jurídica'
  },
  {
    estudianteId: 12,
    materiaId: 19, // Derecho Penal
    calificaciones: {
      parcial1: 4.1,
      parcial2: 4.3,
      final: 4.5,
      promedio: 4.32
    },
    asistencia: 89,
    observaciones: 'Buen análisis de casos penales'
  }
];

interface EstudianteMateriaStore {
  estudianteMaterias: EstudianteMateria[];
  estudianteMateriaSeleccionada: EstudianteMateria | null;
  isLoading: boolean;
  error: string | null;
  
  getEstudianteMaterias: () => void;
  getEstudianteMateriasByEstudiante: (estudianteId: number) => EstudianteMateria[];
  getEstudianteMateriasByMateria: (materiaId: number) => EstudianteMateria[];
  getCalificacionesByEstudianteMateria: (estudianteId: number, materiaId: number) => Calificaciones | undefined;
  setEstudianteMateriaSeleccionada: (estudianteId: number, materiaId: number) => void;
  clearEstudianteMateriaSeleccionada: () => void;
  addEstudianteMateria: (estudianteMateria: EstudianteMateria) => void;
  updateEstudianteMateria: (estudianteId: number, materiaId: number, data: Partial<EstudianteMateria>) => void;
  deleteEstudianteMateria: (estudianteId: number, materiaId: number) => void;
}

export const useEstudianteMateriaStore = create<EstudianteMateriaStore>((set, get) => ({
  estudianteMaterias: [],
  estudianteMateriaSeleccionada: null,
  isLoading: false,
  error: null,

  getEstudianteMaterias: () => {
    set({ isLoading: true });
    // Simular una carga asíncrona
    setTimeout(() => {
      set({ estudianteMaterias: estudianteMateriaData, isLoading: false });
    }, 500);
  },

  getEstudianteMateriasByEstudiante: (estudianteId) => {
    return get().estudianteMaterias.filter(em => em.estudianteId === estudianteId);
  },

  getEstudianteMateriasByMateria: (materiaId) => {
    return get().estudianteMaterias.filter(em => em.materiaId === materiaId);
  },

  getCalificacionesByEstudianteMateria: (estudianteId, materiaId) => {
    const relacion = get().estudianteMaterias.find(em => 
      em.estudianteId === estudianteId && em.materiaId === materiaId
    );
    return relacion?.calificaciones;
  },

  setEstudianteMateriaSeleccionada: (estudianteId, materiaId) => {
    const relacion = get().estudianteMaterias.find(em => 
      em.estudianteId === estudianteId && em.materiaId === materiaId
    );
    set({ estudianteMateriaSeleccionada: relacion || null });
  },

  clearEstudianteMateriaSeleccionada: () => {
    set({ estudianteMateriaSeleccionada: null });
  },

  addEstudianteMateria: (estudianteMateria) => {
    // Verificar si ya existe esta relación
    const existe = get().estudianteMaterias.some(em => 
      em.estudianteId === estudianteMateria.estudianteId && em.materiaId === estudianteMateria.materiaId
    );
    
    if (!existe) {
      set(state => ({
        estudianteMaterias: [...state.estudianteMaterias, estudianteMateria]
      }));
    } else {
      set({ error: 'Esta relación estudiante-materia ya existe' });
      // Limpiar el error después de 3 segundos
      setTimeout(() => set({ error: null }), 3000);
    }
  },

  updateEstudianteMateria: (estudianteId, materiaId, data) => {
    set(state => ({
      estudianteMaterias: state.estudianteMaterias.map(em => 
        (em.estudianteId === estudianteId && em.materiaId === materiaId) 
          ? { ...em, ...data }
          : em
      )
    }));
  },

  deleteEstudianteMateria: (estudianteId, materiaId) => {
    set(state => ({
      estudianteMaterias: state.estudianteMaterias.filter(em => 
        !(em.estudianteId === estudianteId && em.materiaId === materiaId)
      )
    }));
  }
}));