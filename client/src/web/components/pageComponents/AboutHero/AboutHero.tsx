import React from "react";
import Container from "../../UI/Container";
import "./AboutHero.css";

const AboutHero = () => {
  return (
    <section className="about-hero">
      <Container>
        <h2>
          We're an AI educational platform, inspiring <span>curiosity</span> and
          fostering <span>continuous learning.</span>
        </h2>
      </Container>
    </section>
  );
};

export default AboutHero;
