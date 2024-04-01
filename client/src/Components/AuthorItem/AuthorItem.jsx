import { Link } from "react-router-dom";

export default function AuthorItem({ data }) {
    const { id, name, likes, uploads, email } = data;
    return <div className="author-item">
        <p><strong><Link to={"/"+name}>{name}</Link></strong> Images: {uploads} <button onClick={() => document.querySelector("#email-artist-modal").showModal()}>Email</button></p>
    </div>;
}
