import { useContext } from "react";
import { deleteImage, } from "../../Api/Api";
import { Link, useSearchParams } from "react-router-dom";
import { AppContext } from "../../ContextProvider/ContextProvider";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import ImageVotes from "../ImageVotes/ImageVotes";

export default function ImageItem({ data, deleteItem, upvoteItem }) {
    const [, setQueryString] = useSearchParams();
    const { currentUser } = useContext(AppContext);

    const { id, name, url, artist, artistId, description, upload_date, likes, action, views } = data;

    const handleDelete = async () => {
        const res = await deleteImage({ id, artistId: currentUser?.id });
        if (res) {
            deleteItem(id);
        } else {
            console.log("Error: could not delete image");
        }
    };

    const handleEditImage = () => {
        setQueryString(`iid=${id}`);
    };

    return (
        <div id={id} className="d-flex w-card h-card m-1 position-relative border border-ultra">
            <div className="image-item">
                <Link to={`/image/${id}`}>
                    <img className="" src={url} alt={"Image: " + name} loading="lazy" />
                </Link>
            </div>
            <div className="position-absolute w-100 bottom-0 py-1 px-2 bg-opaque">
                <div className="">
                    <h3 className="m-0 p-0">
                        <Link to={"/artist/" + artist}>{artist}</Link>'s -<Link to={`/image/${id}`}> {name}</Link>
                    </h3>
                    <p className="m-0 p-0">{description}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <ImageVotes id={id} />
                    <div className="">
                        <VisibilityRoundedIcon /> {views}
                    </div>
                    {currentUser?.id == artistId && (
                        <>
                            <button
                                title="Edit Image"
                                type="button"
                                className=""
                                data-bs-toggle="modal"
                                data-bs-target="#edit-image-modal"
                                onClick={handleEditImage}
                            >
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
    );
}

ImageItem.protoTypes = {
    data: {},
};
