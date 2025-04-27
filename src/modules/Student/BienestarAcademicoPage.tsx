import { useState, useEffect, JSX } from 'react';
import { useAuthStore } from '../../app/stores/auth.store';
import { useAnalisisEstresStore } from '../../app/stores/analisisEstresStore';
import { useEstudianteStore } from '../../app/stores/estudianteStore';
import { useEstudianteMateriaStore } from '../../app/stores/estudianteMateriaStore';
import { BsLightbulb, BsInfoCircle, BsBookHalf, BsClock, BsBraces, BsGraphUp, BsCalendar3, BsFilter } from 'react-icons/bs';
import { FaCoffee, FaRunning, FaUserFriends, FaBrain, FaHeadphones, FaMedal, FaPhoneAlt } from 'react-icons/fa';
import { RiMentalHealthFill, RiEmotionHappyLine } from 'react-icons/ri';

// Importación para el Modal de confirmación
import { Modal } from '../../components/ui/Modal/Modal';

interface Recomendacion {
  id: number;
  titulo: string;
  descripcion: string;
  icono: JSX.Element;
  tipo: 'academico' | 'bienestar' | 'organizacion';
  prioridad: number; // 1-5, donde 5 es la más alta
  materiasRelacionadas?: string[]; // IDs de materias relacionadas con la recomendación
}

