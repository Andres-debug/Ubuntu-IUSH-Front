import { create } from 'zustand';
import { AnalisisEstres } from '../types';

// Datos de ejemplo para análisis de estrés
const analisisEstresData: AnalisisEstres[] = [
  // Estudiantes con problemas académicos o de asistencia
  {
    id: 1,
    estudianteId: 2, // Juan Pérez - Bajo rendimiento en Programación I y Cálculo
    nivelEstres: 78,
    nivelAnsiedad: 85,
    riesgoDesercion: 65,
    ultimaActualizacion: '2025-04-15',
    indicadores: {
      asistencia: 65,
      rendimiento: 55,
      cargaAcademica: 20
    }
  },
  {
    id: 2,
    estudianteId: 5, // Roberto Sánchez - Rendimiento medio en Civil
    nivelEstres: 65,
    nivelAnsiedad: 60,
    riesgoDesercion: 45,
    ultimaActualizacion: '2025-04-18',
    indicadores: {
      asistencia: 75,
      rendimiento: 70,
      cargaAcademica: 25
    }
  },
  // Estudiantes con buen rendimiento pero alto estrés
  {
    id: 3,
    estudianteId: 12, // Camila Reyes - Medicina
    nivelEstres: 82,
    nivelAnsiedad: 75,
    riesgoDesercion: 35,
    ultimaActualizacion: '2025-04-20',
    indicadores: {
      asistencia: 92,
      rendimiento: 85,
      cargaAcademica: 35 // Alta carga en Medicina
    }
  },
  // Estudiantes con bajo estrés
  {
    id: 4,
    estudianteId: 1, // María Rodríguez - Buen rendimiento en Sistemas
    nivelEstres: 45,
    nivelAnsiedad: 40,
    riesgoDesercion: 15,
    ultimaActualizacion: '2025-04-22',
    indicadores: {
      asistencia: 90,
      rendimiento: 90,
      cargaAcademica: 22
    }
  },
  {
    id: 5,
    estudianteId: 8, // Laura García - Excelente en Administración
    nivelEstres: 30,
    nivelAnsiedad: 25,
    riesgoDesercion: 10,
    ultimaActualizacion: '2025-04-22',
    indicadores: {
      asistencia: 98,
      rendimiento: 95,
      cargaAcademica: 20
    }
  },
  // Otros estudiantes
  {
    id: 6,
    estudianteId: 3, // Luis González - Sistemas
    nivelEstres: 55,
    nivelAnsiedad: 50,
    riesgoDesercion: 25,
    ultimaActualizacion: '2025-04-19',
    indicadores: {
      asistencia: 90,
      rendimiento: 85,
      cargaAcademica: 24
    }
  },
  {
    id: 7,
    estudianteId: 6, // Sofía López - Industrial
    nivelEstres: 60,
    nivelAnsiedad: 55,
    riesgoDesercion: 30,
    ultimaActualizacion: '2025-04-17',
    indicadores: {
      asistencia: 85,
      rendimiento: 80,
      cargaAcademica: 22
    }
  },
  {
    id: 8,
    estudianteId: 10, // Valentina Torres - Psicología
    nivelEstres: 50,
    nivelAnsiedad: 60,
    riesgoDesercion: 20,
    ultimaActualizacion: '2025-04-21',
    indicadores: {
      asistencia: 96,
      rendimiento: 92,
      cargaAcademica: 20
    }
  },
  {
    id: 9,
    estudianteId: 14, // Daniela Morales - Derecho
    nivelEstres: 75,
    nivelAnsiedad: 70,
    riesgoDesercion: 30,
    ultimaActualizacion: '2025-04-18',
    indicadores: {
      asistencia: 94,
      rendimiento: 88,
      cargaAcademica: 28
    }
  }
];

interface AnalisisEstresStore {
  analisisEstres: AnalisisEstres[];
  analisisSeleccionado: AnalisisEstres | null;
  isLoading: boolean;
  error: string | null;
  
  getAnalisisEstres: () => void;
  getAnalisisEstresById: (id: number) => AnalisisEstres | undefined;
  getAnalisisEstresByEstudianteId: (estudianteId: number) => AnalisisEstres | undefined;
  setAnalisisSeleccionado: (id: number) => void;
  clearAnalisisSeleccionado: () => void;
  addAnalisisEstres: (analisis: Omit<AnalisisEstres, 'id'>) => void;
  updateAnalisisEstres: (id: number, analisis: Partial<AnalisisEstres>) => void;
  deleteAnalisisEstres: (id: number) => void;
  
  // Métodos adicionales para reportes
  getEstudiantesAltoRiesgo: () => { estudianteId: number, riesgoDesercion: number }[];
  getPromedioNivelEstresPorPrograma: (programaId: number) => number;
  getTopEstudiantesEstres: (limit: number) => { estudianteId: number, nivelEstres: number }[];
}

export const useAnalisisEstresStore = create<AnalisisEstresStore>((set, get) => ({
  analisisEstres: [],
  analisisSeleccionado: null,
  isLoading: false,
  error: null,

  getAnalisisEstres: () => {
    set({ isLoading: true });
    // Simular una carga asíncrona
    setTimeout(() => {
      set({ analisisEstres: analisisEstresData, isLoading: false });
    }, 500);
  },

  getAnalisisEstresById: (id) => {
    return get().analisisEstres.find(a => a.id === id);
  },

  getAnalisisEstresByEstudianteId: (estudianteId) => {
    return get().analisisEstres.find(a => a.estudianteId === estudianteId);
  },

  setAnalisisSeleccionado: (id) => {
    const analisis = get().analisisEstres.find(a => a.id === id);
    set({ analisisSeleccionado: analisis || null });
  },

  clearAnalisisSeleccionado: () => {
    set({ analisisSeleccionado: null });
  },

  addAnalisisEstres: (analisis) => {
    const newId = Math.max(0, ...get().analisisEstres.map(a => a.id)) + 1;
    set(state => ({
      analisisEstres: [...state.analisisEstres, { ...analisis, id: newId }]
    }));
  },

  updateAnalisisEstres: (id, analisis) => {
    set(state => ({
      analisisEstres: state.analisisEstres.map(a => 
        a.id === id ? { ...a, ...analisis } : a
      )
    }));
  },

  deleteAnalisisEstres: (id) => {
    set(state => ({
      analisisEstres: state.analisisEstres.filter(a => a.id !== id)
    }));
  },

  // Métodos para reportes y análisis
  getEstudiantesAltoRiesgo: () => {
    return get().analisisEstres
      .filter(a => a.riesgoDesercion > 50)
      .map(a => ({ estudianteId: a.estudianteId, riesgoDesercion: a.riesgoDesercion }))
      .sort((a, b) => b.riesgoDesercion - a.riesgoDesercion);
  },

  getPromedioNivelEstresPorPrograma: (programaId) => {
    // Esta función requeriría acceso a estudiantes y sus programas
    // Por ahora devuelve un número aleatorio como ejemplo
    return Math.round(Math.random() * 50 + 30);
  },

  getTopEstudiantesEstres: (limit) => {
    return get().analisisEstres
      .map(a => ({ estudianteId: a.estudianteId, nivelEstres: a.nivelEstres }))
      .sort((a, b) => b.nivelEstres - a.nivelEstres)
      .slice(0, limit);
  }
}));