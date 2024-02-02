import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/OmniStudy-logo.png";
import Container from "../UI/Container";
import { motion } from "framer-motion";
import Hamburger from "./Hamburger/Hamburger";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [navbarColor, setNavbarColor] = useState(false);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const navbarColorHandler = () => {
    if (window.scrollY > 110) {
      setNavbarColor(true);
    } else {
      setNavbarColor(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", navbarColorHandler);

    return () => {
      window.removeEventListener("scroll", navbarColorHandler);
    };
  }, []);

  return (
    <header className={navbarColor ? "navbar active" : "navbar"}>
      <Container>
        <div className="navbar-logo">
          <img src={logo} alt="Omnistudy" loading="lazy" />
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
          <Hamburger />
        </nav>
      </Container>
    </header>
  );
}
export default Navbar;
