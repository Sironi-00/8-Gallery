import Header from "../Components/Header/Header";
import { Outlet } from "react-router-dom";

import Modals from "../Modals/Modals";
import { useContext, useEffect } from "react";
import { userName } from "../Api/Api";
import { AppContext } from "../ContextProvider/ContextProvider";

export default function Root() {
    const { currentUser, updateCurrentUser } = useContext(AppContext);

    useEffect(() => {
        (async () => {
            if (!currentUser.id) {
                updateCurrentUser();
                return;
            }
            const checkUser = await userName(currentUser.id);
            if (!checkUser || checkUser.id !== currentUser.id) {
                updateCurrentUser();
            }
        })();
    }, [currentUser?.id, updateCurrentUser]);

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
