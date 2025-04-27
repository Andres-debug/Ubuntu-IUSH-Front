import { create } from 'zustand';
import { Programa } from '../types';

// Datos de ejemplo para programas
const programasData: Programa[] = [
  // Facultad de Ingeniería (facultadId: 1)
  {
    id: 1,
    nombre: 'Ingeniería de Sistemas',
    codigo: 'IISI',
    facultadId: 1,
    director: 'Dra. Ana Gómez',
    duracionSemestres: 10,
    creditos: 175,
    nivel: 'Pregrado',
    modalidad: 'Presencial',
    fechaCreacion: '1998-02-15',
    estado: 'Activo',
    descripcion: 'Programa enfocado en la formación integral de profesionales en el área de la informática y los sistemas computacionales.'
  },
  {
    id: 2,
    nombre: 'Ingeniería Civil',
    codigo: 'IICV',
    facultadId: 1,
    director: 'Dr. Carlos Vélez',
    duracionSemestres: 10,
    creditos: 180,
    nivel: 'Pregrado',
    modalidad: 'Presencial',
    fechaCreacion: '1996-07-22',
    estado: 'Activo',
    descripcion: 'Formación de profesionales en el diseño, construcción y mantenimiento de infraestructura civil.'
  },
  {
    id: 3,
    nombre: 'Ingeniería Industrial',
    codigo: 'IIIN',
    facultadId: 1,
    director: 'Dra. Marcela Ruiz',
    duracionSemestres: 10,
    creditos: 170,
    nivel: 'Pregrado',
    modalidad: 'Presencial',
    fechaCreacion: '1999-01-30',
    estado: 'Activo',
    descripcion: 'Programa orientado a la optimización de procesos, recursos y sistemas organizacionales.'
  },
  {
    id: 4,
    nombre: 'Maestría en Ingeniería de Software',
    codigo: 'MMIS',
    facultadId: 1,
    director: 'Dr. Pablo Restrepo',
    duracionSemestres: 4,
    creditos: 48,
    nivel: 'Posgrado',
    modalidad: 'Mixta',
    fechaCreacion: '2010-06-12',
    estado: 'Activo',
    descripcion: 'Programa de posgrado enfocado en metodologías avanzadas de desarrollo de software.'
  },

  // Facultad de Ciencias Económicas y Administrativas (facultadId: 2)
  {
    id: 5,
    nombre: 'Administración de Empresas',
    codigo: 'ADME',
    facultadId: 2,
    director: 'Dr. Roberto Jiménez',
    duracionSemestres: 9,
    creditos: 160,
    nivel: 'Pregrado',
    modalidad: 'Presencial',
    fechaCreacion: '1998-03-10',
    estado: 'Activo',
    descripcion: 'Formación integral en gestión empresarial y dirección de organizaciones.'
  },
  {
    id: 6,
    nombre: 'Contaduría Pública',
    codigo: 'COPU',
    facultadId: 2,
    director: 'Dra. Ángela Martínez',
    duracionSemestres: 9,
    creditos: 155,
    nivel: 'Pregrado',
    modalidad: 'Presencial',
    fechaCreacion: '1999-05-18',
    estado: 'Activo',
    descripcion: 'Programa orientado a la formación en el área contable, financiera y de auditoría.'
  },
  {
    id: 7,
    nombre: 'Especialización en Finanzas',
    codigo: 'EFIN',
    facultadId: 2,
    director: 'Dr. Luis Hernández',
    duracionSemestres: 2,
    creditos: 28,
    nivel: 'Posgrado',
    modalidad: 'Presencial',
    fechaCreacion: '2005-08-22',
    estado: 'Activo',
    descripcion: 'Posgrado enfocado en la gestión financiera y análisis de inversiones.'
  },

  // Facultad de Ciencias Sociales (facultadId: 3)
  {
    id: 8,
    nombre: 'Psicología',
    codigo: 'PSIC',
    facultadId: 3,
    director: 'Dra. Laura Soto',
    duracionSemestres: 10,
    creditos: 168,
    nivel: 'Pregrado',
    modalidad: 'Presencial',
    fechaCreacion: '2001-06-15',
    estado: 'Activo',
    descripcion: 'Programa orientado al estudio del comportamiento humano y sus procesos mentales.'
  },
  {
    id: 9,
    nombre: 'Trabajo Social',
    codigo: 'TRSO',
    facultadId: 3,
    director: 'Dr. Fernando López',
    duracionSemestres: 8,
    creditos: 145,
    nivel: 'Pregrado',
    modalidad: 'Presencial',
    fechaCreacion: '2003-02-28',
    estado: 'Activo',
    descripcion: 'Formación de profesionales comprometidos con la intervención social y comunitaria.'
  },

  // Facultad de Ciencias de la Salud (facultadId: 4)
  {
    id: 10,
    nombre: 'Medicina',
    codigo: 'MEDI',
    facultadId: 4,
    director: 'Dr. Andrés Mejía',
    duracionSemestres: 12,
    creditos: 240,
    nivel: 'Pregrado',
    modalidad: 'Presencial',
    fechaCreacion: '2004-03-15',
    estado: 'Activo',
    descripcion: 'Programa enfocado en la formación integral de médicos generales con alto sentido humano.'
  },
  {
    id: 11,
    nombre: 'Enfermería',
    codigo: 'ENFE',
    facultadId: 4,
    director: 'Dra. Carolina Duque',
    duracionSemestres: 8,
    creditos: 155,
    nivel: 'Pregrado',
    modalidad: 'Presencial',
    fechaCreacion: '2005-02-10',
    estado: 'Activo',
    descripcion: 'Formación de profesionales en el cuidado integral de la salud.'
  },

  // Facultad de Derecho (facultadId: 5)
  {
    id: 12,
    nombre: 'Derecho',
    codigo: 'DERE',
    facultadId: 5,
    director: 'Dr. Ricardo Álvarez',
    duracionSemestres: 10,
    creditos: 175,
    nivel: 'Pregrado',
    modalidad: 'Presencial',
    fechaCreacion: '1997-11-20',
    estado: 'Activo',
    descripcion: 'Programa enfocado en la formación jurídica integral con énfasis en la justicia social.'
  },

  // Facultad de Artes y Arquitectura (facultadId: 6)
  {
    id: 13,
    nombre: 'Arquitectura',
    codigo: 'ARQU',
    facultadId: 6,
    director: 'Arq. Diana Torres',
    duracionSemestres: 10,
    creditos: 180,
    nivel: 'Pregrado',
    modalidad: 'Presencial',
    fechaCreacion: '2006-08-15',
    estado: 'Activo',
    descripcion: 'Formación de profesionales en el diseño y desarrollo de espacios arquitectónicos sostenibles.'
  },
  {
    id: 14,
    nombre: 'Diseño Gráfico',
    codigo: 'DIGR',
    facultadId: 6,
    director: 'Prof. Alejandro Castro',
    duracionSemestres: 8,
    creditos: 145,
    nivel: 'Pregrado',
    modalidad: 'Presencial',
    fechaCreacion: '2008-03-10',
    estado: 'Activo',
    descripcion: 'Programa enfocado en la comunicación visual y el diseño creativo.'
  }
];

