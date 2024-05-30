export default function ViewOptions({ location }) {
    // document.title = location;
    return;
    return (
        <div className="container-fluid bg-dark-subtle">
            <div className="row text-center">
                <div className="col">
                    <a href="#">Filter</a>
                </div>
                <div className="col">
                <div className="input-group">
                        <span className="input-group-text">Pagination</span>
                        <select className="form-select" aria-label="Default select example">
                            <option selected value="recent">Recent</option>
                            <option value="old">Oldest</option>
                            <option value="name">Name</option>
                        </select>
                    </div>
                </div>
                <div className="col">
                    <div className="input-group">
                        <span className="input-group-text">Sort</span>
                        <select className="form-select" aria-label="Default select example">
                            <option selected value="recent">Recent</option>
                            <option value="old">Oldest</option>
                            <option value="name">Name</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
