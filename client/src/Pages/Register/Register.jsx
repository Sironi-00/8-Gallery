import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../../Api/Api";
import { AppContext } from "../../ContextProvider/ContextProvider";

export default function Register() {
    const navigate = useNavigate();
    
    const { setCurrentUser } = useContext(AppContext);

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleRegister = async (e) => {
        e.preventDefault();
        const res = await userRegister(user);
        if (res) {
            setCurrentUser(res);
            navigate("/");
        }
         else {
            console.log("Register failed");
         }
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Name"
                    value={user.name}
                    onChange={({ target }) => setUser((prev) => ({ ...prev, name: target.value }))}
                />
                <br />
                <input
                    type="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={({ target }) => setUser((prev) => ({ ...prev, email: target.value }))}
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={({ target }) => setUser((prev) => ({ ...prev, password: target.value }))}
                />
                {user.password.length > 0 && (
                    <>
                        <br />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={user.confirmPassword}
                            onChange={({ target }) => setUser((prev) => ({ ...prev, confirmPassword: target.value }))}
                        />
                    </>
                )}
                <br />
                <input type="submit" value="Submit" />
            </form>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
}