interface ProgramaStore {
  programas: Programa[];
  programaSeleccionado: Programa | null;
  isLoading: boolean;
  error: string | null;
  
  getProgramas: () => void;
  getProgramasByFacultadId: (facultadId: number) => Programa[];
  getProgramasByNivel: (nivel: Programa['nivel']) => Programa[];
  getProgramasByModalidad: (modalidad: Programa['modalidad']) => Programa[];
  getProgramaById: (id: number) => Programa | undefined;
  setProgramaSeleccionado: (id: number) => void;
  clearProgramaSeleccionado: () => void;
  addPrograma: (programa: Omit<Programa, 'id'>) => void;
  updatePrograma: (id: number, programa: Partial<Programa>) => void;
  deletePrograma: (id: number) => void;
}

export const useProgramaStore = create<ProgramaStore>((set, get) => ({
  programas: [],
  programaSeleccionado: null,
  isLoading: false,
  error: null,

  getProgramas: () => {
    set({ isLoading: true });
    // Simular una carga asíncrona
    setTimeout(() => {
      set({ programas: programasData, isLoading: false });
    }, 500);
  },

  getProgramasByFacultadId: (facultadId) => {
    return get().programas.filter(p => p.facultadId === facultadId);
  },

  getProgramasByNivel: (nivel) => {
    return get().programas.filter(p => p.nivel === nivel);
  },

  getProgramasByModalidad: (modalidad) => {
    return get().programas.filter(p => p.modalidad === modalidad);
  },

  getProgramaById: (id) => {
    return get().programas.find(p => p.id === id);
  },

  setProgramaSeleccionado: (id) => {
    const programa = get().programas.find(p => p.id === id);
    set({ programaSeleccionado: programa || null });
  },

  clearProgramaSeleccionado: () => {
    set({ programaSeleccionado: null });
  },

  addPrograma: (programa) => {
    const newId = Math.max(0, ...get().programas.map(p => p.id)) + 1;
    set(state => ({
      programas: [...state.programas, { ...programa, id: newId }]
    }));
  },

  updatePrograma: (id, programa) => {
    set(state => ({
      programas: state.programas.map(p => 
        p.id === id ? { ...p, ...programa } : p
      )
    }));
  },

  deletePrograma: (id) => {
    set(state => ({
      programas: state.programas.filter(p => p.id !== id)
    }));
  }
}));