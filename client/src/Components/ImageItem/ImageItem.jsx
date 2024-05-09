import { useContext } from "react";
import { deleteImage, upvoteImage } from "../../Api/Api";
import { Link, useSearchParams } from "react-router-dom";
import { AppContext } from "../../ContextProvider/ContextProvider";

import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';

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

    const handleUpvote = async () => {
        const res = await upvoteImage({ id, userId: currentUser?.id });
        if (res) {
            upvoteItem(res)
        } else {
            console.log("Error: could not vote image");
        }
    };

    const handleEditImage = () => {
        setQueryString(`iid=${id}`);
        document.querySelector("#edit-image-modal").showModal();
    };

    return (
        <div id={id} className="container w-25 border border-info">
            <div className="row image-attr">
                <div className="image-text">
                    <h3>
                        <Link to={"/artist/" + artist}>{artist}</Link>'s -<Link to={`/image/${id}`}> {name}</Link>
                    </h3>
                    <p>{description}</p>
                    <p>
                        {upload_date &&
                            new Date(upload_date).toLocaleTimeString([], {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                    </p>
                    <button onClick={handleUpvote}>
                        <ThumbUpAltRoundedIcon /> {likes} {action}
                    </button>
                    <div className="">
                        <VisibilityRoundedIcon/> {views}
                    </div>
                    {currentUser?.id == artistId && (
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
            <div className="row">
                <div className="col">
                    <Link to={`/image/${id}`}>
                        <img src={url} alt={"Image: " + name} loading="lazy" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

ImageItem.protoTypes = {
    data: {},
};
