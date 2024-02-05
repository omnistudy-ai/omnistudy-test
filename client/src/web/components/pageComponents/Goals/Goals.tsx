import React from "react";
import Container from "../../UI/Container";
import "./Goals.css";
import goal1 from "../../../assets/goal-1.svg";
import goal2 from "../../../assets/goal-2.svg";
import goal3 from "../../../assets/goal-3.svg";

interface goalItem {
  image: any;
  goal: string;
  description: string;
}

const goals: goalItem[] = [
  {
    image: goal1,
    goal: "Empowering Efficient Learning",
    description:
      "OmniStudy's core objective is to empower students through personalized study tools, adaptive schedules, and real-time feedback. By fostering a smarter approach to learning, our goal is to streamline the educational experience, maximizing efficiency and ensuring academic success.",
  },
  {
    image: goal2,
    goal: "Fostering Academic Confidence",
    description:
      "At OmniStudy, we aim to go beyond traditional methods. Our innovative features and adaptive learning strategies are designed to not only improve academic results but also to cultivate a profound sense of mastery and confidence in students. We are committed to empowering students on their educational journey.",
  },
  {
    image: goal3,
    goal: "Enhancing Work-Life Balance",
    description:
      "OmniStudy understands the importance of a balanced lifestyle. Our vision goes beyond academic success; we aim to reduce study times without compromising results, providing students with more time for personal pursuits and a well-rounded life. OmniStudy seeks to create an environment where students thrive academically while enjoying the freedom to explore and develop holistically.",
  },
];

const Goals = () => {
  return (
    <section className="goals">
      <Container>
        <div className="goal-content">
          <div className="goal-text">
            <h3>
              Our Goals For the <span>Future</span>
            </h3>
            <p>
              As an educational AI platform, our future goals involve advancing
              personalized learning experiences, integrating cutting-edge
              technologies, and empowering learners worldwide through accessible
              and innovative educational solutions.
            </p>
          </div>
          <div className="goal-grid">
            {goals.map((goal, i) => (
              <div className="goal" key={i}>
                <div className="goal-img">
                  <img src={goal.image} alt={goal.goal} loading="lazy" />
                </div>
                <div className="goal-copy">
                  <h6>{goal.goal}</h6>
                  <p>{goal.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Goals;
