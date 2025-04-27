import { create } from 'zustand';
import { Materia } from '../types';

// Datos de ejemplo para materias
const materiasData: Materia[] = [
  // Materias de Ingeniería de Sistemas
  {
    id: 1,
    nombre: 'Programación I',
    codigo: 'INF101',
    programaId: 1, // Ingeniería de Sistemas
    semestre: 1,
    creditos: 4,
    horasTeoricas: 2,
    horasPracticas: 4,
    estado: 'Activo',
    descripcion: 'Fundamentos de programación y algoritmos',
    profesor: 'Dr. Fernando Herrera'
  },
  {
    id: 2,
    nombre: 'Cálculo Diferencial',
    codigo: 'MAT201',
    programaId: 1, // Ingeniería de Sistemas
    semestre: 1,
    creditos: 4,
    horasTeoricas: 4,
    horasPracticas: 2,
    estado: 'Activo',
    descripcion: 'Fundamentos de cálculo y funciones matemáticas',
    profesor: 'Dra. Claudia Pérez'
  },
  {
    id: 3,
    nombre: 'Programación II',
    codigo: 'INF102',
    programaId: 1, // Ingeniería de Sistemas
    semestre: 2,
    creditos: 4,
    horasTeoricas: 2,
    horasPracticas: 4,
    prerequisitos: [1],
    estado: 'Activo',
    descripcion: 'Programación orientada a objetos',
    profesor: 'Dr. Fernando Herrera'
  },
  {
    id: 4,
    nombre: 'Estructura de Datos',
    codigo: 'INF201',
    programaId: 1, // Ingeniería de Sistemas
    semestre: 3,
    creditos: 4,
    horasTeoricas: 2,
    horasPracticas: 4,
    prerequisitos: [3],
    estado: 'Activo',
    descripcion: 'Estructuras de datos avanzadas y algoritmos',
    profesor: 'Dr. Ricardo Montero'
  },
  {
    id: 5,
    nombre: 'Bases de Datos',
    codigo: 'INF301',
    programaId: 1, // Ingeniería de Sistemas
    semestre: 4,
    creditos: 4,
    horasTeoricas: 3,
    horasPracticas: 3,
    prerequisitos: [4],
    estado: 'Activo',
    descripcion: 'Diseño y administración de bases de datos',
    profesor: 'Dra. Laura Gómez'
  },
  {
    id: 6,
    nombre: 'Ingeniería de Software',
    codigo: 'INF401',
    programaId: 1, // Ingeniería de Sistemas
    semestre: 5,
    creditos: 4,
    horasTeoricas: 3,
    horasPracticas: 3,
    prerequisitos: [5],
    estado: 'Activo',
    descripcion: 'Metodologías de desarrollo de software',
    profesor: 'Dr. Carlos Vega'
  },

  // Materias de Ingeniería Civil
  {
    id: 7,
    nombre: 'Mecánica de Suelos',
    codigo: 'CIV301',
    programaId: 2, // Ingeniería Civil
    semestre: 3,
    creditos: 4,
    horasTeoricas: 3,
    horasPracticas: 3,
    estado: 'Activo',
    descripcion: 'Propiedades y comportamiento de los suelos',
    profesor: 'Dr. Javier Martínez'
  },
  {
    id: 8,
    nombre: 'Estructuras',
    codigo: 'CIV401',
    programaId: 2, // Ingeniería Civil
    semestre: 4,
    creditos: 4,
    horasTeoricas: 3,
    horasPracticas: 3,
    prerequisitos: [7],
    estado: 'Activo',
    descripcion: 'Diseño y análisis de estructuras',
    profesor: 'Dra. María Sánchez'
  },
  {
    id: 9,
    nombre: 'Hidráulica',
    codigo: 'CIV402',
    programaId: 2, // Ingeniería Civil
    semestre: 4,
    creditos: 4,
    horasTeoricas: 3,
    horasPracticas: 3,
    estado: 'Activo',
    descripcion: 'Mecánica de fluidos aplicada a la ingeniería',
    profesor: 'Dr. Eduardo Ríos'
  },

  // Materias de Administración de Empresas
  {
    id: 10,
    nombre: 'Fundamentos de Administración',
    codigo: 'ADM101',
    programaId: 3, // Administración de Empresas
    semestre: 1,
    creditos: 3,
    horasTeoricas: 4,
    horasPracticas: 1,
    estado: 'Activo',
    descripcion: 'Conceptos básicos de administración',
    profesor: 'Dra. Patricia Morales'
  },
  {
    id: 11,
    nombre: 'Contabilidad Financiera',
    codigo: 'ADM201',
    programaId: 3, // Administración de Empresas
    semestre: 2,
    creditos: 3,
    horasTeoricas: 3,
    horasPracticas: 2,
    estado: 'Activo',
    descripcion: 'Principios de contabilidad y análisis financiero',
    profesor: 'Dr. Roberto Guzmán'
  },
  {
    id: 12,
    nombre: 'Marketing Estratégico',
    codigo: 'ADM301',
    programaId: 3, // Administración de Empresas
    semestre: 3,
    creditos: 3,
    horasTeoricas: 3,
    horasPracticas: 2,
    estado: 'Activo',
    descripcion: 'Estrategias de marketing y análisis de mercado',
    profesor: 'Dra. Sofía Vargas'
  }
];

interface MateriaStore {
  materias: Materia[];
  isLoading: boolean;
  error: string | null;
  
  // Acciones para manipular el estado
  getMaterias: () => Materia[];
  getMateriaById: (id: number) => Materia | undefined;
  getMateriasByPrograma: (programaId: number) => Materia[];
  getMateriasBySemestre: (programaId: number, semestre: number) => Materia[];
  addMateria: (materia: Materia) => void;
  updateMateria: (id: number, materiaData: Partial<Materia>) => void;
  deleteMateria: (id: number) => void;
  
  // Acciones para simular interacciones con el backend
  fetchMaterias: () => Promise<void>;
}

export const useMateriaStore = create<MateriaStore>((set, get) => ({
  materias: materiasData,
  isLoading: false,
  error: null,
  
  // Implementación de métodos
  getMaterias: () => get().materias,
  
  getMateriaById: (id) => get().materias.find(materia => materia.id === id),
  
  getMateriasByPrograma: (programaId) => 
    get().materias.filter(materia => materia.programaId === programaId),
  
  getMateriasBySemestre: (programaId, semestre) => 
    get().materias.filter(
      materia => materia.programaId === programaId && materia.semestre === semestre
    ),
  
  addMateria: (materia) => {
    set(state => ({
      materias: [...state.materias, {
        ...materia,
        id: state.materias.length > 0 
          ? Math.max(...state.materias.map(m => m.id)) + 1 
          : 1
      }]
    }));
  },
  
  updateMateria: (id, materiaData) => {
    set(state => ({
      materias: state.materias.map(materia => 
        materia.id === id ? { ...materia, ...materiaData } : materia
      )
    }));
  },
  
  deleteMateria: (id) => {
    set(state => ({
      materias: state.materias.filter(materia => materia.id !== id)
    }));
  },
  
  // Método que simula la carga de datos desde un API
  fetchMaterias: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulando una llamada a API con un retraso de 500ms
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // En un entorno real, aquí iría la llamada fetch a tu backend
      // const response = await fetch('/api/materias');
      // const data = await response.json();
      
      set({ materias: materiasData, isLoading: false });
    } catch (error) {
      set({ error: 'Error al cargar las materias', isLoading: false });
      console.error('Error fetching materias:', error);
    }
  }
}));