import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../../Api/Api";
import { AppContext } from "../../ContextProvider/ContextProvider";

export default function Register() {
    const navigate = useNavigate();

    const { updateCurrentUser } = useContext(AppContext);

    const [userState, setUserState] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleRegister = async (e) => {
        e.preventDefault();

        if (userState.password !== userState.confirmPassword) return

        const res = await userRegister(userState);
        if (res) {
            updateCurrentUser(res);
            navigate("/");
        } else {
            console.log("Register failed");
        }
    };

    return (
        <div className="m-2">
            <h2>Register</h2>
            <form className="w-50" onSubmit={handleRegister}>
                <div className="input-group mb-2">
                    <span className="input-group-text">Name</span>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Name"
                        value={userState.name}
                        onChange={({ target }) => setUserState((prev) => ({ ...prev, name: target.value }))}
                        minLength="3"
                        pattern="\S{3,20}"
                        required
                    />
                </div>
                <div className="input-group mb-2">
                    <span className="input-group-text">Email</span>
                    <input
                        className="form-control"
                        type="email"
                        placeholder="Email"
                        value={userState.email}
                        onChange={({ target }) => setUserState((prev) => ({ ...prev, email: target.value }))}
                        minLength="3"
                    />
                </div>
                <div className="input-group mb-2">
                    <span className="input-group-text">Password</span>
                    <input
                        className="form-control"
                        type="password"
                        placeholder="Password"
                        value={userState.password}
                        onChange={({ target }) => setUserState((prev) => ({ ...prev, password: target.value }))}
                        minLength="4"
                        required
                    />
                </div>

                {userState.password.length > 0 && (
                    <>
                        <div className="input-group mb-2">
                            <span className="input-group-text">Confirm Password:</span>
                            <input
                                className="form-control"
                                type="password"
                                placeholder="Confirm Password"
                                value={userState.confirmPassword}
                                onChange={({ target }) =>
                                    setUserState((prev) => ({ ...prev, confirmPassword: target.value }))
                                }
                                minLength="4"
                                required
                            />
                        </div>
                    </>
                )}
                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </form>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
}
