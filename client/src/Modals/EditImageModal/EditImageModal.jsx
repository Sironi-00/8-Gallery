import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchImageById, updateImage } from "../../Api/Api";
import { AppContext } from "../../ContextProvider/ContextProvider";

import CircularProgress from "@mui/material/CircularProgress";

export default function EditImageModal() {
    const navigate = useNavigate();
    const [loadingState, setLoadingState] = useState(false);

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
        setQueryString("");
        if (!currentUser || !imageId || imageId.length < 1) return;
        (async () => {
            setLoadingState(true);
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
            setLoadingState(false);
        })();
    }, [imageId, currentUser, currentUser?.id]);

    const handleImageUpdate = async (e) => {
        e.preventDefault();
        setLoadingState(true);

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
            document.getElementById("edit-image-modal-dismiss").click();
            navigate(`/image/${res.id}`);
        } else {
            console.log("Failed to update image");
        }
        setLoadingState(false);
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
                            <p className="m-0 mb-1 p-0">
                                Artist: <strong>{currentUser?.name}</strong>
                            </p>
                            <div className="input-group mb-2">
                                <span className="input-group-text">Name</span>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={imageObject.name}
                                    onChange={({ target }) =>
                                        setImageObject((prev) => ({ ...prev, name: target.value }))
                                    }
                                    placeholder="Name"
                                    autoFocus
                                />
                            </div>
                            <div className="input-group mb-2">
                                <span className="input-group-text">Description</span>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    value={imageObject.description}
                                    onChange={({ target }) =>
                                        setImageObject((prev) => ({ ...prev, description: target.value }))
                                    }
                                    rows="10"
                                    placeholder="Image description"
                                ></textarea>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button
                            id="edit-image-modal-dismiss"
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        {loadingState ? (
                            <CircularProgress />
                        ) : (
                            <button type="submit" form="edit-image-modal-form" className="btn btn-primary">
                                Update
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
