import React from "react";
import Container from "../../UI/Container";
import "./HomeStat.css";
import missionImg from "../../../assets/mission-img.svg";

const statistics = [
  {
    header: "10k",
    name: "Students Helped",
    description:
      "In just two weeks, our innovative approach at OmniStudy slashed study times by 25%, transforming learning efficiency and academic outcomes remarkably.",
  },
  {
    header: "25%",
    name: "Reduced Study Time",
    description:
      "In just two weeks, our innovative approach at OmniStudy slashed study times by 25%, transforming learning efficiency and academic outcomes remarkably.",
  },
  {
    header: "100%",
    name: "Worth It",
    description:
      "In just two weeks, our innovative approach at OmniStudy slashed study times by 25%, transforming learning efficiency and academic outcomes remarkably.",
  },
];

const HomeStat = () => {
  return (
    <section className="stat" id="stat">
      <Container>
        <div className="stat-content">
          <div className="stat-img">
            <img src={missionImg} alt="dashboard" loading="lazy" />
            <div className="blur"></div>
          </div>
          <div className="stat-text">
            <h6>OmniStudy Impact</h6>
            <h3>
              A game-changer in education, <span>reducing</span> university
              students' weekly study time <span>by 25%.</span>
            </h3>
            <p>
              With a virtual study companion, tailored materials, and real-time
              feedback, students study smarter, not harder—achieving stellar
              results, freeing time for diverse pursuits.
            </p>
          </div>
        </div>
        <div className="stat-grid">
          {statistics.map((statistic, i) => (
            <div className="statistic" key={i}>
              <h1>{statistic.header}</h1>
              <h5>{statistic.name}</h5>
              <p>{statistic.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HomeStat;
