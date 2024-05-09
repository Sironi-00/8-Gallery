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

    const handleSendEmail = async (e) => {
        e.preventDefault();

        const res = await userEmail(emailObject);
        if (res) {
            console.log("Email Sent");

            setEmailObject({
                name: "",
                email: "",
                message: "",
                artistId: "",
            });
            setQueryString("");
            document.getElementById("email-artist-modal").close();
        } else {
            console.log("Failed: to send email");
        }
    };

    const artistId = queryString.get("aid");
    useEffect(() => {
        if (!artistId || artistId.length < 1) return;
        (async () => {
            const res = await userName(artistId);
            if (res) {
                setEmailObject({
                    name: "",
                    email: "",
                    message: "",
                    artist: res.name,
                });
            } else {
                console.log("Failed to get username");
            }
        })();
    }, [artistId]);

    return (
        <div id="email-artist-modal" className="modal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Email Artist Modal</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>To ensure our user's privacy we will send an email on your behalf</p>
                        <form id="email-artist-modal-form" onSubmit={handleSendEmail}>
                            <p>
                                Sending to <strong>{emailObject.artist}</strong>
                            </p>
                            <input
                                type="text"
                                placeholder="Your Name(s)"
                                value={emailObject.name}
                                onChange={({ target }) => setEmailObject((prev) => ({ ...prev, name: target.value }))}
                            />
                            <br />
                            <input
                                type="email"
                                placeholder="email"
                                value={emailObject.email}
                                onChange={({ target }) => setEmailObject((prev) => ({ ...prev, email: target.value }))}
                            />
                            <br />
                            <textarea
                                cols="30"
                                rows="10"
                                placeholder="Message"
                                value={emailObject.message}
                                onChange={({ target }) =>
                                    setEmailObject((prev) => ({ ...prev, message: target.value }))
                                }
                            ></textarea>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                        <button type="submit" form="email-artist-modal-form" className={"btn btn-primary"}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
