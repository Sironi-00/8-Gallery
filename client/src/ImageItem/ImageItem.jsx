import "./ImageItem.css";

export default function ImageItem({data}) {
    const { id, name, url, author, description } = data;
    console.log(data)

    return (
        <div id={id} className="image-item">
            <div className="image-attr">
                <div className="image-text">
                    <p>
                        {author}'s - {name}
                    </p>
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