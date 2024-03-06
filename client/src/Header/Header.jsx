import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header>
        <div>
            <h1>Infinity Gallery</h1>
            <p>Art display</p>
        </div>
        <div>
          <Link to="/">Home</Link>
          <Link to="/authors">Authors</Link>
        </div>
    </header>
  )
}