const generarRecomendaciones = (
  nivelEstres: number, 
  nivelAnsiedad: number, 
  indicadores: {
    asistencia: number;
    rendimiento: number;
    cargaAcademica: number;
  } | undefined,
  materias: any[]
): Recomendacion[] => {
  const recomendaciones: Recomendacion[] = [];
  
  // Recomendaciones para estrés alto (>70)
  if (nivelEstres > 70) {
    recomendaciones.push({
      id: 1,
      titulo: 'Técnicas de respiración',
      descripcion: 'Dedica 10 minutos diarios a ejercicios de respiración profunda. Inhala por 4 segundos, mantén por 4 y exhala por 6 segundos.',
      icono: <FaBrain className="text-blue-500 text-2xl" />,
      tipo: 'bienestar',
      prioridad: 5
    });
    
    recomendaciones.push({
      id: 2,
      titulo: 'Busca apoyo psicológico',
      descripcion: 'La universidad ofrece servicios de consejería gratuitos. Agenda una cita con Bienestar Universitario esta semana.',
      icono: <BsInfoCircle className="text-purple-500 text-2xl" />,
      tipo: 'bienestar',
      prioridad: 5
    });
  }
  
  // Recomendaciones para ansiedad alta (>65)
  if (nivelAnsiedad > 65) {
    recomendaciones.push({
      id: 3,
      titulo: 'Mindfulness diario',
      descripcion: 'Practica 15 minutos de mindfulness cada mañana. Descarga la app "Calm" o "Headspace" para guiarte.',
      icono: <FaBrain className="text-indigo-500 text-2xl" />,
      tipo: 'bienestar',
      prioridad: 4
    });
    
    recomendaciones.push({
      id: 4,
      titulo: 'Música relajante',
      descripcion: 'Escucha música instrumental durante tus sesiones de estudio para reducir la ansiedad y mejorar la concentración.',
      icono: <FaHeadphones className="text-green-500 text-2xl" />,
      tipo: 'bienestar',
      prioridad: 3
    });
  }
  
  // Recomendaciones basadas en asistencia
  if (indicadores && indicadores.asistencia < 75) {
    recomendaciones.push({
      id: 5,
      titulo: 'Mejora tu asistencia',
      descripcion: 'Las investigaciones muestran que asistir regularmente a clases puede aumentar tu rendimiento hasta un 30%. Establece un sistema de alarmas para no faltar.',
      icono: <BsClock className="text-red-500 text-2xl" />,
      tipo: 'academico',
      prioridad: 5
    });
  }
  
  // Recomendaciones basadas en rendimiento
  if (indicadores && indicadores.rendimiento < 70) {
    recomendaciones.push({
      id: 6,
      titulo: 'Grupos de estudio',
      descripcion: 'Únete o forma un grupo de estudio para las materias más difíciles. Enseñar a otros es una de las mejores formas de aprender.',
      icono: <FaUserFriends className="text-yellow-500 text-2xl" />,
      tipo: 'academico',
      prioridad: 4,
      materiasRelacionadas: materias.filter(m => m.promedio < 3.5).map(m => m.materiaId)
    });
    
    recomendaciones.push({
      id: 7,
      titulo: 'Tutorías académicas',
      descripcion: 'La universidad ofrece tutorías gratuitas. Agenda al menos 2 horas semanales para las materias en las que tienes dificultades.',
      icono: <BsBookHalf className="text-blue-600 text-2xl" />,
      tipo: 'academico',
      prioridad: 5,
      materiasRelacionadas: materias.filter(m => m.promedio < 3.0).map(m => m.materiaId)
    });
  }
  
  // Recomendaciones basadas en carga académica
  if (indicadores && indicadores.cargaAcademica > 25) {
    recomendaciones.push({
      id: 8,
      titulo: 'Gestión del tiempo',
      descripcion: 'Utiliza la técnica Pomodoro: 25 minutos de estudio intenso seguidos por 5 minutos de descanso. Repite 4 veces y toma un descanso más largo.',
      icono: <BsClock className="text-green-600 text-2xl" />,
      tipo: 'organizacion',
      prioridad: 4
    });
    
    // Recomendación específica para materias con alta carga
    const materiasExigentes = materias.filter(m => m.cargaHoraria > 4);
    if (materiasExigentes.length > 0) {
      recomendaciones.push({
        id: 9,
        titulo: 'Planificación por materia',
        descripcion: 'Crea un calendario de estudio específico para las materias con mayor carga horaria, distribuyendo su contenido en sesiones más pequeñas.',
        icono: <BsCalendar3 className="text-orange-500 text-2xl" />,
        tipo: 'organizacion',
        prioridad: 4,
        materiasRelacionadas: materiasExigentes.map(m => m.materiaId)
      });
    }
  }
  
  // Recomendaciones generales para todos
  recomendaciones.push({
    id: 10,
    titulo: 'Actividad física regular',
    descripcion: '30 minutos de ejercicio al día pueden reducir el estrés académico hasta un 40%. Camina, corre o haz yoga según tu preferencia.',
    icono: <FaRunning className="text-green-500 text-2xl" />,
    tipo: 'bienestar',
    prioridad: nivelEstres > 60 ? 4 : 3
  });
  
  recomendaciones.push({
    id: 11,
    titulo: 'Descansos estratégicos',
    descripcion: 'Por cada hora de estudio, toma 10 minutos de descanso completo (sin pantallas). Esto mejora la retención y previene el agotamiento.',
    icono: <FaCoffee className="text-amber-700 text-2xl" />,
    tipo: 'organizacion',
    prioridad: nivelEstres > 50 ? 3 : 2
  });
  
  // Recomendaciones para la preparación de exámenes
  recomendaciones.push({
    id: 12,
    titulo: 'Preparación para exámenes',
    descripcion: 'Comienza a prepararte para los exámenes con al menos una semana de anticipación. Repasa tus apuntes diariamente y realiza simulacros de examen.',
    icono: <FaMedal className="text-amber-500 text-2xl" />,
    tipo: 'academico',
    prioridad: 3,
    materiasRelacionadas: materias.map(m => m.materiaId)
  });
  
  // Recomendaciones para el manejo de la ansiedad
  recomendaciones.push({
    id: 13,
    titulo: 'Técnicas de relajación',
    descripcion: 'Practica la técnica 5-5-5: respira por 5 segundos, mantén por 5 segundos, exhala por 5 segundos. Repite 5 veces cuando sientas ansiedad.',
    icono: <RiEmotionHappyLine className="text-blue-400 text-2xl" />,
    tipo: 'bienestar',
    prioridad: nivelAnsiedad > 50 ? 4 : 2
  });
  
  // Recomendación para contacto con docentes
  recomendaciones.push({
    id: 14,
    titulo: 'Comunicación con docentes',
    descripcion: 'No dudes en contactar a tus profesores durante su horario de atención para resolver dudas. La comunicación constante mejora tu desempeño.',
    icono: <FaPhoneAlt className="text-purple-600 text-2xl" />,
    tipo: 'academico',
    prioridad: 3,
    materiasRelacionadas: materias.filter(m => m.promedio < 3.8).map(m => m.materiaId)
  });
  
  // Recomendación para balance vida-estudio
  recomendaciones.push({
    id: 15,
    titulo: 'Balance vida-estudio',
    descripcion: 'Reserva tiempo específico para actividades sociales y hobbies. El aislamiento social aumenta el estrés académico. Programa al menos 3 horas semanales para actividades no académicas que disfrutes.',
    icono: <RiMentalHealthFill className="text-pink-500 text-2xl" />,
    tipo: 'bienestar',
    prioridad: nivelEstres > 65 ? 4 : 3
  });
  
  // Retornar todas las recomendaciones ordenadas por prioridad
  return recomendaciones.sort((a, b) => b.prioridad - a.prioridad);
};

