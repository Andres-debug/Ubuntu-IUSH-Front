import { useState, useEffect } from 'react';
import { 
  HiOutlineExclamationCircle, 
  HiOutlineCheckCircle, 
  HiOutlineChartBar 
} from 'react-icons/hi';
import { FaRegSadTear, FaRegMeh, FaRegSmile } from 'react-icons/fa';
import { IoFilterOutline } from 'react-icons/io5';
import { useAnalisisEstresStore } from '../../app/stores/analisisEstresStore';
import { useEstudianteStore } from '../../app/stores/estudianteStore';
import { useProgramaStore } from '../../app/stores/programaStore';
import { AnalisisEstres } from '../../app/types';

// Componente para la barra de indicador
const IndicadorBarra = ({ valor, etiqueta }: { valor: number, etiqueta: string }) => {
  let color = '';
  let icono = null;

  if (valor >= 70) {
    color = 'bg-red-500';
    icono = <FaRegSadTear className="text-red-500" />;
  } else if (valor >= 40) {
    color = 'bg-yellow-500';
    icono = <FaRegMeh className="text-yellow-500" />;
  } else {
    color = 'bg-green-500';
    icono = <FaRegSmile className="text-green-500" />;
  }

  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-gray-600">{etiqueta}</span>
        <div className="flex items-center">
          <span className={`text-sm font-medium ${valor >= 70 ? 'text-red-600' : valor >= 40 ? 'text-yellow-600' : 'text-green-600'}`}>
            {valor}%
          </span>
          <span className="ml-2">{icono}</span>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`${color} h-2 rounded-full`} 
          style={{ width: `${valor}%` }}
        ></div>
      </div>
    </div>
  );
};

// Tarjeta de estudiante
const EstudianteTarjeta = ({ analisis, estudiante }: { 
  analisis: AnalisisEstres, 
  estudiante: { nombre: string, apellido: string, programa: string, carnet: string, semestre: number }
}) => {
  // Determinar el estado basado en el nivel de estrés
  const getEstadoEstudiante = () => {
    if (analisis.nivelEstres >= 70 || analisis.nivelAnsiedad >= 70 || analisis.riesgoDesercion >= 70) {
      return {
        texto: "Alto riesgo",
        color: "text-red-600",
        bgColor: "bg-red-100",
        icono: <HiOutlineExclamationCircle className="text-red-600" />
      };
    } else if (analisis.nivelEstres >= 40 || analisis.nivelAnsiedad >= 40 || analisis.riesgoDesercion >= 40) {
      return {
        texto: "Precaución",
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
        icono: <HiOutlineExclamationCircle className="text-yellow-600" />
      };
    } else {
      return {
        texto: "Saludable",
        color: "text-green-600",
        bgColor: "bg-green-100",
        icono: <HiOutlineCheckCircle className="text-green-600" />
      };
    }
  };

  const estado = getEstadoEstudiante();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{estudiante.nombre} {estudiante.apellido}</h3>
          <p className="text-sm text-gray-500">{estudiante.carnet} • {estudiante.programa}</p>
          <p className="text-xs text-gray-500">Semestre {estudiante.semestre}</p>
        </div>
        <span className={`flex items-center px-3 py-1 text-sm rounded-full ${estado.bgColor} ${estado.color}`}>
          {estado.icono}
          <span className="ml-1 font-medium">{estado.texto}</span>
        </span>
      </div>

      <div className="space-y-4 mt-4">
        <IndicadorBarra valor={analisis.nivelEstres} etiqueta="Nivel de Estrés" />
        <IndicadorBarra valor={analisis.nivelAnsiedad} etiqueta="Nivel de Ansiedad" />
        <IndicadorBarra valor={analisis.riesgoDesercion} etiqueta="Riesgo de Deserción" />
      </div>

      <div className="mt-5 pt-5 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-xs text-gray-500">Asistencia</p>
            <p className={`text-sm font-medium ${analisis.indicadores.asistencia < 70 ? 'text-red-600' : 'text-gray-700'}`}>
              {analisis.indicadores.asistencia}%
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Rendimiento</p>
            <p className={`text-sm font-medium ${analisis.indicadores.rendimiento < 70 ? 'text-red-600' : 'text-gray-700'}`}>
              {analisis.indicadores.rendimiento}%
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Carga Acad.</p>
            <p className={`text-sm font-medium ${analisis.indicadores.cargaAcademica > 45 ? 'text-red-600' : 'text-gray-700'}`}>
              {analisis.indicadores.cargaAcademica}h
            </p>
          </div>
        </div>
        <p className="text-xs text-center text-gray-400 mt-3">
          Actualizado: {analisis.ultimaActualizacion}
        </p>
      </div>
    </div>
  );
};

