import { Link } from "react-router-dom";

import ImageAttributes from "../ImageAttributes/ImageAttributes";

export default function ImageItem({ data }) {
    const { id, name, url, artist, description } = data;

    return (
        <div id={id} className="d-flex w-card h-card m-1 position-relative">
            <div className="image-item">
                <Link to={`/image/${id}`} title="view">
                    <img className="border border-ultra" src={url} alt={"Image: " + name} loading="lazy" />
                </Link>
            </div>
            <div className="position-absolute w-100 bottom-0 border border-ultra py-1 px-2 bg-opaque shy">
                <h3 className="fs-4 fw-bold m-0 p-0">{name}</h3>
                <p className="m-0 p-0 fst-italic">
                    :{description} - <Link to={"/artist/" + artist} className="fst-normal">{artist}</Link>
                </p>
                <ImageAttributes data={data} />
            </div>
        </div>
    );
}

ImageItem.protoTypes = {
    data: {},
};
