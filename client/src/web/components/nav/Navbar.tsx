import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/OmniStudy-logo.png";
import Container from "../UI/Container";
import EncryptButton from "../UI/EncryptedButton";
import { motion } from "framer-motion";

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
          <ul>
            <li>
              <Link to="/" aria-label="Home">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" aria-label="About Us">
                About Us
              </Link>
            </li>
            {/* <Link to="/Pricing">Pricing</Link> */}
            <li>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLoginClick}
              >
                Login
              </motion.button>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
export default Navbar;
