import "./ImageItem.css";

export default function ImageItem({data}) {
    const { id, name, url, author, description } = data;
    console.log(data)

    return (
        <div id={id} className="image-item">
            <div className="image-attr">
                <p>
                    {author}'s {name}
                </p>
                <p>{description}</p>
            </div>
            <img src={url} alt={"Image: " + {name}} />
        </div>
    );
}

ImageItem.protoTypes = {
    data: {}
}