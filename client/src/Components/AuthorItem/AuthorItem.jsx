import { Link, useSearchParams } from "react-router-dom";

export default function AuthorItem({ data }) {
    const { id, name, likes, uploads, } = data;
    
    const [_, setQueryString] = useSearchParams();
    
    const handleEmail = () => {
        setQueryString(`aid=${id}`)
        const asd = document.querySelector("#email-artist-modal")
        asd.showModal()
        console.log(asd)
    }

    return <div className="author-item">
        <p><strong><Link to={"/"+name}>{name}</Link></strong> Images: {uploads} <button onClick={handleEmail}>Email</button></p>
    </div>;
}
