import { useState, useEffect, JSX } from 'react';
import { useAuthStore } from '../../app/stores/auth.store';
import { useAnalisisEstresStore } from '../../app/stores/analisisEstresStore';
import { useEstudianteStore } from '../../app/stores/estudianteStore';
import { BsLightbulb, BsInfoCircle, BsBookHalf, BsClock, BsBraces, BsGraphUp } from 'react-icons/bs';
import { FaCoffee, FaRunning, FaUserFriends, FaBrain, FaHeadphones } from 'react-icons/fa';

interface Recomendacion {
  id: number;
  titulo: string;
  descripcion: string;
  icono: JSX.Element;
  tipo: 'academico' | 'bienestar' | 'organizacion';
  prioridad: number; // 1-5, donde 5 es la más alta
}

const generarRecomendaciones = (
  nivelEstres: number, 
  nivelAnsiedad: number, 
  indicadores: {
    asistencia: number;
    rendimiento: number;
    cargaAcademica: number;
  } | undefined
): Recomendacion[] => {
  const recomendaciones: Recomendacion[] = [];
  
  // Recomendaciones para estrés alto (>70)
  if (nivelEstres > 70) {
    recomendaciones.push({
      id: 1,
      titulo: 'Técnicas de respiración',
      descripcion: 'Dedica 10 minutos diarios a ejercicios de respiración profunda. Inhala por 4 segundos, mantén por 4 y exhala por 6 segundos.',
      icono: <FaBrain className="text-blue-500" />,
      tipo: 'bienestar',
      prioridad: 5
    });
    
    recomendaciones.push({
      id: 2,
      titulo: 'Busca apoyo psicológico',
      descripcion: 'La universidad ofrece servicios de consejería gratuitos. Agenda una cita con Bienestar Universitario esta semana.',
      icono: <BsInfoCircle className="text-purple-500" />,
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
      icono: <FaBrain className="text-indigo-500" />,
      tipo: 'bienestar',
      prioridad: 4
    });
    
    recomendaciones.push({
      id: 4,
      titulo: 'Música relajante',
      descripcion: 'Escucha música instrumental durante tus sesiones de estudio para reducir la ansiedad y mejorar la concentración.',
      icono: <FaHeadphones className="text-green-500" />,
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
      icono: <BsClock className="text-red-500" />,
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
      icono: <FaUserFriends className="text-yellow-500" />,
      tipo: 'academico',
      prioridad: 4
    });
    
    recomendaciones.push({
      id: 7,
      titulo: 'Tutorías académicas',
      descripcion: 'La universidad ofrece tutorías gratuitas. Agenda al menos 2 horas semanales para las materias en las que tienes dificultades.',
      icono: <BsBookHalf className="text-blue-600" />,
      tipo: 'academico',
      prioridad: 5
    });
  }
  
  // Recomendaciones basadas en carga académica
  if (indicadores && indicadores.cargaAcademica > 25) {
    recomendaciones.push({
      id: 8,
      titulo: 'Gestión del tiempo',
      descripcion: 'Utiliza la técnica Pomodoro: 25 minutos de estudio intenso seguidos por 5 minutos de descanso. Repite 4 veces y toma un descanso más largo.',
      icono: <BsClock className="text-green-600" />,
      tipo: 'organizacion',
      prioridad: 4
    });
  }
  
  // Recomendaciones generales para todos
  recomendaciones.push({
    id: 9,
    titulo: 'Actividad física regular',
    descripcion: '30 minutos de ejercicio al día pueden reducir el estrés académico hasta un 40%. Camina, corre o haz yoga según tu preferencia.',
    icono: <FaRunning className="text-green-500" />,
    tipo: 'bienestar',
    prioridad: nivelEstres > 60 ? 4 : 3
  });
  
  recomendaciones.push({
    id: 10,
    titulo: 'Descansos estratégicos',
    descripcion: 'Por cada hora de estudio, toma 10 minutos de descanso completo (sin pantallas). Esto mejora la retención y previene el agotamiento.',
    icono: <FaCoffee className="text-brown-500" />,
    tipo: 'organizacion',
    prioridad: nivelEstres > 50 ? 3 : 2
  });
  
  // Organizar por prioridad y limitar a máximo 5 recomendaciones
  return recomendaciones
    .sort((a, b) => b.prioridad - a.prioridad)
    .slice(0, 5);
};

