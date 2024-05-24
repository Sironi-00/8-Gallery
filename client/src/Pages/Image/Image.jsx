import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchImageById, incrementView } from "../../Api/Api";

import ImageAttributes from "../../Components/ImageAttributes/ImageAttributes";

export default function Image() {
    const { id } = useParams();

    const [imageObject, setImageObject] = useState({});

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
        <div className="container-fluid h-100 overflow-hidden">
            <div className="row h-100 overflow-hidden">
                <div className="col h-100 overflow-hidden">
                    <div className="h-100 image-full d-flex justify-content-center overflow-hidden">
                        <img className="" src={imageObject.url} alt={"Image: " + imageObject.name} loading="lazy" />
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 py-5 mt-auto">
                    <div className="border rounded p-1">
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
                        <ImageAttributes data={imageObject} />
                    </div>
                </div>
            </div>
        </div>
    );
}
