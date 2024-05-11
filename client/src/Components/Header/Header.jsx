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
        <header className="container-fluid">
            <div className="row">
                <div className="col">
                    <a href="/" className="logo">
                        <h1>
                            <AllInclusiveRoundedIcon id="logo-icon" /> Gallery
                        </h1>
                    </a>
                </div>
                <div className="col d-flex justify-content-center align-items-center">
                    <SearchBar />
                </div>
                <div className="col d-flex justify-content-end align-items-center">
                    {currentUser?.name && (
                        <>
                            <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#upload-modal">
                                <AddCircleOutlineRoundedIcon />
                            </button>

                        </>
                    )}
                    <nav>
                        <NavLink to="/">
                            <HomeRoundedIcon />
                        </NavLink>
                        <NavLink to="/artist">
                            <Person2RoundedIcon />
                        </NavLink>
                        {!currentUser?.name && (
                            <>
                                <NavLink to="/login">
                                    <LockRoundedIcon />
                                </NavLink>
                            </>
                        )}
                        <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#preference-modal">
                            <SettingsRoundedIcon />
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    );
}
