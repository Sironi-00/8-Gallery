import { Link, useSearchParams } from "react-router-dom";

import EmailIcon from "@mui/icons-material/Email";

export default function AuthorItem({ data }) {
    const { id, name, uploads } = data;

    const [, setQueryString] = useSearchParams();

    const handleEmail = () => {
        setQueryString(`aid=${id}`);
    };

    return (
        <div className="row border-bottom border-white border-opacity-25 mx-1 p-2">
            <div className="col text-center">
                <p className="m-0 p-0">
                    <strong>{name}</strong>
                </p>
            </div>
            <div className="col text-center">
                <p className="m-0 p-0">
                    <Link to={"/artist/" + name}>Images: {uploads}</Link>
                </p>
            </div>
            <div className="col text-center">
                <button
                    type="button"
                    className="m-0 px-2 py-0 btn border border-white"
                    data-bs-toggle="modal"
                    data-bs-target="#email-artist-modal"
                    onClick={handleEmail}
                    title="Email Artist"
                >
                    <EmailIcon />
                </button>
            </div>
        </div>
    );
}
