import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/OmniStudy-logo.png";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

export interface NavModalProps {
  modalOpen: boolean;
  handleClose: () => void;
}

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const NavModal: React.FC<NavModalProps> = ({ handleClose }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };
  return (
    <div className="hamburger-container">
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="nav-modal"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div className="navbar-small-content">
          <Link to="/" aria-label="OmniStudy">
            <motion.img
              src={logo}
              alt="OmniStudy"
              loading="lazy"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          </Link>
          <div className="navbar-small-links">
            <Link to="/" aria-label="Home" onClick={handleClose}>
              Home
            </Link>
            <Link to="/about" aria-label="About" onClick={handleClose}>
              About
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLoginClick}
            >
              Login
            </motion.button>
          </div>
          <div className="navbar-small-lower-links">
            <Link to="/" aria-label="Instagram">
              <InstagramIcon />
            </Link>
            <Link to="/" aria-label="Facebook">
              <FacebookIcon />
            </Link>
            <Link to="/" aria-label="LinkedIn">
              <LinkedInIcon />
            </Link>
            <Link to="/" aria-label="Twitter">
              <TwitterIcon />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NavModal;
