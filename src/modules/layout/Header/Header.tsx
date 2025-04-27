import { FaUser } from "react-icons/fa";
import { useState } from "react";

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    const userIcon = () => (<FaUser className="text-2xl" />);

    return (
        <div className="bg-gray-500 w-full h-[80px] flex items-center justify-end pr-8">
            <div className="relative">
                <button 
                    className="btn m-1"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {userIcon()}
                </button>
                
                {isOpen && (
                    <ul className="absolute right-0 menu bg-base-100 rounded-box z-[1000] w-52 p-2 shadow-md mt-2">
                        <li><a>Perfil</a></li>
                        <li><a>Cerrar Sesión</a></li>
                    </ul>
                )}
            </div>
        </div>
    )
}