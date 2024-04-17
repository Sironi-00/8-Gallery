import { useContext } from "react";
import { deleteImage } from "../../Api/Api";
import "./ImageItem.css";
import { Link, useSearchParams } from "react-router-dom";
import { AppContext } from "../../ContextProvider/ContextProvider";


export default function ImageItem({ data, deleteItem }) {
    const [, setQueryString] = useSearchParams();
    const { currentUser } = useContext(AppContext);

    const { id, name, url, artist, artistId, description } = data;

    const handleDelete = async () => {
        const res = await deleteImage({id, artistId: currentUser?.id});
        if (res) {
            deleteItem(id)
        } else {
            console.log("Error: could not delete image")
        }
    }

    const handleEditImage = () => {
        setQueryString(`iid=${id}`)
        document.querySelector("#edit-image-modal").showModal();
    }

    return (
        <div id={id} className="image-item">
            <div className="image-attr">
                <div className="image-text">
                    <h3>
                        <Link to={"/artist/"+ artist}>{artist}</Link>'s - {name}
                    </h3>
                    <p>{description}</p>
                    <a href={url} target="_blank">
                        Url
                    </a>
                    {currentUser?.id == artistId &&(<>
                        <button title="Edit Image" onClick={handleEditImage}>
                            Edit
                        </button>
                        <button title="Delete Image" onClick={handleDelete}>
                            Delete
                        </button>
                    </>) 
                    }
                </div>
            </div>
            <img src={url} alt={"Image: " +  name } loading="lazy" />
        </div>
    );
}

ImageItem.protoTypes = {
    data: {},
};
