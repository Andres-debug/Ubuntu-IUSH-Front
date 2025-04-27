import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdHome } from "react-icons/io";
import { FaChartLine } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";

export const Navbar = () => {

    const hamburgerIcon = () => (<RxHamburgerMenu className="text-2xl" />);
    const homeIcon = () => (<IoMdHome className="text-2xl" />);
    const studentIcon = () => (<IoPerson className="text-2xl" />);
    const chartIcon = () => (<FaChartLine className="text-2xl" />);

    return(
        <div className="bg-white h-[100vh] w-[230px] p-4">
            <button className="btn btn-primary w-full mb-6">{hamburgerIcon()}</button>
            <div className="flex flex-col gap-3 mt-4">
                <button className="btn btn-outline text-left">{homeIcon()} Inicio</button>
                <button className="btn btn-outline text-left">{studentIcon()} Estudiante</button>
                <button className="btn btn-outline text-left">{chartIcon()} Estadisticas</button>
            </div>
        </div>
    );
};