import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import AllInclusiveRoundedIcon from "@mui/icons-material/AllInclusiveRounded";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import SearchBar from "../SearchBar/SearchBar";
import { AppContext, ThemeContext } from "../../ContextProvider/ContextProvider";

export default function Header() {
    const navigate = useNavigate();
    const { currentUser } = useContext(AppContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    document.body.setAttribute("data-bs-theme", theme);

    return (
        <header className="navbar navbar-expand-lg m-0 p-0 shadow border-bottom border-black border-opacity-25">
            <div className="container-fluid">
                <a href="/" className="navbar-brand logo me-5 m-0 p-0">
                    <h1 className="">
                        <AllInclusiveRoundedIcon id="logo-icon" />
                        <span className="fs-3"> Gallery</span>
                    </h1>
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbar-contents"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div id="navbar-contents" className="collapse navbar-collapse">
                    <ul className="navbar-nav nav-underline flex-row justify-content-between m-2 mt-0">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link text-body">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/artist" className="nav-link text-body">
                                Artists
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/more" className="nav-link text-body">
                                More
                            </NavLink>
                        </li>
                    </ul>
                    <form className="d-flex m-auto" role="search">
                        <SearchBar />
                    </form>
                    <ul className="navbar-nav ms-auto flex-row justify-content-between m-2">
                        <li className="nav-item">
                            {currentUser?.name ? (
                                <>
                                    <button
                                        type="button"
                                        className="btn"
                                        data-bs-toggle="modal"
                                        data-bs-target="#upload-modal"
                                        title="upload image"
                                    >
                                        <AddCircleOutlineRoundedIcon />
                                    </button>
                                </>
                            ) : (
                                <NavLink to="/login" className="nav-link text-body fw-bold text-underline">
                                    Login
                                </NavLink>
                            )}
                        </li>
                        <li className="nav-item">
                            <button className="btn" onClick={toggleTheme}>
                                {theme == "dark" ? <LightModeIcon /> : <DarkModeIcon />}
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                type="button"
                                className="btn"
                                data-bs-toggle="modal"
                                data-bs-target="#preference-modal"
                            >
                                <SettingsRoundedIcon />
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}
