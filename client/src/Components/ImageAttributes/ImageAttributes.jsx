import { useContext, useEffect, useState } from "react";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";

import { AppContext } from "../../ContextProvider/ContextProvider";
import { getImageUpvotes, upvoteImage, deleteImage } from "../../Api/Api";
import { useSearchParams } from "react-router-dom";

export default function ImageAttributes({ data }) {
    const { id, url, artistId, views, likes } = data;
    const { currentUser } = useContext(AppContext);
    const [, setQueryString] = useSearchParams();

    const [votesCount, setVotesCount] = useState({ likes: likes, liked: false });

    const handleUpvote = async () => {
        const res = await upvoteImage({ id, userId: currentUser?.id });
        if (res) {
            setVotesCount(res);
        } else {
            console.log("Error: could not vote image");
        }
    };

    const handleDelete = async () => {
        const res = await deleteImage({ id, artistId: currentUser?.id });
        if (res) {
            console.log(res);
        } else {
            console.log("Error: could not delete image");
        }
    };

    const handleEditImage = () => {
        setQueryString(`iid=${id}`);
    };

    useEffect(() => {
        if (!id || !currentUser?.id) return;

        (async () => {
            let res = await getImageUpvotes({ id, userId: currentUser?.id });
            if (res) {
                setVotesCount(res);
            } else {
                console.log("Failed to get votes");
            }
        })();
    }, [id, votesCount.id, currentUser?.id]);

    return (
        <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
                {currentUser?.id ? (
                    <>
                        <button
                            className="btn border d-flex align-items-center position-relative"
                            onClick={handleUpvote}
                        >
                            <ThumbUpAltRoundedIcon className={`${votesCount.liked && "text"}`} />
                            {votesCount.liked && (
                                <ThumbUpAltRoundedIcon className="position-absolute scale-1 text-primary" />
                            )}
                            &nbsp;
                            {votesCount.likes}
                        </button>
                    </>
                ) : (
                    <>
                        <div className="">
                            <ThumbUpAltRoundedIcon />
                            &nbsp;{votesCount.likes}
                        </div>
                    </>
                )}
            </div>
            <div className="d-flex align-items-center">
                <VisibilityRoundedIcon />
                &nbsp;{views}
            </div>
            <a href={url} download="" target="_blank" className="btn border">
                <DownloadIcon />
            </a>
            {currentUser?.id == artistId && (
                <>
                    <button
                        title="Edit Image"
                        type="button"
                        className="btn border"
                        data-bs-toggle="modal"
                        data-bs-target="#edit-image-modal"
                        onClick={handleEditImage}
                    >
                        <EditIcon />
                    </button>
                    <button title="Delete Image" className="btn border" onClick={handleDelete}>
                        <DeleteIcon />
                    </button>
                </>
            )}
        </div>
    );
}
