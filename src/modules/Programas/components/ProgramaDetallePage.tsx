import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProgramaStore } from '../../../app/stores/programaStore';
import { useFacultadStore } from '../../../app/stores/facultadStore';
import { useEstudianteStore } from '../../../app/stores/estudianteStore';
import { useMateriaStore } from '../../../app/stores/materiaStore';
import { BsArrowLeft, BsCalendarEvent, BsBookHalf, BsPeople, BsInfoCircle, BsGear, BsPersonLinesFill } from 'react-icons/bs';
import { FaGraduationCap } from 'react-icons/fa';

const ProgramaDetallePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'informacion' | 'estudiantes' | 'materias'>('informacion');
  
  // Stores
  const { 
    programas, 
    programaSeleccionado, 
    getProgramas, 
    setProgramaSeleccionado,
    isLoading: isLoadingPrograma 
  } = useProgramaStore();
  
  const { facultades, getFacultades } = useFacultadStore();
  const { estudiantes, getEstudiantes } = useEstudianteStore();
  const { materias, getMaterias } = useMateriaStore();
  
  useEffect(() => {
    // Cargar datos iniciales
    getProgramas();
    getFacultades();
    getEstudiantes();
    getMaterias();
    
    // Seleccionar el programa actual
    if (id) {
      setProgramaSeleccionado(Number(id));
    }
    
    return () => {
      // Limpiar programa seleccionado al desmontar
      // No implementado aquí para mantener el estado entre navegaciones
    };
  }, [id, getProgramas, getFacultades, getEstudiantes, getMaterias, setProgramaSeleccionado]);
  
  // Estudiantes del programa
  const estudiantesPrograma = estudiantes.filter(e => e.programaId === Number(id));
  
  // Materias del programa (simulado, se debería basar en la relación real)
  // Asumimos que materias tienen una propiedad programaId
  const materiasPrograma = materias.filter(m => m.programaId === Number(id));
  
  // Obtener la facultad del programa
  const getFacultad = () => {
    if (!programaSeleccionado) return null;
    return facultades.find(f => f.id === programaSeleccionado.facultadId);
  };
  
  const facultad = getFacultad();
  
  // Si está cargando o no se encuentra el programa
  if (isLoadingPrograma) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!programaSeleccionado) {
    return (
      <div className="bg-red-100 p-4 rounded-lg shadow-sm border border-red-200 text-red-700">
        <h2 className="text-xl font-bold mb-2">Programa no encontrado</h2>
        <p>No se pudo encontrar el programa con el ID especificado.</p>
        <button 
          onClick={() => navigate('/programas')}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Volver a Programas
        </button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Cabecera con información de navegación */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <button 
          onClick={() => navigate('/programas')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
        >
          <BsArrowLeft className="mr-2" />
          <span>Volver a programas</span>
        </button>
        
        <div className="flex items-start">
          <div className="bg-blue-50 p-4 rounded-full mr-4">
            <FaGraduationCap className="text-blue-600 text-2xl" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-800">{programaSeleccionado.nombre}</h1>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                  {programaSeleccionado.codigo}
                </span>
                {programaSeleccionado.estado && (
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    programaSeleccionado.estado === 'Activo' 
                      ? 'bg-green-100 text-green-800' 
                      : programaSeleccionado.estado === 'Inactivo' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {programaSeleccionado.estado}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm text-gray-600">
              <span>{programaSeleccionado.nivel}</span>
              <span className="mx-2">•</span>
              <span>{programaSeleccionado.modalidad}</span>
              <span className="mx-2">•</span>
              <span>{programaSeleccionado.duracionSemestres} semestres</span>
              <span className="mx-2">•</span>
              <span>{programaSeleccionado.creditos} créditos</span>
            </div>
            <div className="mt-1">
              {facultad && (
                <Link to={`/facultades/${facultad.id}`} className="text-sm text-blue-600 hover:underline">
                  {facultad.nombre}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Pestañas de navegación */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            <button
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${
                activeTab === 'informacion' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('informacion')}
            >
              <div className="flex items-center">
                <BsInfoCircle className="mr-2" />
                Información General
              </div>
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${
                activeTab === 'estudiantes' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('estudiantes')}
            >
              <div className="flex items-center">
                <BsPeople className="mr-2" />
                Estudiantes ({estudiantesPrograma.length})
              </div>
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${
                activeTab === 'materias' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('materias')}
            >
              <div className="flex items-center">
                <BsBookHalf className="mr-2" />
                Materias ({materiasPrograma.length})
              </div>
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {/* Contenido de la pestaña Información */}
          {activeTab === 'informacion' && (
            <div className="space-y-6">
              {/* Descripción */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Descripción del Programa</h2>
                <div className="bg-gray-50 p-5 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">
                    {programaSeleccionado.descripcion || "No hay descripción disponible para este programa."}
                  </p>
                </div>
              </div>
              
              {/* Detalles del programa */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                    <BsGear className="mr-2 text-blue-600" />
                    Información Académica
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nivel:</span>
                      <span className="font-medium text-gray-800">{programaSeleccionado.nivel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Modalidad:</span>
                      <span className="font-medium text-gray-800">{programaSeleccionado.modalidad}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duración:</span>
                      <span className="font-medium text-gray-800">{programaSeleccionado.duracionSemestres} semestres</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Créditos:</span>
                      <span className="font-medium text-gray-800">{programaSeleccionado.creditos}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Facultad:</span>
                      {facultad ? (
                        <Link to={`/facultades/${facultad.id}`} className="font-medium text-blue-600 hover:underline">
                          {facultad.nombre}
                        </Link>
                      ) : (
                        <span className="font-medium text-gray-800">No asignada</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                    <BsPersonLinesFill className="mr-2 text-blue-600" />
                    Contacto y Administración
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Director:</span>
                      <span className="font-medium text-gray-800">{programaSeleccionado.director || "No asignado"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium text-gray-800">programa.{programaSeleccionado.codigo.toLowerCase()}@universidad.edu</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fecha Creación:</span>
                      <span className="font-medium text-gray-800">{programaSeleccionado.fechaCreacion}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estado:</span>
                      <span className={`font-medium px-2 py-0.5 rounded-full text-xs ${
                        programaSeleccionado.estado === 'Activo' ? 'bg-green-100 text-green-800' : 
                          programaSeleccionado.estado === 'Inactivo' ? 'bg-gray-100 text-gray-800' : 
                          'bg-yellow-100 text-yellow-800'
                      }`}>
                        {programaSeleccionado.estado}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Estadísticas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <p className="text-sm text-blue-700">Estudiantes Activos</p>
                  <p className="text-2xl font-bold text-blue-800">
                    {estudiantesPrograma.filter(e => e.estado === 'Activo').length}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <p className="text-sm text-blue-700">Materias en Pensum</p>
                  <p className="text-2xl font-bold text-blue-800">
                    {materiasPrograma.length}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <p className="text-sm text-blue-700">Semestres Disponibles</p>
                  <p className="text-2xl font-bold text-blue-800">
                    {programaSeleccionado.duracionSemestres}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Contenido de la pestaña Estudiantes */}
          {activeTab === 'estudiantes' && (
            <div>
              {estudiantesPrograma.length > 0 ? (
                <div className="space-y-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carnet</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semestre</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ingreso</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {estudiantesPrograma.map(estudiante => (
                          <tr key={estudiante.id} className="hover:bg-gray-50">
                            <td className="py-3 px-4 text-sm font-medium text-gray-900">{estudiante.carnet}</td>
                            <td className="py-3 px-4 text-sm text-gray-900">{estudiante.nombre} {estudiante.apellido}</td>
                            <td className="py-3 px-4 text-sm text-gray-500">{estudiante.semestre}</td>
                            <td className="py-3 px-4 text-sm">
                              <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                                estudiante.estado === 'Activo' ? 'bg-green-100 text-green-800' : 
                                estudiante.estado === 'Inactivo' ? 'bg-red-100 text-red-800' : 
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {estudiante.estado}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-500">{estudiante.fechaIngreso}</td>
                            <td className="py-3 px-4 text-sm text-blue-600 hover:text-blue-800">
                              <button className="hover:underline">Ver perfil</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <BsPeople className="text-4xl text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No hay estudiantes matriculados</h3>
                  <p className="text-gray-500">Este programa aún no tiene estudiantes matriculados.</p>
                </div>
              )}
            </div>
          )}
          
          {/* Contenido de la pestaña Materias */}
          {activeTab === 'materias' && (
            <div>
              {materiasPrograma.length > 0 ? (
                <div className="space-y-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Créditos</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semestre</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {materiasPrograma.map(materia => (
                          <tr key={materia.id} className="hover:bg-gray-50">
                            <td className="py-3 px-4 text-sm font-medium text-gray-900">{materia.codigo}</td>
                            <td className="py-3 px-4 text-sm text-gray-900">{materia.nombre}</td>
                            <td className="py-3 px-4 text-sm text-gray-500">{materia.creditos}</td>
                            <td className="py-3 px-4 text-sm text-gray-500">{materia.semestre}</td>
                            <td className="py-3 px-4 text-sm">
                              <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                                materia.tipo === 'Obligatoria' ? 'bg-blue-100 text-blue-800' : 
                                materia.tipo === 'Electiva' ? 'bg-purple-100 text-purple-800' : 
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {materia.tipo}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-sm text-blue-600 hover:text-blue-800">
                              <button className="hover:underline">Ver detalle</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <BsBookHalf className="text-4xl text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No hay materias registradas</h3>
                  <p className="text-gray-500">Este programa aún no tiene materias en su plan de estudios.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramaDetallePage;