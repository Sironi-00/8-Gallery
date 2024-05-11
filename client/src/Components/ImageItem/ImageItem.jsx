import { Link, } from "react-router-dom";

import ImageAttributes from "../ImageAttributes/ImageAttributes";

export default function ImageItem({ data, }) {
    const { id, name, url, artist, description, } = data;

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
                <ImageAttributes data={data} />
            </div>
        </div>
    );
}

ImageItem.protoTypes = {
    data: {},
};
