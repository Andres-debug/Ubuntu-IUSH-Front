import { Outlet } from 'react-router-dom';
import { NavbarProvider } from '../Navbar/Navbar';
import { StudentNavbar } from '../Navbar/StudentNavbar';
import { AppBar } from '../AppBar/AppBar';

export const StudentMain = () => {
  return (
    <NavbarProvider>
      <div className="flex flex-col min-h-screen">
        <AppBar />
        <div className="flex flex-1">
          <StudentNavbar />
          <main className="flex-1 p-6 pt-16 md:pt-6 md:ml-[80px] lg:ml-[250px] transition-all duration-300 ease-in-out">
            <div className="container mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </NavbarProvider>
  );
};