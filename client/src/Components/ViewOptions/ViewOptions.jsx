export default function ViewOptions({ location }) {
    // document.title = location;
    return;
    return (
        <div className="container-fluid">
            <div className="row align-items-center">
                <div className="col-8">
                    <h2>{location}</h2>
                </div>
                <div className="col d-flex justify-content-between">
                    <a href="#">Filter</a>
                    <a href="#">Pagination</a>
                    <a href="#">Authors</a>
                </div>
            </div>
        </div>
    );
}
