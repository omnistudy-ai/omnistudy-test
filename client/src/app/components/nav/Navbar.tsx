import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    };

    return (
        <header className="navbar">
            <Link to="/">Welcome!</Link>
            <Link to="/Courses">Courses</Link>
            <Link to="/Assignments">Assignments</Link>
            <Link to="/Settings">Settings</Link>
        
            <button onClick={handleLoginClick}>Login</button>
        </header>
    );
} export default Navbar;