import { FaUser } from "react-icons/fa";
import Dropdown from 'react-bootstrap/Dropdown';

export const Header = () => {
    const userIcon = () => (<FaUser className="text-2xl" />);

    return (
        <div className="bg-gray-500 w-full h-[80px] flex items-center justify-end pr-8">
            <Dropdown align="end">
                <Dropdown.Toggle 
                    as="div" 
                    id="dropdown-basic" 
                    className="border-0 bg-transparent cursor-pointer"  // le quité variant
                >
                    {userIcon()}
                </Dropdown.Toggle>

                <Dropdown.Menu className="mt-2 shadow-sm">
                    <Dropdown.Item>Perfil</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item className="text-danger">Cerrar Sesión</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown> 
        </div>
    )
}
