import { useState, useEffect } from 'react';
import { 
  HiOutlineExclamationCircle, 
  HiOutlineCheckCircle, 
  HiOutlineChartBar 
} from 'react-icons/hi';
import { FaRegSadTear, FaRegMeh, FaRegSmile } from 'react-icons/fa';
import { IoFilterOutline } from 'react-icons/io5';

// Tipos para nuestra interfaz
interface Estudiante {
  id: number;
  nombre: string;
  carnet: string;
  programa: string;
  semestre: number;
  nivelEstres: number; // 1-100
  nivelAnsiedad: number; // 1-100
  riesgoDesercion: number; // 1-100
  ultimaActualizacion: string;
  indicadores: {
    asistencia: number; // porcentaje
    rendimiento: number; // porcentaje
    cargaAcademica: number; // horas por semana
  }
}

// Datos de prueba
const estudiantes: Estudiante[] = [
  {
    id: 1,
    nombre: "María Rodríguez",
    carnet: "EST-2021-001",
    programa: "Ingeniería de Sistemas",
    semestre: 6,
    nivelEstres: 82,
    nivelAnsiedad: 75,
    riesgoDesercion: 68,
    ultimaActualizacion: "2025-04-20",
    indicadores: {
      asistencia: 65,
      rendimiento: 58,
      cargaAcademica: 45
    }
  },
  {
    id: 2,
    nombre: "Juan Pérez",
    carnet: "EST-2022-042",
    programa: "Administración de Empresas",
    semestre: 4,
    nivelEstres: 45,
    nivelAnsiedad: 30,
    riesgoDesercion: 25,
    ultimaActualizacion: "2025-04-22",
    indicadores: {
      asistencia: 90,
      rendimiento: 85,
      cargaAcademica: 38
    }
  },
  {
    id: 3,
    nombre: "Carlos Martínez",
    carnet: "EST-2020-195",
    programa: "Psicología",
    semestre: 7,
    nivelEstres: 92,
    nivelAnsiedad: 88,
    riesgoDesercion: 78,
    ultimaActualizacion: "2025-04-25",
    indicadores: {
      asistencia: 42,
      rendimiento: 51,
      cargaAcademica: 52
    }
  },
  {
    id: 4,
    nombre: "Ana Gómez",
    carnet: "EST-2023-087",
    programa: "Derecho",
    semestre: 2,
    nivelEstres: 65,
    nivelAnsiedad: 62,
    riesgoDesercion: 45,
    ultimaActualizacion: "2025-04-21",
    indicadores: {
      asistencia: 78,
      rendimiento: 72,
      cargaAcademica: 42
    }
  },
  {
    id: 5,
    nombre: "Roberto Sánchez",
    carnet: "EST-2021-156",
    programa: "Ingeniería Civil",
    semestre: 5,
    nivelEstres: 20,
    nivelAnsiedad: 15,
    riesgoDesercion: 10,
    ultimaActualizacion: "2025-04-23",
    indicadores: {
      asistencia: 95,
      rendimiento: 92,
      cargaAcademica: 36
    }
  }
];

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
const EstudianteTarjeta = ({ estudiante }: { estudiante: Estudiante }) => {
  // Determinar el estado basado en el nivel de estrés
  const getEstadoEstudiante = () => {
    if (estudiante.nivelEstres >= 70 || estudiante.nivelAnsiedad >= 70 || estudiante.riesgoDesercion >= 70) {
      return {
        texto: "Alto riesgo",
        color: "text-red-600",
        bgColor: "bg-red-100",
        icono: <HiOutlineExclamationCircle className="text-red-600" />
      };
    } else if (estudiante.nivelEstres >= 40 || estudiante.nivelAnsiedad >= 40 || estudiante.riesgoDesercion >= 40) {
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
          <h3 className="text-lg font-semibold text-gray-800">{estudiante.nombre}</h3>
          <p className="text-sm text-gray-500">{estudiante.carnet} • {estudiante.programa}</p>
          <p className="text-xs text-gray-500">Semestre {estudiante.semestre}</p>
        </div>
        <span className={`flex items-center px-3 py-1 text-sm rounded-full ${estado.bgColor} ${estado.color}`}>
          {estado.icono}
          <span className="ml-1 font-medium">{estado.texto}</span>
        </span>
      </div>

      <div className="space-y-4 mt-4">
        <IndicadorBarra valor={estudiante.nivelEstres} etiqueta="Nivel de Estrés" />
        <IndicadorBarra valor={estudiante.nivelAnsiedad} etiqueta="Nivel de Ansiedad" />
        <IndicadorBarra valor={estudiante.riesgoDesercion} etiqueta="Riesgo de Deserción" />
      </div>

      <div className="mt-5 pt-5 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-xs text-gray-500">Asistencia</p>
            <p className={`text-sm font-medium ${estudiante.indicadores.asistencia < 70 ? 'text-red-600' : 'text-gray-700'}`}>
              {estudiante.indicadores.asistencia}%
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Rendimiento</p>
            <p className={`text-sm font-medium ${estudiante.indicadores.rendimiento < 70 ? 'text-red-600' : 'text-gray-700'}`}>
              {estudiante.indicadores.rendimiento}%
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Carga Acad.</p>
            <p className={`text-sm font-medium ${estudiante.indicadores.cargaAcademica > 45 ? 'text-red-600' : 'text-gray-700'}`}>
              {estudiante.indicadores.cargaAcademica}h
            </p>
          </div>
        </div>
        <p className="text-xs text-center text-gray-400 mt-3">
          Actualizado: {estudiante.ultimaActualizacion}
        </p>
      </div>
    </div>
  );
};

const AnalisisEstresPage = () => {
  const [filtro, setFiltro] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [estudiantesFiltrados, setEstudiantesFiltrados] = useState<Estudiante[]>(estudiantes);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  // Filtrar estudiantes basados en el estado actual
  useEffect(() => {
    let resultado = estudiantes;
    
    // Aplicar filtro por nivel de riesgo
    if (filtro === 'alto-riesgo') {
      resultado = resultado.filter(e => e.nivelEstres >= 70 || e.nivelAnsiedad >= 70 || e.riesgoDesercion >= 70);
    } else if (filtro === 'precaucion') {
      resultado = resultado.filter(e => 
        (e.nivelEstres >= 40 && e.nivelEstres < 70) || 
        (e.nivelAnsiedad >= 40 && e.nivelAnsiedad < 70) || 
        (e.riesgoDesercion >= 40 && e.riesgoDesercion < 70)
      );
    } else if (filtro === 'saludable') {
      resultado = resultado.filter(e => e.nivelEstres < 40 && e.nivelAnsiedad < 40 && e.riesgoDesercion < 40);
    }
    
    // Aplicar búsqueda
    if (busqueda) {
      const terminoBusqueda = busqueda.toLowerCase();
      resultado = resultado.filter(e => 
        e.nombre.toLowerCase().includes(terminoBusqueda) || 
        e.carnet.toLowerCase().includes(terminoBusqueda) ||
        e.programa.toLowerCase().includes(terminoBusqueda)
      );
    }
    
    setEstudiantesFiltrados(resultado);
  }, [filtro, busqueda]);

  // Calcular estadísticas generales
  const totalEstudiantes = estudiantes.length;
  const estudiantesRiesgo = estudiantes.filter(e => e.nivelEstres >= 70 || e.nivelAnsiedad >= 70 || e.riesgoDesercion >= 70).length;
  const porcentajeRiesgo = Math.round((estudiantesRiesgo / totalEstudiantes) * 100);

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
            <p className="text-2xl font-bold text-gray-800">
              {estudiantes.filter(e => e.nivelEstres < 40 && e.nivelAnsiedad < 40 && e.riesgoDesercion < 40).length}
            </p>
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
      
      {/* Lista de estudiantes */}
      {estudiantesFiltrados.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {estudiantesFiltrados.map(estudiante => (
            <EstudianteTarjeta key={estudiante.id} estudiante={estudiante} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500">No se encontraron estudiantes que coincidan con los criterios.</p>
        </div>
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