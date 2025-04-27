import { useState, useEffect } from 'react';
import { BsGrid, BsListUl, BsEye, BsBook, BsPeople } from 'react-icons/bs';
import { useNavigate, Link } from 'react-router-dom';
import { useProgramaStore } from '../../app/stores/programaStore';
import { useFacultadStore } from '../../app/stores/facultadStore';
import { Programa } from '../../app/types';

// Componente tarjeta para modo lista
const ProgramaListItem = ({ programa, facultadNombre, onVerDetalle }: { 
  programa: Programa, 
  facultadNombre: string,
  onVerDetalle: (programa: Programa) => void 
}) => (
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
        <span className="text-sm text-gray-600">{facultadNombre}</span>
        <span className="text-sm text-gray-500">• {programa.duracionSemestres} semestres</span>
      </div>
    </div>
    <button 
      onClick={() => onVerDetalle(programa)}
      className="flex items-center justify-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors border border-blue-200"
    >
      <BsEye />
      <span>Ver detalle</span>
    </button>
  </div>
);

// Componente tarjeta para modo card
const ProgramaCard = ({ programa, facultadNombre, onVerDetalle }: { 
  programa: Programa, 
  facultadNombre: string,
  onVerDetalle: (programa: Programa) => void 
}) => (
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
          <span>{facultadNombre}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>{programa.duracionSemestres} semestres</span>
          <span>{programa.creditos} créditos</span>
        </div>
      </div>
      <button 
        onClick={() => onVerDetalle(programa)}
        className="w-full mt-4 flex items-center justify-center space-x-2 bg-white text-blue-600 py-2 rounded-md hover:bg-blue-50 transition-colors border border-blue-200"
      >
        <BsEye />
        <span>Ver detalle</span>
      </button>
    </div>
  </div>
);

const ProgramasPage = () => {
  const navigate = useNavigate();
  const [vistaCards, setVistaCards] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [modoDetalle, setModoDetalle] = useState(false);
  const [pestanaActiva, setPestanaActiva] = useState<'general' | 'estudiantes' | 'materias'>('general');

  // Usar los stores
  const {
    programas,
    programaSeleccionado,
    isLoading,
    error,
    getProgramas,
    setProgramaSeleccionado,
    clearProgramaSeleccionado
  } = useProgramaStore();

  const { facultades, getFacultades } = useFacultadStore();

  useEffect(() => {
    // Cargar los programas y facultades al montar el componente
    getProgramas();
    getFacultades();
  }, [getProgramas, getFacultades]);

  useEffect(() => {
    document.title = modoDetalle ? `${programaSeleccionado?.nombre || 'Programa'} | OmegaLab` : 'Programas Académicos | OmegaLab';
  }, [modoDetalle, programaSeleccionado]);

  // Filtrar programas según la búsqueda
  const programasFiltrados = programas.filter(programa => 
    programa.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    programa.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
    getFacultadNombre(programa.facultadId).toLowerCase().includes(busqueda.toLowerCase())
  );

  // Obtener el nombre de la facultad por su ID
  const getFacultadNombre = (facultadId: number): string => {
    const facultad = facultades.find(f => f.id === facultadId);
    return facultad ? facultad.nombre : 'Facultad no encontrada';
  };

  const verDetallePrograma = (programa: Programa) => {
    setProgramaSeleccionado(programa.id);
    setModoDetalle(true);
    setPestanaActiva('general');
  };

  const volverALista = () => {
    clearProgramaSeleccionado();
    setModoDetalle(false);
  };

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
                  {getFacultadNombre(programaSeleccionado.facultadId)}
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
                Estudiantes
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium border-b-2 ${
                  pestanaActiva === 'materias' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setPestanaActiva('materias')}
              >
                Materias
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
                        <span className="text-gray-600">Nivel:</span>
                        <span className="font-medium text-gray-800">{programaSeleccionado.nivel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duración:</span>
                        <span className="font-medium text-gray-800">{programaSeleccionado.duracionSemestres} semestres</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Créditos:</span>
                        <span className="font-medium text-gray-800">{programaSeleccionado.creditos}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Modalidad:</span>
                        <span className="font-medium text-gray-800">{programaSeleccionado.modalidad}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Facultad:</span>
                        <Link to={`/facultades/${programaSeleccionado.facultadId}`} className="font-medium text-blue-600 hover:underline">
                          {getFacultadNombre(programaSeleccionado.facultadId)}
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
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fecha Creación:</span>
                        <p className="font-medium text-gray-800">{programaSeleccionado.fechaCreacion}</p>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Estado:</span>
                        <span className={`font-medium px-2 py-0.5 rounded-full text-xs
                          ${programaSeleccionado.estado === 'Activo' ? 'bg-green-100 text-green-800' : 
                            programaSeleccionado.estado === 'Inactivo' ? 'bg-gray-100 text-gray-800' : 
                            'bg-yellow-100 text-yellow-800'}`}>
                          {programaSeleccionado.estado}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Contenido de la pestaña Estudiantes */}
            {pestanaActiva === 'estudiantes' && (
              <div>
                <div className="text-center py-8">
                  <p className="text-gray-500">Próximamente: Lista de estudiantes matriculados en este programa.</p>
                </div>
              </div>
            )}
            
            {/* Contenido de la pestaña Materias */}
            {pestanaActiva === 'materias' && (
              <div>
                <div className="text-center py-8">
                  <p className="text-gray-500">Próximamente: Pensum académico del programa.</p>
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
          
          {/* Mensaje de carga */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          ) : (
            <>
              {/* Lista de programas */}
              {vistaCards ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {programasFiltrados.map(programa => (
                    <ProgramaCard 
                      key={programa.id} 
                      programa={programa} 
                      facultadNombre={getFacultadNombre(programa.facultadId)}
                      onVerDetalle={verDetallePrograma}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {programasFiltrados.map(programa => (
                    <ProgramaListItem 
                      key={programa.id} 
                      programa={programa} 
                      facultadNombre={getFacultadNombre(programa.facultadId)}
                      onVerDetalle={verDetallePrograma}
                    />
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
        </>
      )}
    </div>
  );
};

export default ProgramasPage;