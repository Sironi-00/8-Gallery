import Header from "../Components/Header/Header"
import { Outlet } from "react-router-dom";

import UploadModal from "../Modals/UploadModal/UploadModal";
import PreferenceModal from "../Modals/PreferenceModal/PreferenceModal";
import EditImageModal from "../Modals/EditImageModal/EditImageModal";

export default function Root() {
  return (
    <>
    <Header />
    <main>
      <Outlet/>
    </main>
    <UploadModal/>
    <PreferenceModal/>
    <EditImageModal />
    </>
  )
}
