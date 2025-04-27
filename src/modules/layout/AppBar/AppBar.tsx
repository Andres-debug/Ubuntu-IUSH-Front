import { useNavigate } from 'react-router-dom';
import { IoMdLogOut } from 'react-icons/io';
import { IoNotifications } from 'react-icons/io5';

export const AppBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Eliminar el token del localStorage
        localStorage.removeItem('token');
        
        // Disparar evento para notificar el cambio
        window.dispatchEvent(new Event('storage-changed'));
        
        // Navegar al login
        navigate('/login');
    };

    return (
        <div className="w-full bg-white shadow-md p-4 flex justify-between items-center">
            <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-800">OmegaLab</h1>
            </div>
            
            <div className="flex items-center gap-4">
                <button className="p-2 text-gray-600 hover:text-blue-500 rounded-full hover:bg-gray-100">
                    <IoNotifications className="text-xl" />
                </button>
                
                <div className="h-8 w-[1px] bg-gray-200"></div>
                
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                        US
                    </div>
                    <div className="hidden md:block">
                        <p className="text-sm font-medium text-gray-700">Usuario</p>
                        <p className="text-xs text-gray-500">Estudiante</p>
                    </div>
                </div>
                
                <button 
                    onClick={handleLogout}
                    className="p-2 text-gray-600 hover:text-red-500 rounded-full hover:bg-gray-100"
                >
                    <IoMdLogOut className="text-xl" />
                </button>
            </div>
        </div>
    );
};