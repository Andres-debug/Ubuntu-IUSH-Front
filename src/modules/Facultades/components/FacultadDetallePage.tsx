import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useFacultadStore } from '../../../app/stores/facultadStore';
import { useProgramaStore } from '../../../app/stores/programaStore';
import { BsArrowLeft, BsBuilding, BsCalendarEvent, BsPersonLinesFill, BsInfoCircle } from 'react-icons/bs';
import { FaGraduationCap } from 'react-icons/fa';

const FacultadDetallePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'informacion' | 'programas'>('informacion');
  
  // Stores
  const { facultades, getFacultades, isLoading: isLoadingFacultad } = useFacultadStore();
  const { programas, getProgramas, isLoading: isLoadingProgramas } = useProgramaStore();
  
  useEffect(() => {
    getFacultades();
    getProgramas();
  }, [getFacultades, getProgramas]);
  
  // Encontrar la facultad seleccionada
  const facultad = facultades.find(f => f.id === Number(id));
  
  // Filtrar programas por facultad
  const programasFacultad = programas.filter(p => p.facultadId === Number(id));
  
  // Si está cargando o no se encuentra la facultad
  if (isLoadingFacultad) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!facultad) {
    return (
      <div className="bg-red-100 p-4 rounded-lg shadow-sm border border-red-200 text-red-700">
        <h2 className="text-xl font-bold mb-2">Facultad no encontrada</h2>
        <p>No se pudo encontrar la facultad con el ID especificado.</p>
        <button 
          onClick={() => navigate('/facultades')}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Volver a Facultades
        </button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Cabecera con información de navegación */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <button 
          onClick={() => navigate('/facultades')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
        >
          <BsArrowLeft className="mr-2" />
          <span>Volver a facultades</span>
        </button>
        
        <div className="flex items-start">
          <div className="bg-blue-50 p-4 rounded-full mr-4">
            <BsBuilding className="text-blue-600 text-2xl" />
          </div>
          <div>
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">{facultad.nombre}</h1>
              <span className="ml-3 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                {facultad.codigo}
              </span>
            </div>
            <p className="text-gray-600 mt-1">
              Fundada el {facultad.fechaCreacion}
            </p>
          </div>
        </div>
      </div>
      
      {/* Pestañas de navegación */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'informacion' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('informacion')}
            >
              <div className="flex items-center">
                <BsInfoCircle className="mr-2" />
                Información
              </div>
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'programas' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('programas')}
            >
              <div className="flex items-center">
                <FaGraduationCap className="mr-2" />
                Programas ({programasFacultad.length})
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
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Acerca de la Facultad</h2>
                <div className="bg-gray-50 p-5 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">
                    {facultad.descripcion || "No hay descripción disponible para esta facultad."}
                  </p>
                </div>
              </div>
              
              {/* Detalles de la facultad */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                    <BsPersonLinesFill className="mr-2 text-blue-600" />
                    Liderazgo
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Decano</p>
                      <p className="text-gray-700 font-medium">{facultad.decano || "No asignado"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Contacto</p>
                      <p className="text-gray-700">decano.{facultad.codigo.toLowerCase()}@universidad.edu</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Oficina</p>
                      <p className="text-gray-700">Edificio Principal, Oficina {facultad.id}01</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                    <BsCalendarEvent className="mr-2 text-blue-600" />
                    Información Adicional
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Fecha de Fundación</p>
                      <p className="text-gray-700 font-medium">{facultad.fechaCreacion}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Número de Programas</p>
                      <p className="text-gray-700 font-medium">{programasFacultad.length}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Ubicación</p>
                      <p className="text-gray-700">Campus Central, Bloque {String.fromCharCode(65 + (facultad.id % 5))}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Estadísticas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <p className="text-sm text-blue-700">Programas de Pregrado</p>
                  <p className="text-2xl font-bold text-blue-800">
                    {programasFacultad.filter(p => p.nivel === 'Pregrado').length}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <p className="text-sm text-blue-700">Programas de Posgrado</p>
                  <p className="text-2xl font-bold text-blue-800">
                    {programasFacultad.filter(p => p.nivel === 'Posgrado' || p.nivel === 'Maestría' || p.nivel === 'Doctorado').length}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <p className="text-sm text-blue-700">Total Créditos Ofrecidos</p>
                  <p className="text-2xl font-bold text-blue-800">
                    {programasFacultad.reduce((sum, p) => sum + p.creditos, 0)}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Contenido de la pestaña Programas */}
          {activeTab === 'programas' && (
            <div>
              {isLoadingProgramas ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : programasFacultad.length > 0 ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
                    {programasFacultad.map(programa => (
                      <div 
                        key={programa.id}
                        className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                      >
                        <div className="p-5">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2 inline-block">
                                {programa.codigo}
                              </span>
                              <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{programa.nombre}</h3>
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ml-2 ${
                              programa.estado === 'Activo' 
                                ? 'bg-green-100 text-green-800' 
                                : programa.estado === 'Inactivo' 
                                  ? 'bg-red-100 text-red-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {programa.estado}
                            </span>
                          </div>
                          
                          <div className="text-sm text-gray-500 mb-3">
                            <p className="mb-1">{programa.nivel} • {programa.duracionSemestres} semestres</p>
                            <p>{programa.modalidad} • {programa.creditos} créditos</p>
                          </div>
                          
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {programa.descripcion || "No hay descripción disponible."}
                          </p>
                          
                          <Link 
                            to={`/programas/${programa.id}`}
                            className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-300"
                          >
                            Ver Programa
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <FaGraduationCap className="text-4xl text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No hay programas disponibles</h3>
                  <p className="text-gray-500">Esta facultad no tiene programas académicos asociados actualmente.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultadDetallePage;