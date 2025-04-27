import { Navbar, NavbarProvider, useNavbar } from "../Navbar/Navbar";
import { AppBar } from "../AppBar/AppBar";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

// Componente contenedor con el NavbarProvider
export const Main = () => {
    return (
        <NavbarProvider>
            <MainContent />
        </NavbarProvider>
    );
};

// Componente interno que usa el contexto del Navbar
const MainContent = () => {
    const { isExpanded } = useNavbar();
    const [isMobile, setIsMobile] = useState(false);

    // Detectar si el dispositivo es móvil
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile(); // Comprobar al inicio
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
            {/* SideBar (Navbar) - Ahora es fijo */}
            <div className="hidden md:block">
                <Navbar />
            </div>
            
            {/* Contenido principal - Con margen dinámico para el Navbar */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ${
                !isMobile ? (isExpanded ? "ml-[250px]" : "ml-[80px]") : ""
            }`}>
                {/* AppBar superior */}
                <AppBar />
                
                {/* Contenido dinámico (rutas anidadas) con scroll independiente */}
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
                
                {/* Navbar móvil (solo visible en dispositivos móviles) */}
                <div className="md:hidden">
                    <Navbar />
                </div>
            </div>
        </div>
    );
};