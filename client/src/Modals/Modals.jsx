import UploadModal from "./UploadModal/UploadModal";
import PreferenceModal from "./PreferenceModal/PreferenceModal";
import EditImageModal from "./EditImageModal/EditImageModal";
import EmailArtistModal from "./EmailArtistModal/EmailArtistModal";

export default function Modals() {
    return (
        <>
            <UploadModal />
            <PreferenceModal />
            <EditImageModal />
            <EmailArtistModal />
        </>
    );
}
