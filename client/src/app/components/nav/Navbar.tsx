import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    };

    return (
        <header className="navbar">
            <Link to="/app">Welcome!</Link>
            <Link to="/app/courses">Courses</Link>
            <Link to="/app/assignments">Assignments</Link>
            <Link to="/app/settings">Settings</Link>
        
            <button onClick={handleLoginClick}>Login</button>
        </header>
    );
} export default Navbar;