// Componente principal de recomendaciones
const RecomendacionesEstres = () => {
  const { user } = useAuthStore();
  const { getAnalisisEstresByEstudianteId, getAnalisisEstres, analisisEstres } = useAnalisisEstresStore();
  const { getEstudianteById, getEstudiantes, estudiantes } = useEstudianteStore();
  
  const [datosEstudiante, setDatosEstudiante] = useState<any>(null);
  const [analisisEstresEstudiante, setAnalisisEstresEstudiante] = useState<any>(null);
  const [recomendaciones, setRecomendaciones] = useState<Recomendacion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const cargarDatos = async () => {
      setIsLoading(true);
      
      try {
        // Cargar estudiantes y análisis si no están cargados
        if (estudiantes.length === 0) {
          await getEstudiantes();
        }
        
        if (analisisEstres.length === 0) {
          await getAnalisisEstres();
        }
        
        // Para propósitos de demostración, usamos un ID de estudiante fijo
        // En producción, esto vendría del usuario autenticado
        const estudianteId = user?.studentId || 2; // Por defecto usamos el estudiante con ID 2 (Juan Pérez)
        
        // Obtener datos del estudiante
        const estudiante = getEstudianteById(estudianteId);
        
        // Obtener análisis de estrés
        const analisis = getAnalisisEstresByEstudianteId(estudianteId);
        
        if (estudiante && analisis) {
          setDatosEstudiante(estudiante);
          setAnalisisEstresEstudiante(analisis);
          
          // Generar recomendaciones basadas en el análisis
          const recomendacionesGeneradas = generarRecomendaciones(
            analisis.nivelEstres,
            analisis.nivelAnsiedad,
            analisis.indicadores
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
  }, [getAnalisisEstres, getAnalisisEstresByEstudianteId, getEstudiantes, getEstudianteById, user?.studentId, estudiantes.length, analisisEstres.length]);
  
  // Determinar nivel de estrés para mostrar mensaje apropiado
  const getNivelEstresTexto = (nivel: number) => {
    if (nivel >= 80) return { texto: "Muy alto", color: "text-red-700", bg: "bg-red-100" };
    if (nivel >= 65) return { texto: "Alto", color: "text-orange-700", bg: "bg-orange-100" };
    if (nivel >= 50) return { texto: "Moderado", color: "text-yellow-700", bg: "bg-yellow-100" };
    if (nivel >= 30) return { texto: "Bajo", color: "text-green-700", bg: "bg-green-100" };
    return { texto: "Muy bajo", color: "text-green-800", bg: "bg-green-50" };
  };
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
        <div className="space-y-3">
          <div className="h-20 bg-gray-100 rounded"></div>
          <div className="h-20 bg-gray-100 rounded"></div>
          <div className="h-20 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (!datosEstudiante || !analisisEstresEstudiante) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-500">No pudimos cargar tus datos de estrés académico. Por favor, contacta a Bienestar Universitario.</p>
      </div>
    );
  }
  
  const nivelEstres = getNivelEstresTexto(analisisEstresEstudiante.nivelEstres);
  const fechaActualizacion = new Date(analisisEstresEstudiante.ultimaActualizacion).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-800">Bienestar Académico</h2>
        <div className="text-xs text-gray-500">Actualizado: {fechaActualizacion}</div>
      </div>
      
      <div className="p-6">
        {/* Resumen de estrés */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <BsGraphUp className="text-blue-500 mr-2" size={20} />
              <h3 className="text-base font-medium text-gray-700">Tu nivel de estrés académico es:</h3>
            </div>
            <span className={`px-3 py-1 rounded-full font-medium ${nivelEstres.bg} ${nivelEstres.color}`}>
              {nivelEstres.texto}
            </span>
          </div>
          
          {/* Barra de progreso */}
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full ${
                analisisEstresEstudiante.nivelEstres >= 80 ? 'bg-red-500' : 
                analisisEstresEstudiante.nivelEstres >= 65 ? 'bg-orange-500' : 
                analisisEstresEstudiante.nivelEstres >= 50 ? 'bg-yellow-500' : 
                'bg-green-500'
              }`}
              style={{ width: `${analisisEstresEstudiante.nivelEstres}%` }}
            ></div>
          </div>
          
          <p className="mt-3 text-sm text-gray-600">
            {analisisEstresEstudiante.nivelEstres >= 65 
              ? 'Tus niveles de estrés están por encima de lo recomendado. Revisa las sugerencias a continuación para mejorarlo.'
              : 'Tus niveles de estrés están dentro de rangos manejables. Sigue estas recomendaciones para mantenerlo bajo control.'}
          </p>
        </div>
        
        {/* Recomendaciones */}
        <div className="space-y-4">
          <h3 className="text-base font-medium text-gray-700 flex items-center">
            <BsLightbulb className="text-yellow-500 mr-2" size={18} />
            Recomendaciones personalizadas para ti
          </h3>
          
          <div className="grid grid-cols-1 gap-4">
            {recomendaciones.map((rec) => (
              <div key={rec.id} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div className="flex">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-50 rounded-lg mr-4">
                    {rec.icono}
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-gray-800">{rec.titulo}</h4>
                    <p className="mt-1 text-sm text-gray-600">{rec.descripcion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 px-6 py-4 border-t border-blue-100">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <BsInfoCircle className="text-blue-500" size={18} />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Si necesitas apoyo adicional, Bienestar Universitario ofrece asesoría psicológica gratuita. 
              Escribe a <a href="mailto:bienestar@universidad.edu.co" className="font-medium underline">bienestar@universidad.edu.co</a> o 
              llama al <span className="font-medium">604-123-4567</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecomendacionesEstres;