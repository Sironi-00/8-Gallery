import Header from "../Components/Header/Header"
import { Outlet } from "react-router-dom";

import Modals from "../Modals/Modals";

export default function Root() {
  return (
    <>
    <Header />
    <main>
      <Outlet/>
    </main>
    <Modals/>
    </>
  )
}
