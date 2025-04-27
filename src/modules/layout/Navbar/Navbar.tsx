import { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdHome } from "react-icons/io";
import { FaChartLine } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";

export const Navbar = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [activeItem, setActiveItem] = useState("inicio");
    const [isMobile, setIsMobile] = useState(false);

    // Detectar si el dispositivo es móvil
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth < 768) {
                setIsExpanded(false); // Colapsar automáticamente en móvil
            }
        };
        
        checkMobile(); // Comprobar al inicio
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const toggleNavbar = () => {
        setIsExpanded(!isExpanded);
    };

    const handleMenuItemClick = (itemName: string) => {
        setActiveItem(itemName);
    };

    const getItemStyles = (itemName: string) => {
        const isActive = activeItem === itemName;
        return {
            justifyContent: isExpanded ? 'flex-start' : 'center',
            paddingLeft: isExpanded ? '1rem' : '0',
            paddingRight: isExpanded ? '1rem' : '0',
            gap: isExpanded ? '0.75rem' : '0',
            backgroundColor: isActive ? 'rgb(243, 244, 246)' : ''
        };
    };

    // Navbar para móvil (parte inferior) - Sin botón de menú
    if (isMobile) {
        return (
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
                <div className="flex justify-around items-center px-2 py-3">
                    <button 
                        className={`flex flex-col items-center justify-center p-2 rounded-md transition-colors ${
                            activeItem === "inicio" ? "text-blue-500" : "text-gray-600"
                        }`}
                        onClick={() => handleMenuItemClick("inicio")}
                    >
                        <IoMdHome className="text-2xl" />
                        <span className="text-xs mt-1">Inicio</span>
                    </button>
                    
                    <button 
                        className={`flex flex-col items-center justify-center p-2 rounded-md transition-colors ${
                            activeItem === "estudiante" ? "text-blue-500" : "text-gray-600"
                        }`}
                        onClick={() => handleMenuItemClick("estudiante")}
                    >
                        <IoPerson className="text-2xl" />
                        <span className="text-xs mt-1">Estudiante</span>
                    </button>
                    
                    <button 
                        className={`flex flex-col items-center justify-center p-2 rounded-md transition-colors ${
                            activeItem === "estadisticas" ? "text-blue-500" : "text-gray-600"
                        }`}
                        onClick={() => handleMenuItemClick("estadisticas")}
                    >
                        <FaChartLine className="text-2xl" />
                        <span className="text-xs mt-1">Estadísticas</span>
                    </button>
                </div>
            </div>
        );
    }

    // Navbar para escritorio (lateral) - Sin cambios
    return (
        <div 
            className={`bg-white h-screen shadow-lg border-r border-gray-200 transition-all duration-300 ${
                isExpanded ? "w-[250px] p-6" : "w-[80px] p-4"
            }`}
        >
            {/* Logo o título */}
            <div className={`${isExpanded ? "mb-8" : "mb-6"} flex justify-center transition-all duration-300`}>
                {isExpanded ? (
                    <h2 className="text-xl font-medium text-gray-800 tracking-tight">OmegaLab</h2>
                ) : (
                    <h2 className="text-xl font-bold text-gray-800">O</h2>
                )}
            </div>
            
            {/* Botón de hamburguesa - sin rotación */}
            <button 
                onClick={toggleNavbar}
                className="w-full flex items-center mb-8 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer"
                style={{
                    justifyContent: isExpanded ? 'space-between' : 'center'
                }}
            >
                {isExpanded && (
                    <span className="transition-opacity duration-300 ease-in-out">Menú</span>
                )}
                <RxHamburgerMenu 
                    className={`transition-all duration-300 ${isExpanded ? 'text-xl' : 'text-2xl'}`} 
                />
            </button>
            
            {/* Menú de navegación */}
            <nav className="flex flex-col gap-2">
                <button 
                    className={`flex items-center cursor-pointer w-full py-3 text-left rounded-md transition-all duration-300 ${
                        activeItem === "inicio" 
                            ? "text-blue-500 bg-gray-50" 
                            : "text-gray-700 hover:bg-gray-50 hover:text-blue-500"
                    }`}
                    style={getItemStyles("inicio")}
                    onClick={() => handleMenuItemClick("inicio")}
                >
                    <IoMdHome className={`transition-all duration-300 ${isExpanded ? 'text-xl' : 'text-2xl'}`} />
                    {isExpanded && <span className="font-medium transition-opacity duration-300">Inicio</span>}
                </button>
                
                <button 
                    className={`flex items-center cursor-pointer w-full py-3 text-left rounded-md transition-all duration-300 ${
                        activeItem === "estudiante" 
                            ? "text-blue-500 bg-gray-50" 
                            : "text-gray-700 hover:bg-gray-50 hover:text-blue-500"
                    }`}
                    style={getItemStyles("estudiante")}
                    onClick={() => handleMenuItemClick("estudiante")}
                >
                    <IoPerson className={`transition-all duration-300 ${isExpanded ? 'text-xl' : 'text-2xl'}`} />
                    {isExpanded && <span className="font-medium transition-opacity duration-300">Estudiante</span>}
                </button>
                
                <button 
                    className={`flex items-center cursor-pointer w-full py-3 text-left rounded-md transition-all duration-300 ${
                        activeItem === "estadisticas" 
                            ? "text-blue-500 bg-gray-50" 
                            : "text-gray-700 hover:bg-gray-50 hover:text-blue-500"
                    }`}
                    style={getItemStyles("estadisticas")}
                    onClick={() => handleMenuItemClick("estadisticas")}
                >
                    <FaChartLine className={`transition-all duration-300 ${isExpanded ? 'text-xl' : 'text-2xl'}`} />
                    {isExpanded && <span className="font-medium transition-opacity duration-300">Estadísticas</span>}
                </button>
            </nav>
            
            {/* Separador */}
            <div className="border-t border-gray-200 my-6"></div>
        </div>
    );
};