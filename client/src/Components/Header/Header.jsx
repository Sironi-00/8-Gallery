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
        <header className="container">
            <div className="row">
                <div className="col">
                    <a href="/" className="logo">
                        <h1>
                            <AllInclusiveRoundedIcon id="logo-icon" /> Gallery
                        </h1>
                    </a>
                </div>
                <div className="col">
                    <SearchBar />
                </div>
                <div className="col d-flex">
                    {currentUser?.name && (
                        <>
                            <button
                                title="Upload Image"
                                onClick={() => document.querySelector("#upload-modal").showModal()}
                            >
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
                        <button
                            title="Preference"
                            onClick={() => document.querySelector("#preference-modal").showModal()}
                        >
                            <SettingsRoundedIcon />
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    );
}
