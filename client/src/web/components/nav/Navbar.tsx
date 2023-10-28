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
            <Link to="/Pricing">Pricing</Link>
            <Link to="/About">About Us</Link>
            <button onClick={handleLoginClick}>Login</button>
        </header>
    );
} export default Navbar;