const AnalisisEstresPage = () => {
  const [filtro, setFiltro] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  // Usar los stores de Zustand
  const { 
    analisisEstres, 
    isLoading, 
    error, 
    getAnalisisEstres 
  } = useAnalisisEstresStore();

  const { estudiantes, getEstudiantes } = useEstudianteStore();
  const { programas, getProgramas } = useProgramaStore();

  useEffect(() => {
    // Cargar los datos necesarios
    getAnalisisEstres();
    getEstudiantes();
    getProgramas();
  }, [getAnalisisEstres, getEstudiantes, getProgramas]);

  // Preparar los datos combinados para mostrar
  const analisisConInfo = analisisEstres.map(analisis => {
    const estudiante = estudiantes.find(e => e.id === analisis.estudianteId);
    const programa = estudiante ? programas.find(p => p.id === estudiante.programaId) : null;
    
    return {
      analisis,
      estudiante: estudiante ? {
        nombre: estudiante.nombre,
        apellido: estudiante.apellido,
        carnet: estudiante.carnet,
        semestre: estudiante.semestre,
        programa: programa ? programa.nombre : 'Programa no encontrado'
      } : {
        nombre: 'Estudiante',
        apellido: 'Desconocido',
        carnet: 'N/A',
        semestre: 0,
        programa: 'Programa no encontrado'
      }
    };
  });

  // Filtrar análisis basados en el estado actual
  const analisisFiltrados = analisisConInfo.filter(item => {
    const { analisis, estudiante } = item;
    
    // Aplicar filtro por nivel de riesgo
    if (filtro === 'alto-riesgo' && 
        !(analisis.nivelEstres >= 70 || analisis.nivelAnsiedad >= 70 || analisis.riesgoDesercion >= 70)) {
      return false;
    } else if (filtro === 'precaucion' && 
              !((analisis.nivelEstres >= 40 && analisis.nivelEstres < 70) || 
                (analisis.nivelAnsiedad >= 40 && analisis.nivelAnsiedad < 70) || 
                (analisis.riesgoDesercion >= 40 && analisis.riesgoDesercion < 70))) {
      return false;
    } else if (filtro === 'saludable' && 
              !(analisis.nivelEstres < 40 && analisis.nivelAnsiedad < 40 && analisis.riesgoDesercion < 40)) {
      return false;
    }
    
    // Aplicar búsqueda
    if (busqueda) {
      const terminoBusqueda = busqueda.toLowerCase();
      const nombreCompleto = `${estudiante.nombre} ${estudiante.apellido}`.toLowerCase();
      return nombreCompleto.includes(terminoBusqueda) || 
             estudiante.carnet.toLowerCase().includes(terminoBusqueda) ||
             estudiante.programa.toLowerCase().includes(terminoBusqueda);
    }
    
    return true;
  });

  // Calcular estadísticas generales
  const totalEstudiantes = analisisEstres.length;
  const estudiantesRiesgo = analisisEstres.filter(a => 
    a.nivelEstres >= 70 || a.nivelAnsiedad >= 70 || a.riesgoDesercion >= 70
  ).length;
  const estudiantesSaludable = analisisEstres.filter(a => 
    a.nivelEstres < 40 && a.nivelAnsiedad < 40 && a.riesgoDesercion < 40
  ).length;
  const porcentajeRiesgo = Math.round((estudiantesRiesgo / totalEstudiantes) * 100) || 0;

  return (
    <div className="space-y-6">
      {/* Cabecera */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold mb-2 text-gray-800">Análisis de Salud Mental</h1>
        <p className="text-gray-600">
          Monitoreo de estrés académico, ansiedad y riesgo de deserción basado en notas, asistencia y carga horaria.
        </p>
      </div>
      
      {/* Resumen estadístico */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-lg shadow-sm flex items-center">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
            <HiOutlineChartBar className="text-blue-600 text-xl" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total estudiantes analizados</p>
            <p className="text-2xl font-bold text-gray-800">{totalEstudiantes}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm flex items-center">
          <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
            <HiOutlineExclamationCircle className="text-red-600 text-xl" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Estudiantes en alto riesgo</p>
            <p className="text-2xl font-bold text-gray-800">{estudiantesRiesgo}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm flex items-center">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
            <HiOutlineCheckCircle className="text-green-600 text-xl" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Estudiantes en estado saludable</p>
            <p className="text-2xl font-bold text-gray-800">{estudiantesSaludable}</p>
          </div>
        </div>
      </div>
      
      {/* Controles de filtrado */}
      <div className="bg-white p-5 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <h2 className="text-lg font-semibold text-gray-800">Listado de Estudiantes</h2>
            <button 
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
              className="ml-4 flex items-center px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              <IoFilterOutline className="mr-1" /> Filtros
            </button>
          </div>
          
          <div className="w-full md:w-auto">
            <input 
              type="text"
              placeholder="Buscar estudiante..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        
        {mostrarFiltros && (
          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => setFiltro('todos')}
              className={`px-4 py-2 text-sm rounded-md ${filtro === 'todos' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
            >
              Todos
            </button>
            <button
              onClick={() => setFiltro('alto-riesgo')}
              className={`px-4 py-2 text-sm rounded-md ${filtro === 'alto-riesgo' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}
            >
              Alto Riesgo
            </button>
            <button
              onClick={() => setFiltro('precaucion')}
              className={`px-4 py-2 text-sm rounded-md ${filtro === 'precaucion' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}
            >
              Precaución
            </button>
            <button
              onClick={() => setFiltro('saludable')}
              className={`px-4 py-2 text-sm rounded-md ${filtro === 'saludable' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
            >
              Saludable
            </button>
          </div>
        )}
      </div>
      
      {/* Estado de carga */}
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
          {/* Lista de estudiantes */}
          {analisisFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {analisisFiltrados.map(item => (
                <EstudianteTarjeta 
                  key={item.analisis.id} 
                  analisis={item.analisis} 
                  estudiante={item.estudiante} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">No se encontraron estudiantes que coincidan con los criterios.</p>
            </div>
          )}
        </>
      )}
      
      {/* Información del sistema */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-medium text-blue-800 mb-2">Acerca del análisis</h3>
        <p className="text-blue-700 mb-4">
          Este sistema analiza automáticamente tres factores clave para determinar el nivel de estrés académico, 
          ansiedad y riesgo de deserción de los estudiantes:
        </p>
        <ul className="list-disc list-inside text-blue-700 space-y-1 mb-4">
          <li><strong>Rendimiento académico:</strong> Notas y evaluaciones en todas las materias</li>
          <li><strong>Asistencia:</strong> Patrones de asistencia a clases y regularidad</li>
          <li><strong>Carga académica:</strong> Horas de trabajo asignadas semanalmente en todas las materias</li>
        </ul>
        <p className="text-blue-700">
          La detección temprana permite implementar estrategias de apoyo y seguimiento para prevenir problemas 
          mayores de salud mental y deserción estudiantil.
        </p>
      </div>
    </div>
  );
};

export default AnalisisEstresPage;