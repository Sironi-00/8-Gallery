export default function PreferenceModal() {
    const closeDialog = ({target}) => {
        if (target.id === "preference-modal") {
            target.close();
        }
    };
    return (
        <dialog id="preference-modal" className="modal" onClick={closeDialog}>
            <div className="dialog-body">
                <h2>Preference Modal</h2>
                <p>(#) visible when logged in</p>
                <form >
                    Edit Theme
                    <br />
                    Edit Name #
                    <br />
                    Edit Password #
                    <br />
                    Edit email #
                    <br />
                    Delete Acc #
                </form>
                <form method="dialog">
                    <button>Close</button>
                </form>
            </div>
        </dialog>
    );
}
