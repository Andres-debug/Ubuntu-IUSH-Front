import { create } from 'zustand';
import { Facultad } from '../types';

// Datos de ejemplo para facultades
const facultadesData: Facultad[] = [
  {
    id: 1,
    nombre: 'Facultad de Ingeniería',
    codigo: 'FING',
    descripcion: 'Facultad enfocada en la formación de profesionales en diversas ramas de la ingeniería.',
    decano: 'Dr. Ricardo Medina',
    fechaCreacion: '1995-03-15'
  },
  {
    id: 2,
    nombre: 'Facultad de Ciencias Económicas y Administrativas',
    codigo: 'FCEA',
    descripcion: 'Facultad dedicada a la formación de profesionales en áreas económicas, administrativas y contables.',
    decano: 'Dra. Claudia Ramírez',
    fechaCreacion: '1998-07-22'
  },
  {
    id: 3,
    nombre: 'Facultad de Ciencias Sociales',
    codigo: 'FCISO',
    descripcion: 'Facultad orientada al estudio del comportamiento humano y las dinámicas sociales.',
    decano: 'Dr. Fernando López',
    fechaCreacion: '2001-04-10'
  },
  {
    id: 4,
    nombre: 'Facultad de Ciencias de la Salud',
    codigo: 'FCSAL',
    descripcion: 'Facultad enfocada en la formación de profesionales en diversas áreas de la salud.',
    decano: 'Dra. Marcela Gutiérrez',
    fechaCreacion: '2003-09-05'
  },
  {
    id: 5,
    nombre: 'Facultad de Derecho',
    codigo: 'FDER',
    descripcion: 'Facultad dedicada a la formación de profesionales en ciencias jurídicas.',
    decano: 'Dr. Carlos Mendoza',
    fechaCreacion: '1997-11-18'
  },
  {
    id: 6,
    nombre: 'Facultad de Artes y Arquitectura',
    codigo: 'FAARQ',
    descripcion: 'Facultad orientada al desarrollo creativo y diseño arquitectónico.',
    decano: 'Arq. Lucía Hernández',
    fechaCreacion: '2005-02-28'
  }
];

interface FacultadStore {
  facultades: Facultad[];
  facultadSeleccionada: Facultad | null;
  isLoading: boolean;
  error: string | null;
  
  getFacultades: () => void;
  getFacultadById: (id: number) => Facultad | undefined;
  setFacultadSeleccionada: (id: number) => void;
  clearFacultadSeleccionada: () => void;
  addFacultad: (facultad: Omit<Facultad, 'id'>) => void;
  updateFacultad: (id: number, facultad: Partial<Facultad>) => void;
  deleteFacultad: (id: number) => void;
}

export const useFacultadStore = create<FacultadStore>((set, get) => ({
  facultades: [],
  facultadSeleccionada: null,
  isLoading: false,
  error: null,

  getFacultades: () => {
    set({ isLoading: true });
    // Simular una carga asíncrona
    setTimeout(() => {
      set({ facultades: facultadesData, isLoading: false });
    }, 500);
  },

  getFacultadById: (id) => {
    return get().facultades.find(f => f.id === id);
  },

  setFacultadSeleccionada: (id) => {
    const facultad = get().facultades.find(f => f.id === id);
    set({ facultadSeleccionada: facultad || null });
  },

  clearFacultadSeleccionada: () => {
    set({ facultadSeleccionada: null });
  },

  addFacultad: (facultad) => {
    const newId = Math.max(0, ...get().facultades.map(f => f.id)) + 1;
    set(state => ({
      facultades: [...state.facultades, { ...facultad, id: newId }]
    }));
  },

  updateFacultad: (id, facultad) => {
    set(state => ({
      facultades: state.facultades.map(f => 
        f.id === id ? { ...f, ...facultad } : f
      )
    }));
  },

  deleteFacultad: (id) => {
    set(state => ({
      facultades: state.facultades.filter(f => f.id !== id)
    }));
  }
}));