import { deleteImage } from "../../Api/Api";
import "./ImageItem.css";
import { Link } from "react-router-dom";


export default function ImageItem({ data }) {
    const { id, name, url, artist, description } = data;

    return (
        <div id={id} className="image-item">
            <div className="image-attr">
                <div className="image-text">
                    <h3>
                        <Link to={"/"+ artist}>{artist}</Link>'s - {name}
                    </h3>
                    <p>{description}</p>
                    <a href={url} target="_blank">
                        Url
                    </a>
                    <button title="Edit Image" onClick={() => document.querySelector("#edit-image-modal").showModal()}>
                        Edit
                    </button>
                    <button title="Delete Image" onClick={() => deleteImage(id)}>
                        Delete
                    </button>
                </div>
            </div>
            <img src={url} alt={"Image: " + { name }} loading="lazy" />
        </div>
    );
}

ImageItem.protoTypes = {
    data: {},
};
