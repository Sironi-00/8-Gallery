export default function ViewOptions({ location }) {
    // document.title = location;
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h2>{location}</h2>
                </div>
                <div className="col">
                <a href="#">Filter</a>
                <a href="#">Pagination</a>
                <a href="#">Authors</a>
                </div>
            </div>
        </div>
    );
}
