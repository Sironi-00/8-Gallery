import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../ContextProvider/ContextProvider";

import { userUpdate, userDelete } from "../../Api/Api";

export default function PreferenceModal() {
    const { currentUser, updateCurrentUser } = useContext(AppContext);

    const [editMode, setEditMode] = useState(false);

    const [userState, setUserState] = useState({
        id: currentUser?.id,
        name: currentUser?.name || "",
        email: currentUser?.email || "",
        password: "",
        confirmPassword: "",
    });

    const closePreferenceModal = () => {
        document.getElementById("preference-modal-dismiss").click();
    };

    const handleLogout = () => {
        updateCurrentUser(null);
        closePreferenceModal();
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();

        if (userState.password !== userState.confirmPassword) return;

        const data = await userUpdate(userState);
        if (data) {
            updateCurrentUser(data);
            setEditMode(false);
        } else {
            console.log("Failed to update user");
        }
    };
    const handleDeleteUser = async () => {
        const data = await userDelete(currentUser.id);
        if (data) {
            updateCurrentUser();
            setEditMode(false);
            closePreferenceModal();
        } else {
            console.log("Failed to Delete user");
        }
    };

    useEffect(() => {
        setUserState({
            id: currentUser?.id,
            name: currentUser?.name || "",
            email: currentUser?.email || "",
            password: "",
            confirmPassword: "",
        });
    }, [currentUser?.name, currentUser?.id, currentUser?.email]);

    return (
        <div id="preference-modal" className="modal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Preference Modal</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {currentUser?.name && editMode && (
                            <form className="my-2" onSubmit={handleUpdateUser}>
                                <div className="input-group mb-2">
                                    <span className="input-group-text">Name</span>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Name"
                                        value={userState.name}
                                        onChange={({ target }) =>
                                            setUserState((prev) => ({ ...prev, name: target.value }))
                                        }
                                    />
                                </div>
                                <div className="input-group mb-2">
                                    <span className="input-group-text">Email</span>
                                    <input
                                        className="form-control"
                                        type="email"
                                        placeholder="Email"
                                        value={userState.email}
                                        onChange={({ target }) =>
                                            setUserState((prev) => ({ ...prev, email: target.value }))
                                        }
                                    />
                                </div>

                                <div className="input-group mb-2">
                                    <span className="input-group-text">New Password</span>
                                    <input
                                        className="form-control"
                                        type="password"
                                        placeholder="Password"
                                        value={userState.password}
                                        onChange={({ target }) =>
                                            setUserState((prev) => ({ ...prev, password: target.value }))
                                        }
                                    />
                                </div>

                                {userState.password.length > 0 && (
                                    <>
                                        <div className="mb-2">
                                            <div className="input-group">
                                                <span className="input-group-text">Confirm Password</span>
                                                <input
                                                    className="form-control"
                                                    type="password"
                                                    placeholder="Confirm Password"
                                                    value={userState.confirmPassword}
                                                    onChange={({ target }) =>
                                                        setUserState((prev) => ({
                                                            ...prev,
                                                            confirmPassword: target.value,
                                                        }))
                                                    }
                                                />
                                            </div>
                                            {userState.confirmPassword.length > 0 &&
                                                userState.password !== userState.confirmPassword && (
                                                    <div className="form-text text-end text-danger">
                                                        Passwords don't match
                                                    </div>
                                                )}
                                        </div>
                                    </>
                                )}
                                <button
                                    className="btn btn-primary border"
                                    type="submit"
                                    disabled={
                                        userState.password.length > 0 &&
                                        userState.password !== userState.confirmPassword
                                    }
                                >
                                    Update
                                </button>
                            </form>
                        )}
                        {currentUser?.name && !editMode && (
                            <>
                                <p>
                                    Name: <strong>{currentUser?.name}</strong>
                                </p>
                                {currentUser?.email && (
                                    <>
                                        <p>
                                            Email: <strong>{currentUser?.email}</strong>
                                        </p>
                                    </>
                                )}
                            </>
                        )}

                        {currentUser?.name && (
                            <>
                                <button className="btn border " onClick={() => setEditMode((prev) => !prev)}>
                                    {editMode ? "Cancel Edit" : "Edit user"}
                                </button>
                                <button className="btn border" onClick={handleDeleteUser}>
                                    Delete Account
                                </button>
                                <button className="btn border" onClick={handleLogout}>
                                    Logout
                                </button>
                            </>
                        )}
                        {!currentUser?.name && (
                            <>
                                <Link to="/login" onClick={closePreferenceModal}>
                                    Login
                                </Link>
                                <br />
                                <Link to="/register" onClick={closePreferenceModal}>
                                    Register
                                </Link>
                            </>
                        )}
                        <br />
                        <a href="https://github.com/Sironi-00/8-Gallery" target="_blank">
                            source code
                        </a>
                    </div>
                    <div className="modal-footer">
                        <button
                            id="preference-modal-dismiss"
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
