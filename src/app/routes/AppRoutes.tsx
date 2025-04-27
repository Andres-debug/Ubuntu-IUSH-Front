import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginPage from '../../modules/auth/LoginPage';
import { Main } from '../../modules/layout/Main/Main';
import ProtectedRoutes from './ProtectedRoutes';
import Dashboard from '../../pages/Dashboard/Dashboard';
import FacultadesPage from '../../modules/Facultades/FacultadesPage';
import ProgramasPage from '../../modules/Programas/ProgramasPage';
import CargaAcademicaPage from '../../modules/CargaAcademica/CargaAcademicaPage';
import AnalisisEstresPage from '../../modules/AnalisisEstres/AnalisisEstresPage';

const AppRoutes = () => {
  // Usamos useState para mantener el estado de autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('token') !== null
  );

  // Añadimos un efecto para escuchar cambios en localStorage
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(localStorage.getItem('token') !== null);
    };

    // Verificamos al inicio
    checkAuth();

    // Creamos un evento personalizado para actualizar el estado de autenticación
    window.addEventListener('storage-changed', checkAuth);

    // Escuchamos cambios en localStorage (útil para cuando varios tabs están abiertos)
    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('storage-changed', checkAuth);
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
          
        {/* Rutas protegidas */}
        <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
          <Route element={<Main />}>
            {/* Dashboard y otras rutas que comparten el mismo layout */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/facultades" element={<FacultadesPage />} />
            <Route path="/programas" element={<ProgramasPage />} />
            <Route path="/carga-academica" element={<CargaAcademicaPage />} />
            <Route path="/analisis-estres" element={<AnalisisEstresPage />} />
          </Route>
        </Route>
        
        {/* Redirecciones por defecto */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;