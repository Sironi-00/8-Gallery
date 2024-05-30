import { useEffect, useState } from "react";
import { userEmail, userName } from "../../Api/Api";
import { useSearchParams } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";

export default function EmailArtistModal() {
    const [loadingState, setLoadingState] = useState(false);

    const [queryString, setQueryString] = useSearchParams();

    const [emailObject, setEmailObject] = useState({
        name: "",
        email: "",
        message: "",
        artist: "",
    });

    const handleSendEmail = async (e) => {
        e.preventDefault();
        if (emailObject.name.length < 1 && emailObject.email.length < 1 && emailObject.message.length < 1) {
            return;
        }
        setLoadingState(true);

        const res = await userEmail(emailObject);
        if (res) {
            console.log("Email Sent");

            setEmailObject({
                name: "",
                email: "",
                message: "",
                artistId: "",
            });
            document.getElementById("email-artist-modal-dismiss").click();
        } else {
            console.log("Failed: to send email");
        }
        setLoadingState(false);
    };

    const artistId = queryString.get("aid");
    useEffect(() => {
        setQueryString("");
        if (!artistId || artistId.length < 1) return;

        (async () => {
            setLoadingState(true);
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
            setLoadingState(false);
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
                        <form id="email-artist-modal-form" onSubmit={handleSendEmail}>
                            <p className="m-0 mb-1 p-0">
                                Sending to <strong>{emailObject.artist}</strong>
                            </p>
                            <div className="input-group mb-2">
                                <span className="input-group-text">Name</span>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Sender's Name"
                                    value={emailObject.name}
                                    onChange={({ target }) =>
                                        setEmailObject((prev) => ({ ...prev, name: target.value }))
                                    }
                                    required
                                />
                            </div>
                            <div className="input-group mb-2">
                                <span className="input-group-text">Email</span>
                                <input
                                    className="form-control"
                                    type="email"
                                    placeholder="Sender's email"
                                    value={emailObject.email}
                                    onChange={({ target }) =>
                                        setEmailObject((prev) => ({ ...prev, email: target.value }))
                                    }
                                    required
                                />
                            </div>
                            <div className="input-group mb-2">
                                <span className="input-group-text">Message</span>
                                <textarea
                                    className="form-control"
                                    cols="30"
                                    rows="10"
                                    placeholder="Message"
                                    value={emailObject.message}
                                    onChange={({ target }) =>
                                        setEmailObject((prev) => ({ ...prev, message: target.value }))
                                    }
                                    required
                                ></textarea>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button
                            id="email-artist-modal-dismiss"
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        {loadingState ? (
                            <CircularProgress />
                        ) : (
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
