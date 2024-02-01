import React from "react";
import Container from "../../UI/Container";
import "./HomeMission.css";
import mission from "../../../assets/mission.svg";

const HomeMission = () => {
  return (
    <section className="mission">
      <Container>
        <div className="mission-content">
          <div className="mission-text">
            <h6>Our Goal</h6>
            <h3>
              Fostering Academic Excellence - Our Dedication to{" "}
              <span>Empowering</span> Students Through{" "}
              <span>Innovative AI Support</span>
            </h3>
            <p>
              At the heart of our mission is a dedication to revolutionizing the
              learning experience. We envision leveraging the power of
              technology to create unparalleled educational experiences that
              transcend traditional boundaries. Recognizing that learning is an
              ever-evolving journey, our platform is designed to facilitate
              effective and engaging education for everyone, anywhere.
            </p>
          </div>
          <div className="mission-img">
            <img src={mission} alt="mission" loading="lazy" />
            <div className="blur"></div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HomeMission;
