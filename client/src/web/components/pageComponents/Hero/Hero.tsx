import React from "react";
import { Link } from "react-router-dom";
import Container from "../../UI/Container";
import "./Hero.css";
import heroImg from "../../../assets/hero-img.svg";
import { motion } from "framer-motion";

import { ArrowDownward } from "@mui/icons-material";

const Hero = () => {
  return (
    <section className="hero">
      <Container>
        <div className="hero-content">
          <h1>
            Your <span>one-stop</span> platform for all your{" "}
            <span>educational needs.</span>
          </h1>
          <p>
            Discover personalized companions, adaptive schedules, and real-time
            feedback for an unparalleled learning experience. Elevate your
            studies now!
          </p>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link className="button" to="/register" aria-label="Get started">
              Get Started
            </Link>
          </motion.div>
          {/* <div className="scroll">
            <div className="circle"></div>
            <div className="circle"></div>
            <a href="#stat" className="scroll-button" aria-label="scroll">
              <ArrowDownward className="hero-arrow" />
            </a>
          </div> */}
        </div>
        <div className="hero-img">
          <img
            src={heroImg}
            alt="Teacher"
            loading="lazy"
            height="auto"
            width="100%"
          />
        </div>
      </Container>
    </section>
  );
};

export default Hero;
