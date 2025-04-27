import { Navbar } from "../Navbar/Navbar";
import Dashboard from "../../../pages/Dashboard/Dashboard";

export const Main = () => {

    return(
        <div className="flex flex-row">
            <div>
                <Navbar/>
            </div>
            <div>
                <Dashboard/>
            </div>
        </div>
    );
};