import { Link } from "react-router-dom";
import Container from "../UI/Container";
import "./Footer.css";
import logo from "../../assets/OmniStudy-logo.png";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <div className="footer-top">
          <div className="footer-grid">
            <div className="footer-logo">
              <img src={logo} alt="Omnistudy logo" />
            </div>
            <div className="footer-grid-item">
              <h3>Useful Links</h3>
              <div className="footer-links">
                <Link to="/">Home</Link>
                {/* <Link to="/Pricing">Pricing</Link> */}
                <Link to="/About">About</Link>
                <Link to="/login">Login</Link>
              </div>
            </div>
            <div className="footer-grid-item">
              <h3>Support</h3>
              <div className="footer-links">
                <Link to="/Contact">Contact</Link>
                <a href="mailto:help@omnistudy.ai">Email</a>
              </div>
            </div>
            <div className="footer-grid-item">
              <h3>Social</h3>
              <div className="footer-links footer-socials">
                <a href="/">
                  <InstagramIcon />
                </a>
                <a href="/">
                  <FacebookIcon />
                </a>
                <a href="/">
                  <LinkedInIcon />
                </a>
                <a href="/">
                  <TwitterIcon />
                </a>
              </div>
            </div>
            <div className="footer-grid-item">
              <h3>Policies</h3>
              <div className="footer-links">
                <Link to="/">Terms & Conditions</Link>
                <Link to="/">Privacy Policy</Link>
                <Link to="/">Accessibility</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p> &copy; 2023 Omnistudy | All Rights Reserved</p>
        </div>
      </Container>
    </footer>
  );
}
export default Footer;
