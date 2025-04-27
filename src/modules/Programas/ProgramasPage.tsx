import { useState, useEffect } from 'react';
import { BsGrid, BsListUl, BsEye, BsBook, BsPeople } from 'react-icons/bs';
import { useNavigate, Link } from 'react-router-dom';

// Interfaces para el tipado
interface Estudiante {
  id: number;
  nombre: string;
  carnet: string;
  semestre: number;
  promedio: number;
}

interface Materia {
  id: number;
  codigo: string;
  nombre: string;
  creditos: number;
  semestre: number;
  profesor: string;
}

interface Programa {
  id: number;
  codigo: string;
  nombre: string;
  facultadId: number;
  facultadNombre: string;
  director: string;
  cantidadSemestres: number;
  cantidadMaterias: number;
  descripcion: string;
  estudiantes: Estudiante[];
  materias: Materia[];
  estado?: 'Activo' | 'Inactivo' | 'Suspendido';
}

// Datos de ejemplo
const programasData: Programa[] = [
  {
    id: 1,
    codigo: "ING-001",
    nombre: "Ingeniería de Sistemas",
    facultadId: 1,
    facultadNombre: "Facultad de Ingeniería",
    director: "Dr. Carlos Ramírez",
    cantidadSemestres: 10,
    cantidadMaterias: 55,
    descripcion: "Programa orientado al desarrollo de software, redes, seguridad informática y sistemas de información.",
    estudiantes: [
      { id: 101, nombre: "Ana María López", carnet: "EST-2021-101", semestre: 5, promedio: 4.2 },
      { id: 102, nombre: "Juan Carlos Pérez", carnet: "EST-2022-102", semestre: 3, promedio: 3.8 },
      { id: 103, nombre: "María Fernanda Díaz", carnet: "EST-2021-103", semestre: 5, promedio: 4.5 }
    ],
    materias: [
      { id: 201, codigo: "MAT-101", nombre: "Cálculo Diferencial", creditos: 4, semestre: 1, profesor: "Dr. Andrés Gómez" },
      { id: 202, codigo: "PROG-201", nombre: "Programación Orientada a Objetos", creditos: 3, semestre: 2, profesor: "Dra. Laura Sánchez" },
      { id: 203, codigo: "BD-301", nombre: "Bases de Datos", creditos: 4, semestre: 3, profesor: "Dr. Roberto Martínez" }
    ]
  },
  {
    id: 2,
    codigo: "ADM-001",
    nombre: "Administración de Empresas",
    facultadId: 2,
    facultadNombre: "Facultad de Ciencias Económicas",
    director: "Dra. María López",
    cantidadSemestres: 9,
    cantidadMaterias: 48,
    descripcion: "Programa enfocado en la gestión empresarial, estrategia, marketing y recursos humanos.",
    estudiantes: [
      { id: 104, nombre: "Carlos Alberto Gutiérrez", carnet: "EST-2022-104", semestre: 3, promedio: 4.0 },
      { id: 105, nombre: "Andrea Ramírez", carnet: "EST-2023-105", semestre: 1, promedio: 3.9 }
    ],
    materias: [
      { id: 204, codigo: "ECO-101", nombre: "Principios de Economía", creditos: 3, semestre: 1, profesor: "Dr. Jorge Hernández" },
      { id: 205, codigo: "MARK-201", nombre: "Marketing Estratégico", creditos: 3, semestre: 2, profesor: "Dra. Paula Torres" }
    ]
  },
  {
    id: 3,
    codigo: "DER-001",
    nombre: "Derecho",
    facultadId: 3,
    facultadNombre: "Facultad de Derecho",
    director: "Dr. Luis Mendoza",
    cantidadSemestres: 10,
    cantidadMaterias: 60,
    descripcion: "Programa centrado en el estudio del sistema legal, derecho civil, penal, laboral y constitucional.",
    estudiantes: [
      { id: 106, nombre: "Sofía Martínez", carnet: "EST-2021-106", semestre: 6, promedio: 4.3 },
      { id: 107, nombre: "Daniel Torres", carnet: "EST-2022-107", semestre: 4, promedio: 3.7 }
    ],
    materias: [
      { id: 206, codigo: "DCO-101", nombre: "Derecho Constitucional", creditos: 4, semestre: 1, profesor: "Dra. Carmen Rodríguez" },
      { id: 207, codigo: "DCP-201", nombre: "Derecho Civil: Personas", creditos: 3, semestre: 2, profesor: "Dr. Francisco Pérez" }
    ]
  }
];

