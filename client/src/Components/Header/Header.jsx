import "./Header.css";
import SearchBar from "../SearchBar/SearchBar";

import { NavLink } from "react-router-dom";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

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
                <button title="Upload Image" onClick={() => document.querySelector("#upload-modal").showModal()}>
                    <AddCircleOutlineRoundedIcon />
                </button>
                <nav>
                    <NavLink to="/">
                        <HomeRoundedIcon />
                    </NavLink>
                    <NavLink to="/authors">
                        <Person2RoundedIcon />
                    </NavLink>
                    <NavLink to="/login">
                        <LockRoundedIcon />
                    </NavLink>
                    <button title="Preference" onClick={() => document.querySelector("#preference-modal").showModal()}>
                        <SettingsRoundedIcon />
                    </button>
                </nav>
            </div>
        </header>
    );
}
