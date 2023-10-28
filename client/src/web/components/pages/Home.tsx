import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
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
}
export default function Home() {
    return (
        <div className="homepage">
            <Navbar />
            <h1>Welcome to OmniStudy</h1>
            <p>Your one-stop platform for all your educational needs.</p>
        </div>
    );
}
