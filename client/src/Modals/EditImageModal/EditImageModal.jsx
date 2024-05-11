import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchImageById, updateImage } from "../../Api/Api";
import { AppContext } from "../../ContextProvider/ContextProvider";

export default function EditImageModal() {
    const navigate = useNavigate();
    const { currentUser } = useContext(AppContext);
    const [imageObject, setImageObject] = useState({
        name: "",
        description: "",
        artist: "",
        id: "",
        artistId: "",
    });
    const [queryString, setQueryString] = useSearchParams();

    const imageId = queryString.get("iid");
    useEffect(() => {
        if (!currentUser || !imageId || imageId.length < 1) return;
        (async () => {
            const res = await fetchImageById(imageId);
            if (res) {
                setImageObject({
                    id: imageId,
                    name: res.name,
                    description: res.description,
                    artist: res.artist,
                    artistId: res.artistId,
                });
            } else {
                console.log("Failed to get image");
            }
        })();
    }, [imageId, currentUser, currentUser?.id]);

    const handleImageUpdate = async (e) => {
        e.preventDefault();

        if (currentUser?.id !== imageObject.artistId) return;

        const res = await updateImage(imageObject);
        if (res) {
            setImageObject({
                id: "",
                name: "",
                description: "",
                artist: "",
                artistId: "",
            });

            setQueryString("");
            navigate(`/image/${res.id}`);
        } else {
            console.log("Failed to update image");
        }
    };

    return (
        <div id="edit-image-modal" className="modal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Image Modal</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id="edit-image-modal-form" onSubmit={handleImageUpdate}>
                            <p>Artist: <strong>{currentUser.name}</strong></p>
                            <input
                                type="text"
                                value={imageObject.name}
                                onChange={({ target }) => setImageObject((prev) => ({ ...prev, name: target.value }))}
                                placeholder="Name"
                            />
                            <br />
                            <textarea
                                name="description"
                                value={imageObject.description}
                                onChange={({ target }) =>
                                    setImageObject((prev) => ({ ...prev, description: target.value }))
                                }
                                cols="30"
                                rows="10"
                                placeholder="Image description"
                            ></textarea>
                            <br />
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                        <button type="submit" form="edit-image-modal-form" className="btn btn-primary">
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
