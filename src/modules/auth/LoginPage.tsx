import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../app/stores/auth.store';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  
  // Usar el store de autenticación
  const { login, isLoading, error, isAuthenticated, user, getUser } = useAuthStore();

  // Redireccionar si ya está autenticado
  useEffect(() => {
    const currentUser = getUser();
    
    if (isAuthenticated && currentUser) {
      // Redirigir según el rol del usuario
      if (currentUser.role === 'admin') {
        navigate('/dashboard');
      } else if (currentUser.role === 'student') {
        navigate('/student/dashboard');
      }
    }
  }, [isAuthenticated, navigate, getUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username && password) {
      const success = await login(username, password);
      
      if (success) {
        const currentUser = getUser();
        
        // Redirigir según el rol del usuario
        if (currentUser?.role === 'admin') {
          navigate('/dashboard');
        } else if (currentUser?.role === 'student') {
          navigate('/student/dashboard');
        }
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
      <div className="w-full max-w-md p-10 mx-4 bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2 text-gray-800 tracking-tight">
            Sistema Académico
          </h1>
          <p className="text-gray-600">Inicia sesión para acceder al sistema</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Usuario */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="username"
              className="text-gray-600 text-sm font-medium"
            >
              Usuario
            </label>
            <input
              id="username"
              type="text"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-base transition-colors"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingrese su nombre de usuario"
              required
            />
          </div>

          {/* Contraseña */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-gray-600 text-sm font-medium"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-base transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              required
            />
          </div>
          
          {/* Recordarme */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded cursor-pointer"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember" className="cursor-pointer text-gray-600">
                Recordarme
              </label>
            </div>
            <a
              href="#"
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              ¿Olvidó su contraseña?
            </a>
          </div>
          
          {/* Guía de usuarios */}
          <div className="bg-blue-50 p-4 rounded-md text-sm text-blue-800">
            <p className="font-medium mb-1">Usuarios de demostración:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Admin:</strong> usuario: admin, contraseña: password</li>
              <li><strong>Estudiante:</strong> usuario: student, contraseña: password</li>
            </ul>
          </div>
          
          {/* Botón */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-base py-3 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Iniciando sesión...
              </>
            ) : (
              'Iniciar sesión'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Universidad - Sistema de Gestión Académica © 2025
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
