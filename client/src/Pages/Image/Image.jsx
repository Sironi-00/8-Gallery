import "./Image.css";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AppContext } from "../../ContextProvider/ContextProvider";
import { fetchImageById, deleteImage } from "../../Api/Api";

export default function Image() {
    const navigate = useNavigate();
    const [, setQueryString] = useSearchParams();
    const { id } = useParams();
    const { currentUser } = useContext(AppContext);

    const [imageObject, setImageObject] = useState({});

    const handleDelete = async () => {
        const res = await deleteImage({ id, artistId: currentUser?.id });
        if (res) {
            navigate("/");
        } else {
            console.log("Error: could not delete image");
        }
    };

    const handleEditImage = () => {
        setQueryString(`iid=${id}`);
        document.querySelector("#edit-image-modal").showModal();
    };

    useEffect(() => {
        (async () => {
            const res = await fetchImageById(id);
            if (res) {
                setImageObject(res);
            } else {
                console.log("Failed to display img obj");
            }
        })();
    }, [id]);

    return (
        <div id={id} className="image-main">
            <div className="image-attr">
                <h2>{imageObject.name}</h2>
                <div className="image-text">
                    <p>{imageObject.description}</p>
                    <Link to={"/artist/" + imageObject.artist}>@{imageObject.artist}</Link>
                    {currentUser?.id == imageObject.artistId && (
                        <>
                            <button title="Edit Image" onClick={handleEditImage}>
                                Edit
                            </button>
                            <button title="Delete Image" onClick={handleDelete}>
                                Delete
                            </button>
                        </>
                    )}
                </div>
            </div>
            <img src={imageObject.url} alt={"Image: " + imageObject.name} loading="lazy" />
        </div>
    );
}
