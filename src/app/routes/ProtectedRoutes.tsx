import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRoutesProps {
  isAuthenticated: boolean;
  redirectPath?: string;
}

const ProtectedRoutes = ({ 
  isAuthenticated, 
  redirectPath = '/login' 
}: ProtectedRoutesProps) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;