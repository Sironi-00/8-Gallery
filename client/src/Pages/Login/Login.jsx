import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../../Api/Api";
import { AppContext } from "../../ContextProvider/ContextProvider";

export default function Login() {
    const navigate = useNavigate();
    
    const { setCurrentUser } = useContext(AppContext);

    const [user, setUser] = useState({
        name: "[PH]artist_1",
        password: ""
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await userLogin(user);
        if (res) {
            setCurrentUser(res);
            navigate("/");
        }
         else {
            console.log("Login failed");
         }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="name" value={user.name} onChange={({target}) => setUser(prev => ({...prev, name: target.value}))}/>
                <br />
                <input type="text" placeholder="password" value={user.password} onChange={({target}) => setUser(prev => ({...prev, password: target.value}))}/>
                <br />
                <input type="submit" value="Submit" />
            </form>
            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
}
