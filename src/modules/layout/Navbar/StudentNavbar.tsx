import { useState, useEffect } from "react";
import { IoMdHome } from "react-icons/io";
import { MdChevronLeft } from "react-icons/md";
import { BsBook, BsCalendar3, BsFileEarmarkText, BsGraphUp } from "react-icons/bs";
import { FaUserGraduate } from "react-icons/fa";
import { RiMentalHealthFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { useNavbar } from "./Navbar";

export const StudentNavbar = () => {
  const { isExpanded, toggleNavbar } = useNavbar();
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  
  // Determinamos la sección activa basada en la ruta actual
  const getActiveSection = () => {
    const path = location.pathname;
    if (path.includes('/student/dashboard')) return "inicio";
    if (path.includes('/student/courses')) return "cursos";
    if (path.includes('/student/calendar')) return "calendario";
    if (path.includes('/student/grades')) return "calificaciones";
    if (path.includes('/student/profile')) return "perfil";
    if (path.includes('/student/bienestar')) return "bienestar";
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
            to="/student/dashboard"
            className={`flex flex-col items-center justify-center p-2 rounded-md transition-colors ${
                activeItem === "inicio" ? "text-blue-500" : "text-gray-600"
            }`}
            onClick={() => handleMenuItemClick("inicio")}
          >
            <IoMdHome className="text-2xl" />
            <span className="text-xs mt-1">Inicio</span>
          </Link>
          
          <Link 
            to="/student/courses"
            className={`flex flex-col items-center justify-center p-2 rounded-md transition-colors ${
                activeItem === "cursos" ? "text-blue-500" : "text-gray-600"
            }`}
            onClick={() => handleMenuItemClick("cursos")}
          >
            <BsBook className="text-2xl" />
            <span className="text-xs mt-1">Materias</span>
          </Link>
          
          <Link 
            to="/student/calendar"
            className={`flex flex-col items-center justify-center p-2 rounded-md transition-colors ${
                activeItem === "calendario" ? "text-blue-500" : "text-gray-600"
            }`}
            onClick={() => handleMenuItemClick("calendario")}
          >
            <BsCalendar3 className="text-2xl" />
            <span className="text-xs mt-1">Calendario</span>
          </Link>

          <Link 
            to="/student/grades"
            className={`flex flex-col items-center justify-center p-2 rounded-md transition-colors ${
                activeItem === "calificaciones" ? "text-blue-500" : "text-gray-600"
            }`}
            onClick={() => handleMenuItemClick("calificaciones")}
          >
            <BsFileEarmarkText className="text-2xl" />
            <span className="text-xs mt-1">Notas</span>
          </Link>

          <Link 
            to="/student/bienestar"
            className={`flex flex-col items-center justify-center p-2 rounded-md transition-colors ${
                activeItem === "bienestar" ? "text-blue-500" : "text-gray-600"
            }`}
            onClick={() => handleMenuItemClick("bienestar")}
          >
            <RiMentalHealthFill className="text-2xl" />
            <span className="text-xs mt-1">Bienestar</span>
          </Link>

          <Link 
            to="/student/profile"
            className={`flex flex-col items-center justify-center p-2 rounded-md transition-colors ${
                activeItem === "perfil" ? "text-blue-500" : "text-gray-600"
            }`}
            onClick={() => handleMenuItemClick("perfil")}
          >
            <FaUserGraduate className="text-2xl" />
            <span className="text-xs mt-1">Perfil</span>
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
            <span className="text-xl font-bold text-blue-600">S</span>
          </div>
          <h2 className={`ml-3 text-xl font-semibold text-gray-800 whitespace-nowrap transition-opacity duration-300 ${
              isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}>
            Portal Estudiante
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
            to="/student/dashboard"
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
            to="/student/courses"
            className={`flex items-center rounded-lg py-3 px-3 transition-all duration-200 ${
                activeItem === "cursos" 
                    ? "bg-blue-50 text-blue-600 font-medium" 
                    : "text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => handleMenuItemClick("cursos")}
          >
            <div className={`flex justify-center w-8`}>
              <BsBook className={`${activeItem === "cursos" ? "text-blue-600" : "text-gray-500"} text-xl`} />
            </div>
            <span className={`ml-3 transition-all duration-300 whitespace-nowrap ${
                isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}>
              Mis Materias
            </span>
            {activeItem === "cursos" && (
              <div className={`ml-auto w-1.5 h-5 bg-blue-600 rounded-full transition-opacity duration-300 ${
                  isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}></div>
            )}
          </Link>
          
          <Link 
            to="/student/calendar"
            className={`flex items-center rounded-lg py-3 px-3 transition-all duration-200 ${
                activeItem === "calendario" 
                    ? "bg-blue-50 text-blue-600 font-medium" 
                    : "text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => handleMenuItemClick("calendario")}
          >
            <div className={`flex justify-center w-8`}>
              <BsCalendar3 className={`${activeItem === "calendario" ? "text-blue-600" : "text-gray-500"} text-xl`} />
            </div>
            <span className={`ml-3 transition-all duration-300 whitespace-nowrap ${
                isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}>
              Calendario
            </span>
            {activeItem === "calendario" && (
              <div className={`ml-auto w-1.5 h-5 bg-blue-600 rounded-full transition-opacity duration-300 ${
                  isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}></div>
            )}
          </Link>

          <Link 
            to="/student/grades"
            className={`flex items-center rounded-lg py-3 px-3 transition-all duration-200 ${
                activeItem === "calificaciones" 
                    ? "bg-blue-50 text-blue-600 font-medium" 
                    : "text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => handleMenuItemClick("calificaciones")}
          >
            <div className={`flex justify-center w-8`}>
              <BsFileEarmarkText className={`${activeItem === "calificaciones" ? "text-blue-600" : "text-gray-500"} text-xl`} />
            </div>
            <span className={`ml-3 transition-all duration-300 whitespace-nowrap ${
                isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}>
              Calificaciones
            </span>
            {activeItem === "calificaciones" && (
              <div className={`ml-auto w-1.5 h-5 bg-blue-600 rounded-full transition-opacity duration-300 ${
                  isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}></div>
            )}
          </Link>

          <Link 
            to="/student/bienestar"
            className={`flex items-center rounded-lg py-3 px-3 transition-all duration-200 ${
                activeItem === "bienestar" 
                    ? "bg-blue-50 text-blue-600 font-medium" 
                    : "text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => handleMenuItemClick("bienestar")}
          >
            <div className={`flex justify-center w-8`}>
              <RiMentalHealthFill className={`${activeItem === "bienestar" ? "text-blue-600" : "text-gray-500"} text-xl`} />
            </div>
            <span className={`ml-3 transition-all duration-300 whitespace-nowrap ${
                isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}>
              Bienestar
            </span>
            {activeItem === "bienestar" && (
              <div className={`ml-auto w-1.5 h-5 bg-blue-600 rounded-full transition-opacity duration-300 ${
                  isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}></div>
            )}
          </Link>

          <Link 
            to="/student/profile"
            className={`flex items-center rounded-lg py-3 px-3 transition-all duration-200 ${
                activeItem === "perfil" 
                    ? "bg-blue-50 text-blue-600 font-medium" 
                    : "text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => handleMenuItemClick("perfil")}
          >
            <div className={`flex justify-center w-8`}>
              <FaUserGraduate className={`${activeItem === "perfil" ? "text-blue-600" : "text-gray-500"} text-xl`} />
            </div>
            <span className={`ml-3 transition-all duration-300 whitespace-nowrap ${
                isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}>
              Mi Perfil
            </span>
            {activeItem === "perfil" && (
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