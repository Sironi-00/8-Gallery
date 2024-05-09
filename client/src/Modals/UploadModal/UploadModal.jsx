import { useContext, useState } from "react";
import { uploadImage } from "../../Api/Api";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../../ContextProvider/ContextProvider";

export default function UploadModal() {
    const navigate = useNavigate();

    const { currentUser } = useContext(AppContext);

    const [imageObject, setImageObject] = useState({
        name: "",
        description: "",
        file: null,
    });

    const handleImageUpload = async (e) => {
        e.preventDefault();

        if (!currentUser || !currentUser.name) {
            return;
        }
        const res = await uploadImage({ ...imageObject, artistId: currentUser.id });

        if (res) {
            navigate(`/image/${res.id}`);
            setImageObject({
                name: "",
                description: "",
            });
        } else {
            console.log("Failed to upload");
        }
    };

    return (
        <div id="upload-modal" className="modal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Upload Image</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {currentUser?.name && (
                            <p>
                                Artist: <strong>{currentUser.name}</strong>
                            </p>
                        )}
                        <form id="upload-modal-form" onSubmit={handleImageUpload}>
                            <input
                                type="text"
                                placeholder="Name"
                                value={imageObject.name}
                                onChange={({ target }) => setImageObject((prev) => ({ ...prev, name: target.value }))}
                                minLength="3"
                                autoFocus
                            />
                            <br />
                            <textarea
                                name="description"
                                cols="30"
                                rows="10"
                                placeholder="Image description"
                                value={imageObject.description}
                                onChange={({ target }) =>
                                    setImageObject((prev) => ({ ...prev, description: target.value }))
                                }
                                minLength="3"
                            ></textarea>
                            <br />
                            <input
                                id="file-uploader"
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={({ target }) =>
                                    setImageObject((prev) => ({ ...prev, file: target.files[0] }))
                                }
                                required
                            />
                            {imageObject.file && (
                                <img
                                    className="img-sm"
                                    src={URL.createObjectURL(imageObject.file)}
                                    alt={"Image: " + imageObject.name}
                                />
                            )}
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                        {/* imageObject.name.length > 0 && "disabled" */}
                        <button type="submit" form="upload-modal-form" className={"btn btn-primary"}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
