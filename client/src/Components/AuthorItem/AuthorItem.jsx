import { Link, useSearchParams } from "react-router-dom";

import EmailIcon from "@mui/icons-material/Email";

export default function AuthorItem({ data }) {
    const { id, name, likes, uploads } = data;

    const [, setQueryString] = useSearchParams();

    const handleEmail = () => {
        setQueryString(`aid=${id}`);
    };

    return (
        <div className="author-item">
            <p>
                <strong>
                    <Link to={"/artist/" + name}>{name}</Link>
                </strong>{" "}
                Images: {uploads}
                <button
                    type="button"
                    className="btn border border-white"
                    data-bs-toggle="modal"
                    data-bs-target="#email-artist-modal"
                    onClick={handleEmail}
                >
                    <EmailIcon />
                </button>
            </p>
        </div>
    );
}
