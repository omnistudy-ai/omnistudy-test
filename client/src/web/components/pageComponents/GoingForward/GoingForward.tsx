import React from "react";
import Container from "../../UI/Container";
import "./GoingForward.css";
import gf from "../../../assets/going-forward.svg";

const GoingForward = () => {
  return (
    <section className="going-forward">
      <Container>
        <div className="gf-content">
          <div className="gf-img">
            <img src={gf} alt="going forward" loading="lazy" />
            <div className="blur"></div>
          </div>
          <div className="gf-text">
            <h3>Going Forward</h3>
            <p>
              OmniStudy, our groundbreaking AI, embarks on an exciting journey
              toward scalability and potential acquisition by Chegg for a
              remarkable one billion dollars. Committed to revolutionizing
              education, we aim to refine OmniStudy's capabilities, ensuring
              seamless integration with diverse educational environments and
              fostering a limitless, AI-driven learning future.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default GoingForward;