const ProgramasPage = () => {
  const navigate = useNavigate();
  const [vistaCards, setVistaCards] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [modoDetalle, setModoDetalle] = useState(false);
  const [programaSeleccionado, setProgramaSeleccionado] = useState<Programa | null>(null);
  const [pestanaActiva, setPestanaActiva] = useState<'general' | 'estudiantes' | 'materias'>('general');

  useEffect(() => {
    document.title = modoDetalle ? `${programaSeleccionado?.nombre || 'Programa'} | OmegaLab` : 'Programas Académicos | OmegaLab';
  }, [modoDetalle, programaSeleccionado]);

  // Filtrar programas según la búsqueda
  const programasFiltrados = programasData.filter(programa => 
    programa.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    programa.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
    programa.facultadNombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const verDetallePrograma = (programa: Programa) => {
    setProgramaSeleccionado(programa);
    setModoDetalle(true);
    setPestanaActiva('general');
  };

  const volverALista = () => {
    setModoDetalle(false);
    setProgramaSeleccionado(null);
  };

  // Componente tarjeta para modo lista
  const ProgramaListItem = ({ programa }: { programa: Programa }) => (
    <div className="bg-white p-4 rounded-lg mb-2 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between hover:bg-gray-50 transition-colors">
      <div className="mb-3 md:mb-0 flex-grow">
        <div className="flex flex-col md:flex-row md:items-center">
          <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-2 md:mb-0 md:mr-3 bg-blue-100 text-blue-800">
            {programa.codigo}
          </span>
          <h2 className="text-lg font-medium text-gray-800">{programa.nombre}</h2>
          {programa.estado && (
            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ml-3 
              ${programa.estado === 'Activo' ? 'bg-green-100 text-green-800' : 
                programa.estado === 'Inactivo' ? 'bg-gray-100 text-gray-800' : 
                'bg-yellow-100 text-yellow-800'}`}>
              {programa.estado}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-sm text-gray-600">{programa.facultadNombre}</span>
          <span className="text-sm text-gray-500">• {programa.cantidadSemestres} semestres</span>
        </div>
      </div>
      <button 
        onClick={() => verDetallePrograma(programa)}
        className="flex items-center justify-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors border border-blue-200"
      >
        <BsEye />
        <span>Ver detalle</span>
      </button>
    </div>
  );

  // Componente tarjeta para modo card
  const ProgramaCard = ({ programa }: { programa: Programa }) => (
    <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm transition-transform hover:shadow-md">
      <div className="flex flex-col h-full">
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 text-blue-800">{programa.codigo}</span>
            {programa.estado && (
              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold
                ${programa.estado === 'Activo' ? 'bg-green-100 text-green-800' : 
                  programa.estado === 'Inactivo' ? 'bg-gray-100 text-gray-800' : 
                  'bg-yellow-100 text-yellow-800'}`}>
                {programa.estado}
              </span>
            )}
          </div>
          <h2 className="text-lg font-medium mb-2 text-gray-800">{programa.nombre}</h2>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{programa.descripcion}</p>
          <div className="flex items-center text-sm text-gray-500 mb-1">
            <span>{programa.facultadNombre}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>{programa.cantidadSemestres} semestres</span>
            <span>{programa.cantidadMaterias} materias</span>
          </div>
        </div>
        <button 
          onClick={() => verDetallePrograma(programa)}
          className="w-full mt-4 flex items-center justify-center space-x-2 bg-white text-blue-600 py-2 rounded-md hover:bg-blue-50 transition-colors border border-blue-200"
        >
          <BsEye />
          <span>Ver detalle</span>
        </button>
      </div>
    </div>
  );

  // Vista de detalle de un programa
  const DetallePrograma = () => {
    if (!programaSeleccionado) return null;

    return (
      <div className="space-y-6">
        {/* Cabecera con información de navegación */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <button 
              onClick={volverALista}
              className="mr-4 p-2 rounded-full hover:bg-gray-100 text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{programaSeleccionado.nombre}</h1>
              <div className="flex items-center mt-1">
                <span className="text-sm text-gray-500">{programaSeleccionado.codigo}</span>
                <span className="mx-2 text-gray-300">•</span>
                <Link to={`/facultades/${programaSeleccionado.facultadId}`} className="text-sm text-blue-600 hover:underline">
                  {programaSeleccionado.facultadNombre}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Pestañas de navegación */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                className={`px-4 py-3 text-sm font-medium border-b-2 ${
                  pestanaActiva === 'general' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setPestanaActiva('general')}
              >
                Información General
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium border-b-2 ${
                  pestanaActiva === 'estudiantes' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setPestanaActiva('estudiantes')}
              >
                Estudiantes ({programaSeleccionado.estudiantes.length})
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium border-b-2 ${
                  pestanaActiva === 'materias' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setPestanaActiva('materias')}
              >
                Materias ({programaSeleccionado.materias.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Contenido de la pestaña General */}
            {pestanaActiva === 'general' && (
              <div>
                <p className="text-gray-600 mb-6">{programaSeleccionado.descripcion}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Información del Programa</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Código:</span>
                        <span className="font-medium text-gray-800">{programaSeleccionado.codigo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duración:</span>
                        <span className="font-medium text-gray-800">{programaSeleccionado.cantidadSemestres} semestres</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cantidad de materias:</span>
                        <span className="font-medium text-gray-800">{programaSeleccionado.cantidadMaterias}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Facultad:</span>
                        <Link to={`/facultades/${programaSeleccionado.facultadId}`} className="font-medium text-blue-600 hover:underline">
                          {programaSeleccionado.facultadNombre}
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Contacto</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Director:</span>
                        <p className="font-medium text-gray-800">{programaSeleccionado.director}</p>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <p className="font-medium text-gray-800">programa.{programaSeleccionado.codigo.toLowerCase()}@universidad.edu</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Contenido de la pestaña Estudiantes */}
            {pestanaActiva === 'estudiantes' && (
              <div>
                <div className="overflow-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estudiante</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carnet</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semestre</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Promedio</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {programaSeleccionado.estudiantes.map(estudiante => (
                        <tr key={estudiante.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {estudiante.nombre}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {estudiante.carnet}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {estudiante.semestre}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {estudiante.promedio.toFixed(1)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {/* Contenido de la pestaña Materias */}
            {pestanaActiva === 'materias' && (
              <div>
                <div className="overflow-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Materia</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Créditos</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semestre</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profesor</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {programaSeleccionado.materias.map(materia => (
                        <tr key={materia.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {materia.codigo}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {materia.nombre}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {materia.creditos}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {materia.semestre}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {materia.profesor}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Si estamos en detalle, mostramos la vista de detalle */}
      {modoDetalle && programaSeleccionado ? (
        <DetallePrograma />
      ) : (
        <>
          {/* Cabecera */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Programas Académicos</h1>
                <p className="text-gray-600 mt-1">Gestiona y visualiza la información de los programas ofrecidos.</p>
              </div>

              {/* Botones para cambiar la vista */}
              <div className="mt-4 md:mt-0 flex items-center space-x-3">
                <div className="flex bg-gray-100 p-1 rounded-lg">
                  <button 
                    onClick={() => setVistaCards(true)}
                    className={`px-3 py-2 rounded-md flex items-center space-x-1 ${vistaCards ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
                  >
                    <BsGrid className="text-lg" />
                    <span className="text-sm font-medium">Cards</span>
                  </button>
                  <button 
                    onClick={() => setVistaCards(false)}
                    className={`px-3 py-2 rounded-md flex items-center space-x-1 ${!vistaCards ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
                  >
                    <BsListUl className="text-lg" />
                    <span className="text-sm font-medium">Lista</span>
                  </button>
                </div>
                
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Buscar programa..." 
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="px-4 py-2 pl-8 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  />
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 absolute left-2.5 top-3 text-gray-400" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Lista de programas */}
          {vistaCards ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programasFiltrados.map(programa => (
                <ProgramaCard key={programa.id} programa={programa} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {programasFiltrados.map(programa => (
                <ProgramaListItem key={programa.id} programa={programa} />
              ))}
            </div>
          )}
          
          {/* Mensaje si no hay resultados */}
          {programasFiltrados.length === 0 && (
            <div className="text-center py-8 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">No se encontraron programas que coincidan con tu búsqueda.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProgramasPage;