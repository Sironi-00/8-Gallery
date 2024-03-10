import "./Header.css";
import { NavLink } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import SearchBar from "../SearchBar/SearchBar";

export default function Header() {
    return (
        <header>
            <div>
              <a href="." className="logo">
                <h1>Infinity Gallery</h1>
              </a>
            </div>
            <SearchBar />
            <div className="actions">
                <button>
                    <AddCircleOutlineRoundedIcon />
                </button>
                <nav>
                    <NavLink to="/">
                        <HomeRoundedIcon />
                    </NavLink>
                    <NavLink to="/authors">
                        <Person2RoundedIcon />
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}
