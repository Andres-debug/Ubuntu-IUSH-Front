import { useState, useEffect } from 'react';
import { useAuthStore } from '../../app/stores/auth.store';
import { Link } from 'react-router-dom';
import { BsBook, BsCalendar3, BsClipboardCheck, BsFileEarmarkText, BsGraphUp } from 'react-icons/bs';
import { FaUserGraduate } from 'react-icons/fa';
import RecomendacionesEstres from './RecomendacionesEstres';

const StudentDashboard = () => {
  const { user, getUser } = useAuthStore();
  const [studentData, setStudentData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStudentData = async () => {
      setIsLoading(true);
      try {
        // En un entorno real, aquí cargaríamos los datos del estudiante desde una API
        const currentUser = getUser();
        
        // Datos simulados
        const mockStudentData = {
          id: currentUser?.studentId || 1,
          name: currentUser?.name || 'Estudiante',
          carnet: 'EST' + (currentUser?.studentId || '1').toString().padStart(5, '0'),
          program: 'Ingeniería de Sistemas',
          semester: 5,
          credits: 120,
          gpa: 4.2,
          enrolledCourses: [
            { id: 1, code: 'MAT101', name: 'Cálculo Diferencial', credits: 4, schedule: 'Lunes y Miércoles 8:00 - 10:00', professor: 'Dr. Juan Pérez' },
            { id: 2, code: 'FIS201', name: 'Física Mecánica', credits: 3, schedule: 'Martes y Jueves 10:00 - 12:00', professor: 'Dra. Ana García' },
            { id: 3, code: 'PRG301', name: 'Programación Avanzada', credits: 4, schedule: 'Viernes 14:00 - 18:00', professor: 'Ing. Carlos Ruiz' },
          ],
          nextExams: [
            { id: 1, course: 'Cálculo Diferencial', date: '30 de Abril, 2025', time: '9:00 - 11:00', location: 'Aula 201' },
            { id: 2, course: 'Física Mecánica', date: '2 de Mayo, 2025', time: '10:00 - 12:00', location: 'Laboratorio A' },
          ],
          recentGrades: [
            { id: 1, course: 'Programación Avanzada', activity: 'Proyecto Final', grade: 4.8, maxGrade: 5.0, date: '22 de Abril, 2025' },
            { id: 2, course: 'Física Mecánica', activity: 'Examen Parcial', grade: 3.7, maxGrade: 5.0, date: '20 de Abril, 2025' },
          ]
        };
        
        setStudentData(mockStudentData);
      } catch (error) {
        console.error('Error al cargar datos del estudiante:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStudentData();
  }, [getUser]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cabecera del Dashboard */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Bienvenido, {user?.name}</h1>
            <p className="text-gray-600 mt-1">
              Estudiante de {studentData.program} • Semestre {studentData.semester}
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link 
              to="/student/profile"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <FaUserGraduate className="mr-2" />
              Mi Perfil
            </Link>
          </div>
        </div>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-start">
            <div className="p-3 bg-blue-50 rounded-lg mr-4">
              <BsBook className="text-blue-600 text-xl" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-800">Materias Inscritas</h2>
              <p className="text-3xl font-bold text-gray-900 mt-2">{studentData.enrolledCourses.length}</p>
              <p className="text-sm text-gray-500 mt-1">
                {studentData.credits} créditos en total
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-start">
            <div className="p-3 bg-green-50 rounded-lg mr-4">
              <BsGraphUp className="text-green-600 text-xl" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-800">Promedio Actual</h2>
              <p className="text-3xl font-bold text-gray-900 mt-2">{studentData.gpa.toFixed(1)}</p>
              <p className="text-sm text-gray-500 mt-1">
                Escala 0.0 - 5.0
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-start">
            <div className="p-3 bg-purple-50 rounded-lg mr-4">
              <BsCalendar3 className="text-purple-600 text-xl" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-800">Próximos Exámenes</h2>
              <p className="text-3xl font-bold text-gray-900 mt-2">{studentData.nextExams.length}</p>
              <p className="text-sm text-gray-500 mt-1">
                {studentData.nextExams.length > 0 ? `Próximo: ${studentData.nextExams[0].date}` : 'Sin exámenes pendientes'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Información principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Materias inscritas */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-medium text-gray-800">Materias Inscritas</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {studentData.enrolledCourses.map((course: any) => (
                <div key={course.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
                          {course.code}
                        </span>
                        <h3 className="text-base font-medium text-gray-800">{course.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        {course.professor} • {course.credits} créditos
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0 text-sm text-gray-500">
                      {course.schedule}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="px-6 py-3 bg-gray-50 text-right">
            <Link 
              to="/student/courses" 
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Ver todas las materias
            </Link>
          </div>
        </div>

        {/* Próximos exámenes y calificaciones */}
        <div className="space-y-6">
          {/* Exámenes */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-medium text-gray-800">Próximos Exámenes</h2>
            </div>
            <div className="p-6">
              {studentData.nextExams.length > 0 ? (
                <div className="space-y-4">
                  {studentData.nextExams.map((exam: any) => (
                    <div key={exam.id} className="flex">
                      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg mr-4">
                        <BsClipboardCheck className="text-lg" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-800">{exam.course}</h3>
                        <p className="text-xs text-gray-500 mt-1">{exam.date} • {exam.time}</p>
                        <p className="text-xs text-gray-500 mt-1">{exam.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No tienes exámenes programados próximamente.</p>
              )}
            </div>
            <div className="px-6 py-3 bg-gray-50 text-right">
              <Link 
                to="/student/calendar" 
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Ver calendario
              </Link>
            </div>
          </div>
          
          {/* Calificaciones recientes */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-medium text-gray-800">Calificaciones Recientes</h2>
            </div>
            <div className="p-6">
              {studentData.recentGrades.length > 0 ? (
                <div className="space-y-4">
                  {studentData.recentGrades.map((grade: any) => (
                    <div key={grade.id} className="flex">
                      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-green-100 text-green-600 rounded-lg mr-4">
                        <BsFileEarmarkText className="text-lg" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium text-gray-800">{grade.course}</h3>
                          <span className={`text-sm font-medium ${
                            grade.grade / grade.maxGrade >= 0.7 ? 'text-green-600' : 
                            grade.grade / grade.maxGrade >= 0.5 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {grade.grade.toFixed(1)} / {grade.maxGrade.toFixed(1)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{grade.activity}</p>
                        <p className="text-xs text-gray-400 mt-1">{grade.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No hay calificaciones recientes para mostrar.</p>
              )}
            </div>
            <div className="px-6 py-3 bg-gray-50 text-right">
              <Link 
                to="/student/grades" 
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Ver todas las calificaciones
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recomendaciones de Estrés Académico */}
      <div className="grid grid-cols-1 gap-6">
        <RecomendacionesEstres />
      </div>
    </div>
  );
};

export default StudentDashboard;