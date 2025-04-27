import { create } from 'zustand';
import { Estudiante } from '../types';

// Datos de ejemplo para estudiantes
const estudiantesData: Estudiante[] = [
  // Ingeniería de Sistemas (programaId: 1)
  {
    id: 1,
    nombre: 'Carlos',
    apellido: 'Rodríguez',
    carnet: 'IS2020001',
    programaId: 1,
    semestre: 5,
    email: 'carlos.rodriguez@estudiante.edu.co',
    telefono: '300-123-4567',
    estado: 'Activo',
    fechaIngreso: '2020-01-15',
    fechaNacimiento: '1998-05-20',
    direccion: 'Calle 45 #28-15, Medellín'
  },
  {
    id: 2,
    nombre: 'Ana María',
    apellido: 'López',
    carnet: 'IS2020002',
    programaId: 1,
    semestre: 5,
    email: 'ana.lopez@estudiante.edu.co',
    telefono: '310-987-6543',
    estado: 'Activo',
    fechaIngreso: '2020-01-15',
    fechaNacimiento: '1999-02-10',
    direccion: 'Carrera 70 #15-45, Medellín'
  },
  {
    id: 3,
    nombre: 'Juan Pablo',
    apellido: 'Martínez',
    carnet: 'IS2021001',
    programaId: 1,
    semestre: 3,
    email: 'juan.martinez@estudiante.edu.co',
    telefono: '320-456-7890',
    estado: 'Activo',
    fechaIngreso: '2021-01-20',
    fechaNacimiento: '2000-07-15',
    direccion: 'Avenida 33 #50-28, Medellín'
  },

  // Ingeniería Civil (programaId: 2)
  {
    id: 4,
    nombre: 'Laura',
    apellido: 'González',
    carnet: 'IC2019001',
    programaId: 2,
    semestre: 7,
    email: 'laura.gonzalez@estudiante.edu.co',
    telefono: '311-222-3333',
    estado: 'Activo',
    fechaIngreso: '2019-01-25',
    fechaNacimiento: '1997-11-30',
    direccion: 'Calle 80 #65-12, Medellín'
  },
  {
    id: 5,
    nombre: 'Andrés',
    apellido: 'Silva',
    carnet: 'IC2020001',
    programaId: 2,
    semestre: 5,
    email: 'andres.silva@estudiante.edu.co',
    telefono: '315-444-5555',
    estado: 'Activo',
    fechaIngreso: '2020-01-15',
    fechaNacimiento: '1998-09-05',
    direccion: 'Carrera 43 #25-10, Medellín'
  },

  // Ingeniería Industrial (programaId: 3)
  {
    id: 6,
    nombre: 'María José',
    apellido: 'Pérez',
    carnet: 'II2019001',
    programaId: 3,
    semestre: 7,
    email: 'maria.perez@estudiante.edu.co',
    telefono: '312-666-7777',
    estado: 'Activo',
    fechaIngreso: '2019-01-25',
    fechaNacimiento: '1997-04-12',
    direccion: 'Avenida El Poblado #15-20, Medellín'
  },

  // Administración de Empresas (programaId: 5)
  {
    id: 7,
    nombre: 'Daniel',
    apellido: 'Torres',
    carnet: 'AE2020001',
    programaId: 5,
    semestre: 5,
    email: 'daniel.torres@estudiante.edu.co',
    telefono: '313-888-9999',
    estado: 'Activo',
    fechaIngreso: '2020-01-15',
    fechaNacimiento: '1998-12-03',
    direccion: 'Calle 10 #30-45, Medellín'
  },
  {
    id: 8,
    nombre: 'Valentina',
    apellido: 'Ospina',
    carnet: 'AE2022001',
    programaId: 5,
    semestre: 1,
    email: 'valentina.ospina@estudiante.edu.co',
    telefono: '314-111-2222',
    estado: 'Activo',
    fechaIngreso: '2022-01-18',
    fechaNacimiento: '2001-06-24',
    direccion: 'Carrera 80 #35-15, Medellín'
  },

  // Psicología (programaId: 8)
  {
    id: 9,
    nombre: 'Camila',
    apellido: 'Hernández',
    carnet: 'PS2021001',
    programaId: 8,
    semestre: 3,
    email: 'camila.hernandez@estudiante.edu.co',
    telefono: '316-333-4444',
    estado: 'Activo',
    fechaIngreso: '2021-01-20',
    fechaNacimiento: '2000-03-15',
    direccion: 'Calle 5 #40-28, Medellín'
  },

  // Medicina (programaId: 10)
  {
    id: 10,
    nombre: 'Santiago',
    apellido: 'Ramírez',
    carnet: 'MED2018001',
    programaId: 10,
    semestre: 9,
    email: 'santiago.ramirez@estudiante.edu.co',
    telefono: '317-555-6666',
    estado: 'Activo',
    fechaIngreso: '2018-01-22',
    fechaNacimiento: '1996-10-08',
    direccion: 'Avenida Las Palmas #25-30, Medellín'
  },
  {
    id: 11,
    nombre: 'Isabella',
    apellido: 'Castro',
    carnet: 'MED2019001',
    programaId: 10,
    semestre: 7,
    email: 'isabella.castro@estudiante.edu.co',
    telefono: '318-777-8888',
    estado: 'Activo',
    fechaIngreso: '2019-01-25',
    fechaNacimiento: '1997-08-17',
    direccion: 'Carrera 25 #50-15, Medellín'
  },

  // Derecho (programaId: 12)
  {
    id: 12,
    nombre: 'Sebastián',
    apellido: 'Morales',
    carnet: 'DER2020001',
    programaId: 12,
    semestre: 5,
    email: 'sebastian.morales@estudiante.edu.co',
    telefono: '319-999-0000',
    estado: 'Activo',
    fechaIngreso: '2020-01-15',
    fechaNacimiento: '1999-01-30',
    direccion: 'Calle 35 #70-22, Medellín'
  }
];

interface EstudianteStore {
  estudiantes: Estudiante[];
  estudianteSeleccionado: Estudiante | null;
  isLoading: boolean;
  error: string | null;
  
  getEstudiantes: () => void;
  getEstudiantesByProgramaId: (programaId: number) => Estudiante[];
  getEstudiantesBySemestre: (programaId: number, semestre: number) => Estudiante[];
  getEstudiantesByEstado: (estado: Estudiante['estado']) => Estudiante[];
  getEstudianteById: (id: number) => Estudiante | undefined;
  setEstudianteSeleccionado: (id: number) => void;
  clearEstudianteSeleccionado: () => void;
  addEstudiante: (estudiante: Omit<Estudiante, 'id'>) => void;
  updateEstudiante: (id: number, estudiante: Partial<Estudiante>) => void;
  deleteEstudiante: (id: number) => void;
}

export const useEstudianteStore = create<EstudianteStore>((set, get) => ({
  estudiantes: [],
  estudianteSeleccionado: null,
  isLoading: false,
  error: null,

  getEstudiantes: () => {
    set({ isLoading: true });
    // Simular una carga asíncrona
    setTimeout(() => {
      set({ estudiantes: estudiantesData, isLoading: false });
    }, 500);
  },

  getEstudiantesByProgramaId: (programaId) => {
    return get().estudiantes.filter(e => e.programaId === programaId);
  },

  getEstudiantesBySemestre: (programaId, semestre) => {
    return get().estudiantes.filter(e => e.programaId === programaId && e.semestre === semestre);
  },

  getEstudiantesByEstado: (estado) => {
    return get().estudiantes.filter(e => e.estado === estado);
  },

  getEstudianteById: (id) => {
    return get().estudiantes.find(e => e.id === id);
  },

  setEstudianteSeleccionado: (id) => {
    const estudiante = get().estudiantes.find(e => e.id === id);
    set({ estudianteSeleccionado: estudiante || null });
  },

  clearEstudianteSeleccionado: () => {
    set({ estudianteSeleccionado: null });
  },

  addEstudiante: (estudiante) => {
    const newId = Math.max(0, ...get().estudiantes.map(e => e.id)) + 1;
    set(state => ({
      estudiantes: [...state.estudiantes, { ...estudiante, id: newId }]
    }));
  },

  updateEstudiante: (id, estudiante) => {
    set(state => ({
      estudiantes: state.estudiantes.map(e => 
        e.id === id ? { ...e, ...estudiante } : e
      )
    }));
  },

  deleteEstudiante: (id) => {
    set(state => ({
      estudiantes: state.estudiantes.filter(e => e.id !== id)
    }));
  }
}));