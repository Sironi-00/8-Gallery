import "./ViewOptions.css";

export default function ViewOptions({location}) {
    // document.title = location;
    return (
    <div className="view-options">
        <div className="location">
            <h2>{location}</h2>
        </div>
        <div className="controls">
            <a href="#">Filter</a>
            <a href="#">Pagination</a>
            <a href="#">Authors</a>
        </div>
    </div>
  )
}
