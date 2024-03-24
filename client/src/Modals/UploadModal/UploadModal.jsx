import { useState } from "react";
import { uploadImage } from "../../Api/Api";

export default function UploadModal() {
    const [imageObject, setImageObject] = useState({
        name: "Altra",
        description: "The saint of Altra",
        file: null
    })

    const closeDialog = ({target}) => {
        if (target.id === "upload-modal") {
            target.close();
        }
    };

    const handleImageUpload = async (e) => {
        e.preventDefault();
        console.log(imageObject);
        
        const author = "user-1";
        const upload = await uploadImage({...imageObject, author});
        if (upload) {
            console.log(upload)
            console.log("File success fully uploaded")
        } else {
            console.log("Failed to upload")
        }
    }

    return (
        <dialog id="upload-modal" className="modal" onClick={closeDialog} >
            <div className="dialog-body">
                <h2>Upload Image</h2>
                <form onSubmit={handleImageUpload}>
                    <input type="text" placeholder="Name" value={imageObject.name} onChange={({target}) => setImageObject(prev => ({...prev, name: target.value}))} />
                    <br />
                    <textarea name="description" cols="30" rows="10" placeholder="Image description" value={imageObject.description} onChange={({target}) => setImageObject(prev => ({...prev, description: target.value}))}></textarea>
                    <br />
                    <input id="image-file" type="file" name="image" accept="image/*" onChange={({target}) => setImageObject(prev => ({...prev, file: target.files[0]}))} />
                    {
                        // imageObject.file && <img className="img-sm" src={URL.createObjectURL(imageObject.file)} alt={"Image: " + imageObject.name} />
                    }
                    <br />
                    <input type="submit" value="Submit" />
                </form>
                <form method="dialog">
                    <button>Close</button>
                </form>
            </div>
        </dialog>
    );
}
