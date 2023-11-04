import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/OmniStudy-logo.png";
import Container from "../UI/Container";

function Navbar() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <header className="navbar">
      <Container>
        <div className="navbar-logo">
          <img src={logo} alt="" />
        </div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/Pricing">Pricing</Link>
          <Link to="/About">About Us</Link>
          <button onClick={handleLoginClick}>Login</button>
        </nav>
      </Container>
    </header>
  );
}
export default Navbar;
