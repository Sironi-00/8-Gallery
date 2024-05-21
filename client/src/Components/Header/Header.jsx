import SearchBar from "../SearchBar/SearchBar";

import { NavLink } from "react-router-dom";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import AllInclusiveRoundedIcon from "@mui/icons-material/AllInclusiveRounded";

import { useContext } from "react";
import { AppContext } from "../../ContextProvider/ContextProvider";

export default function Header() {
    const { currentUser } = useContext(AppContext);

    return (
        <header className="navbar navbar-expand-lg m-0 p-0">
            <div className="container-fluid">
                <a href="/" className="navbar-brand logo me-5">
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
                    <ul className="navbar-nav nav-underline">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link text-body">
                                {/* <HomeRoundedIcon /> */}
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/artist" className="nav-link text-body">
                                {/* <Person2RoundedIcon /> */}
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
                    <ul className="navbar-nav ms-auto">
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
