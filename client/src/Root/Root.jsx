import Header from "../Components/Header/Header";
import { Outlet } from "react-router-dom";

import Modals from "../Modals/Modals";

export default function Root() {
    return (
        <>
            <div className="d-flex flex-column vh-100 vw-100">
                <Header />
                <main className="flex-grow-1 overflow-hidden">
                    <Outlet />
                </main>
                {/* <p>Sironi-00</p> */}
                <Modals />
            </div>
        </>
    );
}
