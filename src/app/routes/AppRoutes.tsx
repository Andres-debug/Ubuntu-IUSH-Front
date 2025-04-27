import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import LoginPage from '../../modules/auth/LoginPage';
import { Main } from '../../modules/layout/Main/Main';
import { StudentMain } from '../../modules/layout/Main/StudentMain';
import ProtectedRoutes from './ProtectedRoutes';
import Dashboard from '../../pages/Dashboard/Dashboard';
import FacultadesPage from '../../modules/Facultades/FacultadesPage';
import FacultadDetallePage from '../../modules/Facultades/components/FacultadDetallePage';
import ProgramasPage from '../../modules/Programas/ProgramasPage';
import ProgramaDetallePage from '../../modules/Programas/components/ProgramaDetallePage';
import CargaAcademicaPage from '../../modules/CargaAcademica/CargaAcademicaPage';
import AnalisisEstresPage from '../../modules/AnalisisEstres/AnalisisEstresPage';
import StudentDashboard from '../../modules/Student/StudentDashboard';
import BienestarAcademicoPage from '../../modules/Student/BienestarAcademicoPage';
import { useAuthStore } from '../stores/auth.store';

const AppRoutes = () => {
  // Usamos el store de autenticación
  const { isAuthenticated, checkAuth, user, getUser } = useAuthStore();

  // Verificar autenticación al cargar
  useEffect(() => {
    checkAuth();
    getUser();
    
    // Escuchamos cambios en localStorage (útil para cuando varios tabs están abiertos)
    const handleStorageChange = () => {
      checkAuth();
      getUser();
    };
    
    window.addEventListener('storage-changed', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage-changed', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [checkAuth, getUser]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Rutas protegidas para administradores */}
        <Route 
          element={
            <ProtectedRoutes 
              isAuthenticated={isAuthenticated} 
              requiredRole="admin"
              redirectTo="/login" 
            />
          }
        >
          <Route element={<Main />}>
            {/* Dashboard y otras rutas que comparten el mismo layout */}
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Rutas para Facultades */}
            <Route path="/facultades" element={<FacultadesPage />} />
            <Route path="/facultades/:id" element={<FacultadDetallePage />} />
            
            {/* Rutas para Programas */}
            <Route path="/programas" element={<ProgramasPage />} />
            <Route path="/programas/:id" element={<ProgramaDetallePage />} />
            
            {/* Otras rutas */}
            <Route path="/carga-academica" element={<CargaAcademicaPage />} />
            <Route path="/analisis-estres" element={<AnalisisEstresPage />} />
          </Route>
        </Route>
        
        {/* Rutas protegidas para estudiantes */}
        <Route 
          element={
            <ProtectedRoutes 
              isAuthenticated={isAuthenticated} 
              requiredRole="student"
              redirectTo="/login" 
            />
          }
        >
          <Route element={<StudentMain />}>
            {/* Dashboard de estudiante */}
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            
            {/* Agregando la ruta para la página de Bienestar */}
            <Route path="/student/bienestar" element={<BienestarAcademicoPage />} />
            
            {/* Estas rutas se implementarían con componentes reales en el futuro */}
            <Route path="/student/courses" element={<div className="p-6 bg-white rounded-lg shadow-sm"><h1 className="text-2xl font-bold text-gray-800 mb-4">Mis Materias</h1><p className="text-gray-600">Esta página está en desarrollo.</p></div>} />
            <Route path="/student/calendar" element={<div className="p-6 bg-white rounded-lg shadow-sm"><h1 className="text-2xl font-bold text-gray-800 mb-4">Calendario Académico</h1><p className="text-gray-600">Esta página está en desarrollo.</p></div>} />
            <Route path="/student/grades" element={<div className="p-6 bg-white rounded-lg shadow-sm"><h1 className="text-2xl font-bold text-gray-800 mb-4">Mis Calificaciones</h1><p className="text-gray-600">Esta página está en desarrollo.</p></div>} />
            <Route path="/student/profile" element={<div className="p-6 bg-white rounded-lg shadow-sm"><h1 className="text-2xl font-bold text-gray-800 mb-4">Mi Perfil</h1><p className="text-gray-600">Esta página está en desarrollo.</p></div>} />
          </Route>
        </Route>
        
        {/* Redirecciones por defecto */}
        <Route path="/" element={
          <Navigate to={
            isAuthenticated && user?.role === 'admin' 
              ? "/dashboard" 
              : isAuthenticated && user?.role === 'student'
                ? "/student/dashboard"
                : "/login"
          } replace />
        } />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;