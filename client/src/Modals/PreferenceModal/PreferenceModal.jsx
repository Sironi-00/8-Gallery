import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext, ThemeContext } from "../../ContextProvider/ContextProvider";

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
        document.getElementById("preference-modal-dismiss").click();
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
                        
                        {currentUser?.name && editMode && (
                            <form className="my-2">
                                <div className="input-group">
                                    <span className="input-group-text">Name</span>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Name"
                                        value={currentUser?.name || user.name}
                                        onChange={({ target }) => setUser((prev) => ({ ...prev, name: target.value }))}
                                    />
                                </div>
                                <div className="input-group">
                                    <span className="input-group-text">Email</span>
                                    <input
                                        className="form-control"
                                        type="email"
                                        placeholder="Email"
                                        value={currentUser?.email || user.email}
                                        onChange={({ target }) => setUser((prev) => ({ ...prev, email: target.value }))}
                                    />
                                </div>
                                <div className="input-group">
                                    <span className="input-group-text">Password</span>
                                    <input
                                        className="form-control"
                                        type="password"
                                        placeholder="Password"
                                        value={user.password}
                                        onChange={({ target }) =>
                                            setUser((prev) => ({ ...prev, password: target.value }))
                                        }
                                    />
                                </div>
                                {user.password.length > 0 && (
                                    <>
                                        <div className="input-group">
                                            <span className="input-group-text">Password</span>
                                            <input
                                                className="form-control"
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
                                        </div>
                                    </>
                                )}

                                <button className="btn border" type="submit">
                                    Update
                                </button>
                            </form>
                        )}
                        {currentUser?.name && !editMode && (
                            <>
                                <p>
                                    Name: <strong>{currentUser?.name || user.name}</strong>
                                </p>
                                <p>
                                    Email: <strong>{currentUser?.email || user.email}</strong>
                                </p>
                            </>
                        )}

                        {currentUser?.name && (
                            <>
                                <button className="btn border" onClick={() => setEditMode((prev) => !prev)}>
                                    {editMode ? "Cancel Edit" : "Edit user"}
                                </button>
                                <button className="btn border" onClick={() => {}}>
                                    Delete Account
                                </button>
                                <button className="btn border" onClick={handleLogout}>
                                    Logout
                                </button>
                            </>
                        )}
                        {!currentUser?.name && (
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
