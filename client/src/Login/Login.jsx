import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div>
            <h2>Login</h2>
            <form>
                <input type="text" placeholder="name" />
                <br />
                <input type="text" placeholder="password" />
                <br />
                <input type="submit" value="Submit" />
            </form>
            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
}
