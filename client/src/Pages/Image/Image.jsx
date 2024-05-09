import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AppContext } from "../../ContextProvider/ContextProvider";
import { fetchImageById, deleteImage, incrementView, upvoteImage } from "../../Api/Api";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import ImageVotes from "../../Components/ImageVotes/ImageVotes";

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
    };

    useEffect(() => {
        (async () => {
            const res = await fetchImageById(id);
            if (res) {
                setImageObject(res);
            } else {
                console.log("Failed to display img obj");
            }

            incrementView(id);
        })();
    }, [id]);

    return (
        <div id={id} className="container-fluid h-100 d-flex ">
            <div className=" d-flex image-full">
                <img className="col" src={imageObject.url} alt={"Image: " + imageObject.name} loading="lazy" />
            </div>
            <div className="">
                <div className="col">
                    <h2 className="m-0 p-0">{imageObject.name}</h2>
                    <p className="m-0 p-0">{imageObject.description}</p>
                    <p className="m-0 p-0">
                        {imageObject.upload_date &&
                            new Date(imageObject.upload_date).toLocaleTimeString([], {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                    </p>
                    <Link to={"/artist/" + imageObject.artist}>@{imageObject.artist}</Link>
                </div>
                <div className="col">
                    <div className="d-flex justify-content-between">
                        <div className="">
                            <VisibilityRoundedIcon /> {imageObject.views}
                        </div>
                        <ImageVotes id={imageObject.id} />
                        {currentUser?.id == imageObject.artistId && (
                            <>
                                <button title="Edit Image" type="button" className="" data-bs-toggle="modal" data-bs-target="#edit-image-modal" onClick={handleEditImage}>
                                Edit
                            </button>
                                <button title="Delete Image" onClick={handleDelete}>
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
