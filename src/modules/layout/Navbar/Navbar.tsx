import { useState, useEffect } from "react";
import { IoMdHome } from "react-icons/io";
import { MdKeyboardArrowLeft, MdSchool } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";
import { HiOutlineClipboardCheck, HiOutlineChartBar } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();
    
    // Determinamos la sección activa basada en la ruta actual
    const getActiveSection = () => {
        const path = location.pathname;
        if (path.includes('/dashboard')) return "inicio";
        if (path.includes('/facultades')) return "facultades";
        if (path.includes('/programas')) return "programas";
        if (path.includes('/carga-academica')) return "cargaAcademica";
        if (path.includes('/analisis-estres')) return "analisisEstres";
        return "inicio"; // Por defecto
    };
    
    const [activeItem, setActiveItem] = useState(getActiveSection);

    // Actualizamos activeItem cuando cambia la ruta
    useEffect(() => {
        setActiveItem(getActiveSection());
    }, [location]);

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

    // Navbar para móvil (parte inferior)
    if (isMobile) {
        return (
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
                <div className="flex justify-around items-center px-2 py-3">
                    <Link 
                        to="/dashboard"
                        className={`flex flex-col items-center justify-center p-2 rounded-md transition-colors ${
                            activeItem === "inicio" ? "text-blue-500" : "text-gray-600"
                        }`}
                        onClick={() => handleMenuItemClick("inicio")}
                    >
                        <IoMdHome className="text-2xl" />
                        <span className="text-xs mt-1">Inicio</span>
                    </Link>
                    
                    <Link 
                        to="/facultades"
                        className={`flex flex-col items-center justify-center p-2 rounded-md transition-colors ${
                            activeItem === "facultades" ? "text-blue-500" : "text-gray-600"
                        }`}
                        onClick={() => handleMenuItemClick("facultades")}
                    >
                        <MdSchool className="text-2xl" />
                        <span className="text-xs mt-1">Facultades</span>
                    </Link>
                    
                    <Link 
                        to="/programas"
                        className={`flex flex-col items-center justify-center p-2 rounded-md transition-colors ${
                            activeItem === "programas" ? "text-blue-500" : "text-gray-600"
                        }`}
                        onClick={() => handleMenuItemClick("programas")}
                    >
                        <FaGraduationCap className="text-2xl" />
                        <span className="text-xs mt-1">Programas</span>
                    </Link>

                    <Link 
                        to="/carga-academica"
                        className={`flex flex-col items-center justify-center p-2 rounded-md transition-colors ${
                            activeItem === "cargaAcademica" ? "text-blue-500" : "text-gray-600"
                        }`}
                        onClick={() => handleMenuItemClick("cargaAcademica")}
                    >
                        <HiOutlineClipboardCheck className="text-2xl" />
                        <span className="text-xs mt-1">Carga</span>
                    </Link>

                    <Link 
                        to="/analisis-estres"
                        className={`flex flex-col items-center justify-center p-2 rounded-md transition-colors ${
                            activeItem === "analisisEstres" ? "text-blue-500" : "text-gray-600"
                        }`}
                        onClick={() => handleMenuItemClick("analisisEstres")}
                    >
                        <HiOutlineChartBar className="text-2xl" />
                        <span className="text-xs mt-1">Análisis</span>
                    </Link>
                </div>
            </div>
        );
    }

    // Navbar para escritorio (lateral) - Mejorado
    return (
        <div 
            className={`bg-white h-screen border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out ${
                isExpanded ? "w-[250px]" : "w-[80px]"
            }`}
        >
            {/* Logo o título */}
            <div className="h-16 flex items-center justify-center border-b border-gray-100">
                {isExpanded ? (
                    <h2 className="text-xl font-semibold text-gray-800">OmegaLab</h2>
                ) : (
                    <h2 className="text-xl font-bold text-blue-600">O</h2>
                )}
            </div>
            
            {/* Contenido principal del Navbar */}
            <div className="py-6 px-4">
                {/* Menú de navegación */}
                <nav className="flex flex-col gap-2 mb-6">
                    <Link 
                        to="/dashboard"
                        className={`flex items-center rounded-lg py-3 px-3 transition-all duration-200 ${
                            activeItem === "inicio" 
                                ? "bg-blue-50 text-blue-600 font-medium" 
                                : "text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() => handleMenuItemClick("inicio")}
                    >
                        <div className={`min-w-8 flex justify-center ${!isExpanded ? 'w-full' : ''}`}>
                            <IoMdHome className={`${activeItem === "inicio" ? "text-blue-600" : "text-gray-500"} text-xl`} />
                        </div>
                        {isExpanded && <span className="ml-3 transition-opacity duration-200">Inicio</span>}
                        {isExpanded && activeItem === "inicio" && (
                            <div className="ml-auto w-1 h-5 bg-blue-600 rounded-full"></div>
                        )}
                    </Link>
                    
                    <Link 
                        to="/facultades"
                        className={`flex items-center rounded-lg py-3 px-3 transition-all duration-200 ${
                            activeItem === "facultades" 
                                ? "bg-blue-50 text-blue-600 font-medium" 
                                : "text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() => handleMenuItemClick("facultades")}
                    >
                        <div className={`min-w-8 flex justify-center ${!isExpanded ? 'w-full' : ''}`}>
                            <MdSchool className={`${activeItem === "facultades" ? "text-blue-600" : "text-gray-500"} text-xl`} />
                        </div>
                        {isExpanded && <span className="ml-3 transition-opacity duration-200">Facultades</span>}
                        {isExpanded && activeItem === "facultades" && (
                            <div className="ml-auto w-1 h-5 bg-blue-600 rounded-full"></div>
                        )}
                    </Link>
                    
                    <Link 
                        to="/programas"
                        className={`flex items-center rounded-lg py-3 px-3 transition-all duration-200 ${
                            activeItem === "programas" 
                                ? "bg-blue-50 text-blue-600 font-medium" 
                                : "text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() => handleMenuItemClick("programas")}
                    >
                        <div className={`min-w-8 flex justify-center ${!isExpanded ? 'w-full' : ''}`}>
                            <FaGraduationCap className={`${activeItem === "programas" ? "text-blue-600" : "text-gray-500"} text-xl`} />
                        </div>
                        {isExpanded && <span className="ml-3 transition-opacity duration-200">Programas</span>}
                        {isExpanded && activeItem === "programas" && (
                            <div className="ml-auto w-1 h-5 bg-blue-600 rounded-full"></div>
                        )}
                    </Link>

                    <Link 
                        to="/carga-academica"
                        className={`flex items-center rounded-lg py-3 px-3 transition-all duration-200 ${
                            activeItem === "cargaAcademica" 
                                ? "bg-blue-50 text-blue-600 font-medium" 
                                : "text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() => handleMenuItemClick("cargaAcademica")}
                    >
                        <div className={`min-w-8 flex justify-center ${!isExpanded ? 'w-full' : ''}`}>
                            <HiOutlineClipboardCheck className={`${activeItem === "cargaAcademica" ? "text-blue-600" : "text-gray-500"} text-xl`} />
                        </div>
                        {isExpanded && <span className="ml-3 transition-opacity duration-200">Carga Académica</span>}
                        {isExpanded && activeItem === "cargaAcademica" && (
                            <div className="ml-auto w-1 h-5 bg-blue-600 rounded-full"></div>
                        )}
                    </Link>

                    <Link 
                        to="/analisis-estres"
                        className={`flex items-center rounded-lg py-3 px-3 transition-all duration-200 ${
                            activeItem === "analisisEstres" 
                                ? "bg-blue-50 text-blue-600 font-medium" 
                                : "text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() => handleMenuItemClick("analisisEstres")}
                    >
                        <div className={`min-w-8 flex justify-center ${!isExpanded ? 'w-full' : ''}`}>
                            <HiOutlineChartBar className={`${activeItem === "analisisEstres" ? "text-blue-600" : "text-gray-500"} text-xl`} />
                        </div>
                        {isExpanded && <span className="ml-3 transition-opacity duration-200">Análisis de Estrés</span>}
                        {isExpanded && activeItem === "analisisEstres" && (
                            <div className="ml-auto w-1 h-5 bg-blue-600 rounded-full"></div>
                        )}
                    </Link>
                </nav>
                
                {/* Botón para colapsar/expandir - Versión mejorada */}
                <div className="px-3">
                    <button 
                        onClick={toggleNavbar}
                        className={`flex items-center justify-center w-full p-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-all duration-200`}
                    >
                        <MdKeyboardArrowLeft 
                            className={`text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-0' : 'rotate-180'}`} 
                            size={22}
                        />
                        {isExpanded && (
                            <span className="ml-2 text-sm text-gray-600">Colapsar</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};