import { Link } from "react-router-dom";

export default function Register() {
    return (
        <div>
            <h2>Register</h2>
            <form>
                <input type="text" placeholder="name" />
                <br />
                <input type="text" placeholder="password" />
                <br />
                <input type="text" placeholder="confirm password" />
                <br />
                <input type="submit" value="Submit" />
            </form>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
}
