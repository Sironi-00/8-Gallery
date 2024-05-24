import { Link } from "react-router-dom";

import ImageAttributes from "../ImageAttributes/ImageAttributes";

export default function ImageItem({ data }) {
    const { id, name, url, artist, description } = data;

    return (
        <div id={id} className="d-flex w-card h-card position-relative overflow-hidden rounded shadow border">
            <div className="image-item">
                <Link to={`/image/${id}`} title="view">
                    <img className="" src={url} alt={"Image: " + name} loading="lazy" />
                </Link>
            </div>
            {/* <div className="position-absolute w-100 bottom-0 border border-ultra p-1 bg-opaque shy"> */}
            <div className="position-absolute w-100 bottom-0 border bg-body-tertiary bg-opacity-75 shy p-1">
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
