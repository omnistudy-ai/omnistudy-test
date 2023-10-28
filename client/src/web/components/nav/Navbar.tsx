import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    };

    return (
        <header className="navbar">
            <Link to="/">Home</Link>
            <Link to="/courses">Courses</Link>
            <Link to="/assignments">Assignments</Link>
            <Link to="/settings">Settings</Link>
            <Link to="/about">About</Link>
            <button onClick={handleLoginClick}>Login</button>
        </header>
    );
} export default Navbar;