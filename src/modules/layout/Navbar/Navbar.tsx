import { useState, useEffect, createContext, useContext } from "react";
import { IoMdHome } from "react-icons/io";
import { MdSchool, MdChevronLeft } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";
import { HiOutlineClipboardCheck, HiOutlineChartBar, HiMenuAlt2 } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

// Crear contexto para compartir el estado de expansión del navbar
export const NavbarContext = createContext<{
    isExpanded: boolean;
    toggleNavbar: () => void;
}>({
    isExpanded: true,
    toggleNavbar: () => {}
});

export const useNavbar = () => useContext(NavbarContext);

export const NavbarProvider = ({ children }: { children: React.ReactNode }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    // Detectar si el dispositivo es móvil
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth < 768) {
                setIsExpanded(false); // Colapsar automáticamente en móvil
            } else {
                setIsExpanded(true); // Expandir en escritorio
            }
        };
        
        checkMobile(); // Comprobar al inicio
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const toggleNavbar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <NavbarContext.Provider value={{ isExpanded, toggleNavbar }}>
            {children}
        </NavbarContext.Provider>
    );
};

export const Navbar = () => {
    const { isExpanded, toggleNavbar } = useNavbar();
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
        };
        
        checkMobile(); // Comprobar al inicio
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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

    // Navbar para escritorio (lateral) - Mejorado y fijo
    return (
        <div 
            className={`bg-white h-screen border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out fixed top-0 left-0 z-10 overflow-y-auto group ${
                isExpanded ? "w-[250px]" : "w-[80px] hover:w-[250px]"
            }`}
        >
            {/* Logo y control de colapsar/expandir en la cabecera */}
            <div className="h-16 flex items-center justify-between border-b border-gray-100 px-4">
                <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-blue-50">
                        <span className="text-xl font-bold text-blue-600">O</span>
                    </div>
                    <h2 className={`ml-3 text-xl font-semibold text-gray-800 whitespace-nowrap transition-opacity duration-300 ${
                        isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}>
                        OmegaLab
                    </h2>
                </div>
                <button 
                    onClick={toggleNavbar}
                    className={`w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-all duration-200 ${
                        isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                >
                    <MdChevronLeft 
                        className={`transition-transform duration-300 ${isExpanded ? 'rotate-0' : 'rotate-180'}`} 
                        size={22}
                    />
                </button>
            </div>
            
            {/* Contenido principal del Navbar */}
            <div className="py-6 px-3">
                {/* Menú de navegación */}
                <nav className="flex flex-col gap-1">
                    <Link 
                        to="/dashboard"
                        className={`flex items-center rounded-lg py-3 px-3 transition-all duration-200 ${
                            activeItem === "inicio" 
                                ? "bg-blue-50 text-blue-600 font-medium" 
                                : "text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() => handleMenuItemClick("inicio")}
                    >
                        <div className={`flex justify-center w-8`}>
                            <IoMdHome className={`${activeItem === "inicio" ? "text-blue-600" : "text-gray-500"} text-xl`} />
                        </div>
                        <span className={`ml-3 transition-all duration-300 whitespace-nowrap ${
                            isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        }`}>
                            Inicio
                        </span>
                        {activeItem === "inicio" && (
                            <div className={`ml-auto w-1.5 h-5 bg-blue-600 rounded-full transition-opacity duration-300 ${
                                isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            }`}></div>
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
                        <div className={`flex justify-center w-8`}>
                            <MdSchool className={`${activeItem === "facultades" ? "text-blue-600" : "text-gray-500"} text-xl`} />
                        </div>
                        <span className={`ml-3 transition-all duration-300 whitespace-nowrap ${
                            isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        }`}>
                            Facultades
                        </span>
                        {activeItem === "facultades" && (
                            <div className={`ml-auto w-1.5 h-5 bg-blue-600 rounded-full transition-opacity duration-300 ${
                                isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            }`}></div>
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
                        <div className={`flex justify-center w-8`}>
                            <FaGraduationCap className={`${activeItem === "programas" ? "text-blue-600" : "text-gray-500"} text-xl`} />
                        </div>
                        <span className={`ml-3 transition-all duration-300 whitespace-nowrap ${
                            isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        }`}>
                            Programas
                        </span>
                        {activeItem === "programas" && (
                            <div className={`ml-auto w-1.5 h-5 bg-blue-600 rounded-full transition-opacity duration-300 ${
                                isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            }`}></div>
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
                        <div className={`flex justify-center w-8`}>
                            <HiOutlineClipboardCheck className={`${activeItem === "cargaAcademica" ? "text-blue-600" : "text-gray-500"} text-xl`} />
                        </div>
                        <span className={`ml-3 transition-all duration-300 whitespace-nowrap ${
                            isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        }`}>
                            Carga Académica
                        </span>
                        {activeItem === "cargaAcademica" && (
                            <div className={`ml-auto w-1.5 h-5 bg-blue-600 rounded-full transition-opacity duration-300 ${
                                isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            }`}></div>
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
                        <div className={`flex justify-center w-8`}>
                            <HiOutlineChartBar className={`${activeItem === "analisisEstres" ? "text-blue-600" : "text-gray-500"} text-xl`} />
                        </div>
                        <span className={`ml-3 transition-all duration-300 whitespace-nowrap ${
                            isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        }`}>
                            Análisis de Estrés
                        </span>
                        {activeItem === "analisisEstres" && (
                            <div className={`ml-auto w-1.5 h-5 bg-blue-600 rounded-full transition-opacity duration-300 ${
                                isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            }`}></div>
                        )}
                    </Link>
                </nav>
                
                {/* Control de colapsar/expandir en la parte inferior */}
                <div className="mt-auto pt-6 px-3">
                    <div 
                        onClick={toggleNavbar}
                        className={`flex items-center text-sm text-gray-500 hover:text-gray-700 cursor-pointer py-2 transition-opacity duration-300 ${
                            isExpanded ? "opacity-100 justify-between" : "opacity-0 group-hover:opacity-100 justify-center"
                        }`}
                    >
                        <span className={`${isExpanded ? "block" : "hidden group-hover:block"}`}>
                            {isExpanded ? "Colapsar menú" : "Expandir menú"}
                        </span>
                        <MdChevronLeft 
                            className={`transition-transform duration-300 ${isExpanded ? 'rotate-0' : 'rotate-180'}`} 
                            size={18}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};