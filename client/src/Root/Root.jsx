import Header from "../Components/Header/Header";
import { Outlet } from "react-router-dom";

import Modals from "../Modals/Modals";

export default function Root() {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Header />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <main>
                            <Outlet />
                        </main>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Modals />
                    </div>
                </div>
            </div>
        </>
    );
}