// Componente principal 
const BienestarAcademicoPage = () => {
  const { user } = useAuthStore();
  const { getAnalisisEstresByEstudianteId, getAnalisisEstres, analisisEstres } = useAnalisisEstresStore();
  const { getEstudianteById, getEstudiantes, estudiantes } = useEstudianteStore();
  const { getEstudianteMaterias, estudianteMaterias } = useEstudianteMateriaStore();
  
  const [datosEstudiante, setDatosEstudiante] = useState<any>(null);
  const [analisisEstresEstudiante, setAnalisisEstresEstudiante] = useState<any>(null);
  const [recomendaciones, setRecomendaciones] = useState<Recomendacion[]>([]);
  const [materiasEstudiante, setMateriasEstudiante] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filtroActivo, setFiltroActivo] = useState<'todos' | 'academico' | 'bienestar' | 'organizacion'>('todos');
  const [mostrarInfo, setMostrarInfo] = useState<number | null>(null);
  
  // Estado para controlar el modal de confirmación
  const [modalConfirmacion, setModalConfirmacion] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      setIsLoading(true);
      
      try {
        // Cargar datos necesarios
        if (estudiantes.length === 0) {
          await getEstudiantes();
        }
        
        if (analisisEstres.length === 0) {
          await getAnalisisEstres();
        }
        
        // Para propósitos de demostración, usamos el ID del estudiante actual
        const estudianteId = user?.studentId || 2; // Por defecto usamos el ID 2
        
        // Obtener datos del estudiante
        const estudiante = getEstudianteById(estudianteId);
        
        // Obtener análisis de estrés
        const analisis = getAnalisisEstresByEstudianteId(estudianteId);
        
        // Obtener materias del estudiante
        await getEstudianteMaterias();
        const materiasDelEstudiante = estudianteMaterias.filter(
          em => em.estudianteId === estudianteId
        );
        
        if (estudiante && analisis) {
          setDatosEstudiante(estudiante);
          setAnalisisEstresEstudiante(analisis);
          setMateriasEstudiante(materiasDelEstudiante);
          
          // Generar recomendaciones basadas en los datos
          const recomendacionesGeneradas = generarRecomendaciones(
            analisis.nivelEstres,
            analisis.nivelAnsiedad,
            analisis.indicadores,
            materiasDelEstudiante
          );
          
          setRecomendaciones(recomendacionesGeneradas);
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    cargarDatos();
  }, [
    getAnalisisEstres, 
    getAnalisisEstresByEstudianteId, 
    getEstudiantes, 
    getEstudianteById, 
    getEstudianteMaterias,
    user?.studentId, 
    estudiantes.length, 
    analisisEstres.length,
    estudianteMaterias
  ]);
  
  // Determinar nivel de estrés para mostrar mensaje apropiado
  const getNivelEstresTexto = (nivel: number) => {
    if (nivel >= 80) return { texto: "Muy alto", color: "text-red-700", bg: "bg-red-100" };
    if (nivel >= 65) return { texto: "Alto", color: "text-orange-700", bg: "bg-orange-100" };
    if (nivel >= 50) return { texto: "Moderado", color: "text-yellow-700", bg: "bg-yellow-100" };
    if (nivel >= 30) return { texto: "Bajo", color: "text-green-700", bg: "bg-green-100" };
    return { texto: "Muy bajo", color: "text-green-800", bg: "bg-green-50" };
  };
  
  const getRecomendacionesFiltradas = () => {
    if (filtroActivo === 'todos') {
      return recomendaciones;
    }
    return recomendaciones.filter(r => r.tipo === filtroActivo);
  };
  
  const toggleMostrarInfo = (id: number) => {
    if (mostrarInfo === id) {
      setMostrarInfo(null);
    } else {
      setMostrarInfo(id);
    }
  };

  // Función para manejar la continuación de la iteración
  const handleContinuarIteracion = () => {
    // Aquí se implementaría la lógica para continuar con una nueva iteración
    // Por ahora solo cerramos el modal
    setModalConfirmacion(false);
    
    // Simulamos una carga de datos nuevos
    setIsLoading(true);
    
    // Ejemplo: podríamos volver a cargar datos o iniciar un nuevo análisis
    setTimeout(() => {
      // Simular finalización de carga
      setIsLoading(false);
      
      // Mostrar algún mensaje de éxito (podrías implementar un toast o notificación)
      alert("¡Nueva iteración iniciada con éxito!");
    }, 1500);
  };
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
        <div className="h-32 bg-gray-200 rounded mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="h-40 bg-gray-200 rounded"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (!analisisEstresEstudiante || !datosEstudiante) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Bienestar Académico</h2>
        <p className="text-gray-600">No hay datos disponibles para mostrar recomendaciones en este momento.</p>
      </div>
    );
  }
  
  const nivelEstresInfo = getNivelEstresTexto(analisisEstresEstudiante.nivelEstres);
  
  return (
    <div className="space-y-6">
      {/* Cabecera con información general */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Bienestar Académico Personalizado</h1>
        <p className="text-gray-600 mb-6">
          Recomendaciones personalizadas basadas en tu perfil de estrés académico y desempeño en las materias.
        </p>
        
        {/* Resumen del nivel de estrés */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className={`rounded-lg p-5 ${nivelEstresInfo.bg}`}>
            <h3 className="font-semibold text-gray-700 mb-2">Nivel de Estrés</h3>
            <div className="flex items-center">
              <span className={`text-2xl font-bold ${nivelEstresInfo.color}`}>
                {nivelEstresInfo.texto}
              </span>
              <span className="text-sm ml-2 text-gray-600">
                ({analisisEstresEstudiante.nivelEstres}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div 
                className={`h-2.5 rounded-full ${
                  analisisEstresEstudiante.nivelEstres >= 80 ? 'bg-red-600' :
                  analisisEstresEstudiante.nivelEstres >= 65 ? 'bg-orange-500' :
                  analisisEstresEstudiante.nivelEstres >= 50 ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}
                style={{ width: `${analisisEstresEstudiante.nivelEstres}%` }}
              ></div>
            </div>
          </div>
          
          <div className="rounded-lg p-5 bg-blue-50">
            <h3 className="font-semibold text-gray-700 mb-2">Nivel de Ansiedad</h3>
            <div className="flex items-center">
              <span className={`text-2xl font-bold ${
                analisisEstresEstudiante.nivelAnsiedad >= 70 ? 'text-red-700' :
                analisisEstresEstudiante.nivelAnsiedad >= 60 ? 'text-orange-700' :
                analisisEstresEstudiante.nivelAnsiedad >= 45 ? 'text-yellow-700' :
                'text-green-700'
              }`}>
                {analisisEstresEstudiante.nivelAnsiedad >= 70 ? 'Alto' :
                 analisisEstresEstudiante.nivelAnsiedad >= 60 ? 'Moderado-Alto' :
                 analisisEstresEstudiante.nivelAnsiedad >= 45 ? 'Moderado' :
                 'Bajo'}
              </span>
              <span className="text-sm ml-2 text-gray-600">
                ({analisisEstresEstudiante.nivelAnsiedad}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div 
                className={`h-2.5 rounded-full ${
                  analisisEstresEstudiante.nivelAnsiedad >= 70 ? 'bg-red-600' :
                  analisisEstresEstudiante.nivelAnsiedad >= 60 ? 'bg-orange-500' :
                  analisisEstresEstudiante.nivelAnsiedad >= 45 ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}
                style={{ width: `${analisisEstresEstudiante.nivelAnsiedad}%` }}
              ></div>
            </div>
          </div>
          
          <div className="rounded-lg p-5 bg-purple-50">
            <h3 className="font-semibold text-gray-700 mb-2">Riesgo de Deserción</h3>
            <div className="flex items-center">
              <span className={`text-2xl font-bold ${
                analisisEstresEstudiante.riesgoDesercion >= 70 ? 'text-red-700' :
                analisisEstresEstudiante.riesgoDesercion >= 50 ? 'text-orange-700' :
                analisisEstresEstudiante.riesgoDesercion >= 30 ? 'text-yellow-700' :
                'text-green-700'
              }`}>
                {analisisEstresEstudiante.riesgoDesercion >= 70 ? 'Alto' :
                 analisisEstresEstudiante.riesgoDesercion >= 50 ? 'Moderado' :
                 analisisEstresEstudiante.riesgoDesercion >= 30 ? 'Bajo' :
                 'Muy Bajo'}
              </span>
              <span className="text-sm ml-2 text-gray-600">
                ({analisisEstresEstudiante.riesgoDesercion}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div 
                className={`h-2.5 rounded-full ${
                  analisisEstresEstudiante.riesgoDesercion >= 70 ? 'bg-red-600' :
                  analisisEstresEstudiante.riesgoDesercion >= 50 ? 'bg-orange-500' :
                  analisisEstresEstudiante.riesgoDesercion >= 30 ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}
                style={{ width: `${analisisEstresEstudiante.riesgoDesercion}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 sm:mb-0">
            Recomendaciones Personalizadas
          </h2>
          
          <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
            <button 
              onClick={() => setFiltroActivo('todos')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filtroActivo === 'todos' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              Todos
            </button>
            <button 
              onClick={() => setFiltroActivo('academico')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filtroActivo === 'academico' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              Académico
            </button>
            <button 
              onClick={() => setFiltroActivo('bienestar')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filtroActivo === 'bienestar' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              Bienestar
            </button>
            <button 
              onClick={() => setFiltroActivo('organizacion')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filtroActivo === 'organizacion' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              Organización
            </button>
          </div>
        </div>
        
        {/* Lista de recomendaciones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {getRecomendacionesFiltradas().map((recomendacion) => (
            <div 
              key={recomendacion.id} 
              className={`border rounded-lg p-6 transition-all duration-200 ${
                mostrarInfo === recomendacion.id ? 'ring-2 ring-blue-500 shadow-md' : 'hover:shadow-md'
              }`}
            >
              <div className="flex items-start">
                <div className="mr-4 p-3 rounded-full bg-gray-100">
                  {recomendacion.icono}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">
                    {recomendacion.titulo}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3">
                    {recomendacion.descripcion}
                  </p>
                  
                  <div className="flex items-center mb-3">
                    <span className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ${
                      recomendacion.tipo === 'academico' ? 'bg-blue-100 text-blue-800' :
                      recomendacion.tipo === 'bienestar' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {recomendacion.tipo === 'academico' ? 'Académico' :
                       recomendacion.tipo === 'bienestar' ? 'Bienestar' : 'Organización'}
                    </span>
                    
                    <span className="text-xs text-gray-500">
                      Prioridad: {recomendacion.prioridad}/5
                    </span>
                  </div>
                  
                  {/* Materias relacionadas si existen */}
                  {recomendacion.materiasRelacionadas && recomendacion.materiasRelacionadas.length > 0 && (
                    <div className={`transition-all duration-300 overflow-hidden ${
                      mostrarInfo === recomendacion.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">
                        Materias relacionadas:
                      </h4>
                      <ul className="text-xs text-gray-600 space-y-1 pl-4 mb-3">
                        {recomendacion.materiasRelacionadas.map(id => {
                          const materia = materiasEstudiante.find(m => m.materiaId === id);
                          return materia ? (
                            <li key={id} className="flex items-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              {materia.nombreMateria}
                            </li>
                          ) : null;
                        })}
                      </ul>
                    </div>
                  )}
                  
                  <button
                    onClick={() => toggleMostrarInfo(recomendacion.id)}
                    className="text-xs text-blue-600 hover:text-blue-800 transition-colors mt-2"
                  >
                    {mostrarInfo === recomendacion.id ? "Ver menos" : "Ver más"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Calendario Académico */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Calendario de Actividades
        </h2>
        
        <p className="text-gray-600 mb-4">
          Organiza tu tiempo según tus materias y recomendaciones personalizadas
        </p>
        
        <div className="border rounded-lg p-4 mb-6">
          <div className="flex items-center text-gray-700 mb-3">
            <BsCalendar3 className="mr-2 text-blue-500" />
            <h3 className="font-medium">Esta semana</h3>
          </div>
          
          <div className="space-y-3">
            {materiasEstudiante.slice(0, 3).map((materia, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-50 rounded-md">
                <div className="w-2 h-10 bg-blue-500 rounded-full mr-3"></div>
                <div>
                  <h4 className="font-medium text-gray-800">{materia.nombreMateria}</h4>
                  <p className="text-xs text-gray-500">
                    {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'][index % 5]} - 
                    {index % 2 === 0 ? ' 8:00 AM - 10:00 AM' : ' 2:00 PM - 4:00 PM'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <div className="flex items-center text-gray-700 mb-3">
            <BsLightbulb className="mr-2 text-yellow-500" />
            <h3 className="font-medium">Actividades recomendadas</h3>
          </div>
          
          <div className="space-y-3">
            {recomendaciones.slice(0, 3).map((recomendacion, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-50 rounded-md">
                <div className={`w-2 h-10 rounded-full mr-3 ${
                  recomendacion.tipo === 'academico' ? 'bg-blue-500' :
                  recomendacion.tipo === 'bienestar' ? 'bg-green-500' :
                  'bg-purple-500'
                }`}></div>
                <div>
                  <h4 className="font-medium text-gray-800">{recomendacion.titulo}</h4>
                  <p className="text-xs text-gray-500">
                    {index === 0 ? 'Diario - Mañana' : 
                     index === 1 ? 'Tres veces por semana' : 
                     'Fines de semana'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Información de contacto */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          ¿Necesitas más apoyo?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-5 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-lg text-gray-800 mb-2 flex items-center">
              <FaPhoneAlt className="text-blue-500 mr-2" />
              Bienestar Universitario
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Nuestro equipo de psicólogos y orientadores está disponible para apoyarte.
            </p>
            <a href="#" className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-md text-sm font-medium transition-colors hover:bg-blue-200">
              Agendar cita
            </a>
          </div>
          
          <div className="border rounded-lg p-5 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-lg text-gray-800 mb-2 flex items-center">
              <FaUserFriends className="text-green-500 mr-2" />
              Grupos de Apoyo
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Únete a grupos de estudiantes que comparten experiencias similares.
            </p>
            <button 
              onClick={() => setModalConfirmacion(true)}
              className="px-4 py-2 bg-green-100 text-green-700 rounded-md text-sm font-medium transition-colors hover:bg-green-200"
            >
              Iniciar nueva iteración
            </button>
          </div>
        </div>
      </div>
      
      {/* Modal de confirmación */}
      <Modal
        isOpen={modalConfirmacion}
        onClose={() => setModalConfirmacion(false)}
        title="Confirmación"
      >
        <div className="p-4">
          <p className="text-gray-700 mb-4">¿Desea continuar con la iteración?</p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setModalConfirmacion(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm font-medium transition-colors hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleContinuarIteracion}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium transition-colors hover:bg-blue-700"
            >
              Continuar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BienestarAcademicoPage;