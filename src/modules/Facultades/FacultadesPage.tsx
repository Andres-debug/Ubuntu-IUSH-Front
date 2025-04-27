import { useState, useEffect } from 'react';
import { BsGrid, BsListUl, BsEye, BsBuilding } from 'react-icons/bs';
import { useNavigate, Link } from 'react-router-dom';
import { useFacultadStore } from '../../app/stores/facultadStore';
import { Facultad } from '../../app/types';

// Componente de Facultades
const FacultadesPage = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Usar el store de facultades
  const { 
    facultades, 
    isLoading, 
    error, 
    getFacultades,
    setFacultadSeleccionada
  } = useFacultadStore();

  useEffect(() => {
    // Cargar las facultades al montar el componente
    getFacultades();
  }, [getFacultades]);

  const handleViewFacultad = (id: number) => {
    setFacultadSeleccionada(id);
    navigate(`/facultades/${id}`);
  };

  // Función para renderizar las tarjetas de las facultades en modo grid
  const renderGridView = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facultades.map((facultad) => (
          <div 
            key={facultad.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
          >
            <div className="p-6 flex flex-col h-full">
              {/* Encabezado de la tarjeta con mejor manejo para títulos largos */}
              <div className="flex items-start justify-between mb-4 gap-3">
                <div className="flex items-start">
                  <div className="bg-blue-50 p-2 rounded-full flex-shrink-0 mt-1">
                    <BsBuilding className="text-blue-600 text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 ml-3 break-words max-w-[170px]">{facultad.nombre}</h3>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1.5 rounded-full flex-shrink-0 whitespace-nowrap">
                  {facultad.codigo}
                </span>
              </div>
              
              {/* Descripción */}
              <div className="mb-5 flex-grow">
                <p className="text-gray-600 line-clamp-3">{facultad.descripcion || "No hay descripción disponible."}</p>
              </div>
              
              {/* Información adicional mejor estructurada */}
              <div className="grid grid-cols-1 gap-2 text-sm text-gray-600 mb-5 mt-auto">
                <div className="grid grid-cols-[100px_1fr] gap-1 items-center">
                  <span className="font-medium text-gray-700">Decano:</span>
                  <span className="text-right truncate">{facultad.decano || "No asignado"}</span>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-1 items-center">
                  <span className="font-medium text-gray-700">Creación:</span>
                  <span className="text-right">{facultad.fechaCreacion || "Fecha no disponible"}</span>
                </div>
              </div>
              
              {/* Botón de acción */}
              <button
                onClick={() => handleViewFacultad(facultad.id)}
                className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-md transition-colors duration-300"
              >
                <BsEye className="mr-2" />
                Ver Detalle
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Función para renderizar la tabla de facultades en modo lista
  const renderListView = () => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Decano</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Creación</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {facultades.map((facultad) => (
              <tr key={facultad.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-sm font-medium text-gray-900">{facultad.codigo}</td>
                <td className="py-3 px-4 text-sm text-gray-900">{facultad.nombre}</td>
                <td className="py-3 px-4 text-sm text-gray-500">{facultad.decano}</td>
                <td className="py-3 px-4 text-sm text-gray-500">{facultad.fechaCreacion}</td>
                <td className="py-3 px-4 text-sm">
                  <button
                    onClick={() => handleViewFacultad(facultad.id)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <BsEye className="inline mr-1" /> Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Facultades</h1>
          <p className="text-gray-600">
            Gestiona las facultades de la institución
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center">
          <div className="mr-4 border rounded-md overflow-hidden flex">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 flex items-center ${
                viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
              }`}
            >
              <BsGrid className="mr-2" /> Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 flex items-center ${
                viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
              }`}
            >
              <BsListUl className="mr-2" /> Lista
            </button>
          </div>
        </div>
      </div>

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
        <div>
          {viewMode === 'grid' ? renderGridView() : renderListView()}
        </div>
      )}
    </div>
  );
};

export default FacultadesPage;