import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchImagesById, updateImage } from "../../Api/Api";
import { AppContext } from "../../ContextProvider/ContextProvider";

export default function EditImageModal() {
    const { currentUser } = useContext(AppContext)
    const [imageObject, setImageObject] = useState({
        name: "",
        description: "",
        artist: "",
        id: "",
        artistId: ""
    });
    const [queryString, setQueryString] = useSearchParams();

    const imageId = queryString.get("iid");
    useEffect(() => {
        if (!currentUser || !imageId || imageId.length < 1) return
        (async () => {
            const res = await fetchImagesById(imageId);
            if (res) {
                setImageObject({
                    id: imageId,
                    name: res.name,
                    description: res.description,
                    artist: res.artist,
                    artistId: res.artistId
                })
            } else {
                console.log("Failed to get image")
            }
        })()
    }, [imageId]);

    const closeDialog = ({target}) => {
        if (target.id === "edit-image-modal") {
            target.close();
        }
    };

    const handleImageUpdate = async (e) => {
        e.preventDefault();

        if (currentUser?.id !== imageObject.artistId) return;
        
        const res = await updateImage(imageObject);
        if (res) {
            console.log(res)
            console.log("Image Updated")
            
            setQueryString("")
            document.getElementById("edit-image-modal").close()
        } else {
            console.log("Failed to update image")
        }
    }

    return (
        <dialog id="edit-image-modal" className="modal" onClick={closeDialog}>
            <div className="dialog-body">
                <h2>Edit Image Modal</h2>
                <form onSubmit={handleImageUpdate}>
                    {/* <p>Artist: {imageObject.artist}</p> */}
                    <input type="text" value={imageObject.name} onChange={({target}) => setImageObject(prev => ({...prev, name: target.value }))} placeholder="Name" />
                    <br />
                    <textarea name="description" value={imageObject.description} onChange={({target}) => setImageObject(prev => ({...prev, description: target.value }))} cols="30" rows="10" placeholder="Image description"></textarea>
                    <br />
                    {/* <input type="file" name="image" />
                    <br /> */}
                    <input type="submit" value="Update" />
                </form>
                <form method="dialog">
                    <button>Close</button>
                </form>
            </div>
        </dialog>
    );
}
