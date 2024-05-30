import { useContext, useEffect, useState } from "react";
import { AppContext, ImagesContext } from "../../ContextProvider/ContextProvider";
import { getImageUpvotes, upvoteImage, deleteImage } from "../../Api/Api";
import { useSearchParams } from "react-router-dom";

import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import CircularProgress from "@mui/material/CircularProgress";

export default function ImageAttributes({ data }) {
    const { id, url, artistId, likes } = data;
    const [loadingState, setLoadingState] = useState(false);
    const [votesCount, setVotesCount] = useState({ likes: likes, liked: false });

    const { setImagesArray } = useContext(ImagesContext);
    const { currentUser } = useContext(AppContext);

    const [, setQueryString] = useSearchParams();

    const handleUpvote = async () => {
        setLoadingState(true);
        const res = await upvoteImage({ id, userId: currentUser?.id });
        if (res) {
            setVotesCount(res);
        } else {
            console.log("Error: could not vote image");
        }
        setLoadingState(false);
    };

    const handleDelete = async () => {
        setLoadingState(true);
        const res = await deleteImage({ id, artistId: currentUser?.id });
        if (res) {
            setImagesArray((prev) => prev.filter((item) => item.id !== id));
        } else {
            console.log("Error: could not delete image");
        }
        setLoadingState(false);
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
                        {loadingState ? (
                            <CircularProgress />
                        ) : (
                            <button
                                className="btn border d-flex align-items-center position-relative"
                                onClick={handleUpvote}
                            >
                                <ThumbUpAltRoundedIcon className={`${votesCount.liked && "text-primary"}`} />
                                {votesCount.liked && <ThumbUpAltRoundedIcon className="position-absolute scale-1 " />}
                                &nbsp;
                                {votesCount.likes}
                            </button>
                        )}
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
            {currentUser?.id == artistId && (
                <>
                    <button
                        className="btn border"
                        title="Edit Image"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#edit-image-modal"
                        onClick={handleEditImage}
                    >
                        <EditIcon />
                    </button>
                    {loadingState ? (
                        <CircularProgress />
                    ) : (
                        <button title="Delete Image" className="btn border" onClick={handleDelete}>
                            <DeleteIcon />
                        </button>
                    )}
                </>
            )}
            <div className="d-flex align-items-center">
                <a href={url} download="" target="_blank" className="btn border">
                    <DownloadIcon />
                </a>
            </div>
        </div>
    );
}
