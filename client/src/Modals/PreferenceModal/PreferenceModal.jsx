import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../ContextProvider/ContextProvider";

export default function PreferenceModal() {
    const { currentUser, updateCurrentUser } = useContext(AppContext);

    const [editMode, setEditMode] = useState(false);

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleLogout = () => {
        updateCurrentUser(null);
    };

    return (
        <div id="preference-modal" className="modal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Preference Modal</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <button className="btn border border-white">Theme</button>
                        <br />

                        {currentUser?.name && (
                            <>
                                {editMode && (
                                    <>
                                        <form>
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                value={currentUser?.name || user.name}
                                                onChange={({ target }) =>
                                                    setUser((prev) => ({ ...prev, name: target.value }))
                                                }
                                            />
                                            <br />
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                value={currentUser?.email || user.email}
                                                onChange={({ target }) =>
                                                    setUser((prev) => ({ ...prev, email: target.value }))
                                                }
                                            />
                                            <br />
                                            <input
                                                type="password"
                                                placeholder="Password"
                                                value={user.password}
                                                onChange={({ target }) =>
                                                    setUser((prev) => ({ ...prev, password: target.value }))
                                                }
                                            />
                                            {user.password.length > 0 && (
                                                <>
                                                    <br />
                                                    <input
                                                        type="password"
                                                        placeholder="Confirm Password"
                                                        value={user.confirmPassword}
                                                        onChange={({ target }) =>
                                                            setUser((prev) => ({
                                                                ...prev,
                                                                confirmPassword: target.value,
                                                            }))
                                                        }
                                                    />
                                                </>
                                            )}
                                            <br />
                                            <input type="submit" value="Update" />
                                        </form>
                                    </>
                                )}
                                {!editMode && (
                                    <>
                                        <p>
                                            Name: <strong>{currentUser?.name || user.name}</strong>
                                        </p>
                                        <p>
                                            Email: <strong>{currentUser?.email || user.email}</strong>
                                        </p>
                                    </>
                                )}
                                <button className="btn border border-white" onClick={() => setEditMode((prev) => !prev)}>
                                    {editMode ? "Cancel Edit" : "Edit user"}
                                </button>
                                <br />
                            </>
                        )}
                        {currentUser?.name ? (
                            <button className="btn border border-white" onClick={handleLogout}>Logout</button>
                        ) : (
                            <>
                                <br />
                                <Link to="/login" onClick={handleLogout}>
                                    Login
                                </Link>
                            </>
                        )}
                        <br />
                        <a href="https://github.com/Sironi-00/8-Gallery" target="_blank">
                            source code
                        </a>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
