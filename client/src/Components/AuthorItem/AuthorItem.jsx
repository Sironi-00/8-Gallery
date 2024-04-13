import { Link, useSearchParams } from "react-router-dom";

export default function AuthorItem({ data }) {
    const { id, name, likes, uploads, } = data;
    
    const [_, setQueryString] = useSearchParams();
    
    const handleEmail = () => {
        setQueryString(`aid=${id}`)
        const messageModal = document.querySelector("#email-artist-modal")
        messageModal.showModal()
    }

    return <div className="author-item">
        <p><strong><Link to={"/"+name}>{name}</Link></strong> Images: {uploads} <button onClick={handleEmail}>Email</button></p>
    </div>;
}
