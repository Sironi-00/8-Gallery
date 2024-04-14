import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../ContextProvider/ContextProvider";

export default function PreferenceModal() {
    const { currentUser, setCurrentUser } = useContext(AppContext);

    const [editMode, setEditMode] = useState(false);

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const closeDialog = ({ target }) => {
        if (target.id === "preference-modal") {
            target.close();
        }
    };

    const handleLogout = () => {
        setCurrentUser(null);
        document.getElementById("preference-modal").close()
    }

    return (
        <dialog id="preference-modal" className="modal" onClick={closeDialog}>
            <div className="dialog-body">
                <h2>Preference Modal</h2>
                <button>Theme</button>
                <br />
                
                {currentUser?.name && (
                    <>
                        <button onClick={() => setEditMode((prev) => !prev)}>
                            {editMode ? "Cancel Edit" : "Edit user"}
                        </button>
                        {editMode && (
                            <>
                                <form>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={currentUser?.name || user.name}
                                        onChange={({ target }) => setUser((prev) => ({ ...prev, name: target.value }))}
                                    />
                                    <br />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={currentUser?.email || user.email}
                                        onChange={({ target }) => setUser((prev) => ({ ...prev, email: target.value }))}
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
                                                    setUser((prev) => ({ ...prev, confirmPassword: target.value }))
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
                                <p>Name: <strong>{currentUser?.name || user.name}</strong></p>
                                <p>Email: <strong>{currentUser?.email || user.email}</strong></p>
                            </>
                        )}
                    </>
                )}
                {currentUser?.name? <button onClick={handleLogout}>Logout</button>:
                        <>
                        <br />
                        <Link to="/login" onClick={handleLogout}>Login</Link>
                        </>
                }
                <br />
                <a href="https://github.com/Sironi-00/8-Gallery" target="_blank">source code</a>
                <form method="dialog">
                    <button>Close</button>
                </form>
            </div>
        </dialog>
    );
}
