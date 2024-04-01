export default function EmailArtistModal() {
    const closeDialog = ({target}) => {
        if (target.id === "email-artist-modal") {
            target.close();
        }
    };
    return (
        <dialog id="email-artist-modal" className="modal" onClick={closeDialog}>
            <div className="dialog-body">
                <h2>Email Artist Modal</h2>
                <p>To ensure our user's privacy we will send an email on your behalf</p>
                <form >
                    <input type="text" placeholder="Your Name(s)" />
                    <br />
                    <input type="email" placeholder="email"/>
                    <br />
                    <textarea cols="30" rows="10" placeholder="Message"></textarea>
                    <br />
                    <input type="submit" value="Send" />
                </form>
                <form method="dialog">
                    <button>Close</button>
                </form>
            </div>
        </dialog>
    );
}
