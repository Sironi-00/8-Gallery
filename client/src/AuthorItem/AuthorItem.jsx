import { Link } from "react-router-dom";

export default function AuthorItem({ data }) {
    const { id, name, likes, uploads } = data;
    return <div className="author-item">
        <p>{name} likes:{likes} uploads:{uploads}</p>
        <Link to={"/"+name}>{name}</Link>
    </div>;
}
