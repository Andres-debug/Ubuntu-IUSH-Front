import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
  setIsAuthenticated: (value: boolean) => void;
}

const LoginPage = ({ setIsAuthenticated }: LoginPageProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username && password) {
      // Almacenamos el token
      localStorage.setItem('token', 'fake-token');
      
      // Actualizamos el estado de autenticación
      setIsAuthenticated(true);
      
      // Emitimos un evento personalizado para notificar el cambio en localStorage
      window.dispatchEvent(new Event('storage-changed'));
      
      // Navegamos al dashboard
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
      <div className="w-full max-w-md p-10 mx-4 bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
        <h1 className="text-2xl font-medium mb-8 text-center text-gray-800 tracking-tight">
          Inicio de Sesión
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Usuario */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="username"
              className="text-gray-600 text-sm font-normal p-[2%]"
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
              className="text-gray-600 text-sm font-normal p-[2%]"
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
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="remember" className="cursor-pointer">
                Recordarme
              </label>
            </div>
            <a
              href="#"
              className="text-blue-500 hover:text-blue-700 font-medium mt-2 sm:mt-0"
            >
              ¿Olvidó su contraseña?
            </a>
          </div>
          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium text-base py-3 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Iniciar sesión
          </button>
        </form>

        {/* Registro */}
        <div className="mt-8 text-center text-sm text-gray-500">
          ¿No tiene una cuenta?{" "}
          <a href="#" className="text-blue-500 hover:text-blue-700 font-medium">
            Registrarse
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
