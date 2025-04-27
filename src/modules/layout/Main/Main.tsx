import { Navbar } from "../Navbar/Navbar";
import { AppBar } from "../AppBar/AppBar";
import { Outlet } from "react-router-dom";

export const Main = () => {
    return(
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
            {/* SideBar (Navbar) */}
            <div className="hidden md:block">
                <Navbar/>
            </div>
            
            {/* Contenido principal */}
            <div className="flex-1 flex flex-col">
                {/* AppBar superior */}
                <AppBar />
                
                {/* Contenido dinámico (rutas anidadas) */}
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