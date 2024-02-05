import React from "react";
import Container from "../../UI/Container";
import "./Overview.css";
import overview from "../../../assets/overview-img.svg";

const Overview = () => {
  return (
    <section className="overview">
      <Container>
        <div className="overview-content">
          <div className="overview-text">
            <h6>About Us</h6>
            <h3>Project Overview</h3>
            <p>
              At the heart of our mission is a dedication to revolutionizing the
              learning experience. We envision leveraging the power of
              technology to create unparalleled educational experiences that
              transcend traditional boundaries. Recognizing that learning is an
              ever-evolving journey, our platform is designed to facilitate
              effective and engaging education for everyone, anywhere.
            </p>
            <p>
              As a critical part of the Google Student Developer Club at the
              University of Minnesota, we are committed to developing a platform
              that stand at the intersection of technology and education. The
              goals we hold are at the ethos of GSDC, aiming to deliver an
              unparalleled learning experience.
            </p>
          </div>
          <div className="overview-img">
            <img src={overview} alt="Standing out" loading="lazy" />
            <div className="blur"></div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Overview;
