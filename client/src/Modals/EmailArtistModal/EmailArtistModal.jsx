import { useEffect, useState } from "react";
import { userEmail, userName } from "../../Api/Api";
import { useSearchParams } from "react-router-dom";

export default function EmailArtistModal() {
    const [queryString, setQueryString] = useSearchParams();

    const [emailObject, setEmailObject] = useState({
        name: "",
        email: "",
        message: "",
        artist: "",
    });

    const closeDialog = ({target}) => {
        if (target.id === "email-artist-modal") {
            target.close();
        }
    };

    const handleEmailArtist = async (e) => {
        e.preventDefault();

        const res = await userEmail(emailObject);
        if (res) {
            setEmailObject({
                name: "",
                email: "",
                message: "",
                artistId: ""
            });
            setQueryString("")
            document.getElementById("email-artist-modal").close()
            console.log("Email Sent")
        } else {
            console.log("Failed: to send email");
        }
    }

    const artistId = queryString.get("aid");
    useEffect(() => {
        const loadModal = async () => {
            const res = await userName(artistId);
            if (res) {
                setEmailObject({
                    name: "",
                    email: "",
                    message: "",
                    artist: res.name
                });
            } else {
                console.log("Failed to get username")
            }

        }
        if (artistId && artistId.length > 0) {
            loadModal();
        }
    }, [artistId]);

    return (
        <dialog id="email-artist-modal" className="modal" onClick={closeDialog}>
            <div className="dialog-body">
                <h2>Email Artist Modal</h2>
                <p>To ensure our user's privacy we will send an email on your behalf</p>
                <form onSubmit={handleEmailArtist}>
                    <p>Sending to <strong>{emailObject.artist}</strong></p>
                    <input type="text" placeholder="Your Name(s)" value={emailObject.name} onChange={({target}) => setEmailObject(prev => ({...prev, name: target.value}))} />
                    <br />
                    <input type="email" placeholder="email" value={emailObject.email} onChange={({target}) => setEmailObject(prev => ({...prev, email: target.value}))}/>
                    <br />
                    <textarea cols="30" rows="10" placeholder="Message" value={emailObject.message} onChange={({target}) => setEmailObject(prev => ({...prev, message: target.value}))}></textarea>
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
