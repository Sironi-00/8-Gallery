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
                    <a href="/" className="logo text-decoration-none text-body">
                        <h1 className="fw-lighter">
                            <AllInclusiveRoundedIcon id="logo-icon" /> 
                            <span>
                                Gallery
                            </span>
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
                        <NavLink to="/" className="text-body">
                            <HomeRoundedIcon />
                        </NavLink>
                        <NavLink to="/artist" className="text-body">
                            <Person2RoundedIcon />
                        </NavLink>
                        {!currentUser?.name && (
                            <>
                                <NavLink to="/login" className="text-body">
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
