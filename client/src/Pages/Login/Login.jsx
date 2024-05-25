import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../../Api/Api";
import { AppContext } from "../../ContextProvider/ContextProvider";

export default function Login() {
    const navigate = useNavigate();

    const { updateCurrentUser } = useContext(AppContext);

    const [ userState, setUserState ] = useState({
        name: "",
        password: "",
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await userLogin(userState);
        if (res) {
            updateCurrentUser(res);
            navigate("/");
        } else {
            console.log("Login failed");
        }
        setUserState({
            name: "",
            password: "",
        });
    };

    return (
        <div className="m-2">
            <h2>Login</h2>
            <form className="w-50" onSubmit={handleLogin}>
                <div className="input-group mb-2">
                    <span className="input-group-text">Name</span>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="name"
                        value={userState.name}
                        onChange={({ target }) => setUserState((prev) => ({ ...prev, name: target.value }))}
                        minLength="3"
                        pattern="\S{3,30}"
                        required
                    />
                </div>
                <div className="input-group mb-2">
                    <span className="input-group-text">Password</span>
                    <input
                        className="form-control"
                        type="password"
                        placeholder="password"
                        value={userState.password}
                        onChange={({ target }) => setUserState((prev) => ({ ...prev, password: target.value }))}
                        minLength="4"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
}
