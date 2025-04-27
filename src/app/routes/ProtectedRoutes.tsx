import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/auth.store';
import type { UserRole } from '../stores/auth.store';

interface ProtectedRoutesProps {
  isAuthenticated: boolean;
  requiredRole?: UserRole;
  redirectTo?: string;
}

const ProtectedRoutes = ({ 
  isAuthenticated, 
  requiredRole,
  redirectTo = '/login' 
}: ProtectedRoutesProps) => {
  const { user } = useAuthStore();
  
  // Si no está autenticado, redirigimos al login
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }
  
  // Si requiere un rol específico y el usuario no lo tiene, redirigimos
  if (requiredRole && user?.role !== requiredRole) {
    // Si el usuario es administrador intentando acceder a una ruta de estudiante
    if (user?.role === 'admin' && requiredRole === 'student') {
      return <Navigate to="/dashboard" replace />;
    }
    
    // Si el usuario es estudiante intentando acceder a una ruta de administrador
    if (user?.role === 'student' && requiredRole === 'admin') {
      return <Navigate to="/student/dashboard" replace />;
    }
    
    // Para cualquier otro caso, redirigimos al login
    return <Navigate to={redirectTo} replace />;
  }

  // Si pasa todas las verificaciones, permitimos el acceso a las rutas anidadas
  return <Outlet />;
};

export default ProtectedRoutes;