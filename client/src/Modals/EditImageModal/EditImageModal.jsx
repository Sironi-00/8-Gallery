export default function EditImageModal() {
    const closeDialog = ({target}) => {
        if (target.id === "edit-image-modal") {
            target.close();
        }
    };
    return (
        <dialog id="edit-image-modal" className="modal" onClick={closeDialog}>
            <div className="dialog-body">
                <h2>Edit Image Modal</h2>
                <form >
                    <input type="text" placeholder="Name" />
                    <br />
                    <textarea name="description" cols="30" rows="10" placeholder="Image description"></textarea>
                    <br />
                    <input type="file" name="image" />
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
