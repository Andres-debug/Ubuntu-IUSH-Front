import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../../modules/auth/LoginPage';
import { Main } from '../../modules/layout/Main/Main';
import ProtectedRoutes from './ProtectedRoutes';

const AppRoutes = () => {
  // Por ahora, hardcodeamos isAuthenticated
  // Luego lo reemplazaremos con Zustand
  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<LoginPage />} />
          
        {/* Rutas protegidas */}
        <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
          <Route path="/dashboard" element={<Main />} />
          {/* Aquí puedes agregar más rutas protegidas */}
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/settings" element={<Settings />} /> */}
        </Route>
        
        {/* Redirecciones por defecto */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;