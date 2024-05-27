import { Link } from "react-router-dom";

import ImageAttributes from "../ImageAttributes/ImageAttributes";

export default function ImageItem({ data }) {
    const { id, name, url, artist, description } = data;

    return (
        <div id={id} className="d-flex w-card h-card position-relative overflow-hidden rounded shadow">
            <Link className="image-item w-100" to={`/image/${id}`} title="view">
                <img className="bg-secondary" src={url} alt={"Image: " + name} loading="lazy" />
            </Link>
            <div className="position-absolute w-100 bottom-0 bg-body-tertiary bg-opacity-75 shy p-2 shadow">
                <h3 className="fs-4 fw-bold m-0 p-0">{name}</h3>
                <p className="m-0 p-0 fst-italic">
                    :{description} -{" "}
                    <Link to={"/artist/" + artist} className="fst-normal">
                        {artist}
                    </Link>
                </p>
                <ImageAttributes data={data} />
            </div>
        </div>
    );
}

ImageItem.protoTypes = {
    data: {},
};
