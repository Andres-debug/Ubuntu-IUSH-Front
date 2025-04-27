import { Navbar } from "../Navbar/Navbar";
import Dashboard from "../../../pages/Dashboard/Dashboard";
import { Header } from "../Header/Header";

export const Main = () => {

    return(
        <div className="flex flex-row">
            <div>
                <Navbar/>
            </div>
            <div className="h-[100vh] w-[100%] ">
                <div>
                    <Header/>
                </div>
                <div>
                    <Dashboard/>
                </div>
            </div>
        </div>
    );
};