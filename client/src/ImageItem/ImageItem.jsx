import "./ImageItem.css";

export default function ImageItem({data}) {
    const { id, name, url, author, description } = data;

    return (
        <div id={id} className="image-item">
            <div className="image-attr">
                <div className="image-text">
                    <h3>
                        {author}'s - {name}
                    </h3>
                    <p>{description}</p>
                    <a href={url} target="_blank">Url</a>
                </div>
            </div>
            <img src={url} alt={"Image: " + {name}} loading="lazy" />
        </div>
    );
}

ImageItem.protoTypes = {
    data: {}
}