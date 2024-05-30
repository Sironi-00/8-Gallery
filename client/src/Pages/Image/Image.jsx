import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchImageById } from "../../Api/Api";
import ImageAttributes from "../../Components/ImageAttributes/ImageAttributes";

import CircularProgress from "@mui/material/CircularProgress";

export default function Image() {
    const { id } = useParams();

    const [imageObject, setImageObject] = useState({});
    const [loadingState, setLoadingState] = useState(false);

    useEffect(() => {
        (async () => {
            setLoadingState(true);
            const data = await fetchImageById(id);
            if (data) {
                setImageObject(data);
            } else {
                console.log("Failed to display img obj");
            }
            setLoadingState(false);
        })();
    }, [id]);

    return (
        <div className="container-fluid h-100 w-100 overflow-hidden m-0 p-">
            {loadingState ? (
                <div className="row">
                    <div className="col text-center p-4">
                        <CircularProgress />
                    </div>
                </div>
            ) : (
                <div className="row h-100 w-100 overflow-auto m-0 p-0">
                    <div className="col image-full d-flex justify-content-center overflow-hidden mx-1 p-0">
                        <img className="" src={imageObject.url} alt={"Image: " + imageObject.name} loading="lazy" />
                    </div>
                    <div className="col-lg-3 col-md-4 m-0 p-0 px-1 pb-md-3 mb-md-5 mt-md-auto">
                        <div className="border rounded p-2 m-0">
                            <h2 className="m-0 p-0">{imageObject.name}</h2>
                            {imageObject.description && <p className="m-0 p-0">{imageObject.description}</p>}
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
                            <ImageAttributes data={imageObject} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
