import "./ImageItem.css";

export default function ImageItem({data}) {
    const { id, name, url, author, description } = data;

    return (
        <div id={id} className="image-item">
            <p>
                {author}'s {name}
            </p>
            <p>{description}</p>
        </div>
    );
}

ImageItem.protoTypes = {
    data: {}
}