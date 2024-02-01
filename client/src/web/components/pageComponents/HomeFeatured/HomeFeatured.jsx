import React from "react";
import Container from "../../UI/Container";
import "./HomeFeatured.css";

import {
  Headphones,
  People,
  Book,
  Quiz,
  FileCopy,
  Summarize,
} from "@mui/icons-material";

const featuredItems = [
  {
    icon: <Headphones />,
    name: "AI Listening",
    description:
      "Utilizes AI algorithms to record lectures and generate summary notes that are searchable by topic.",
    color: "#00adb5",
  },
  {
    icon: <People />,
    name: "Assignment Assistance",
    description:
      " Uses a data-driven approach to generate prompts and solutions for assignments",
    color: "#8A2BE2",
  },
  {
    icon: <Book />,
    name: "Textbook Upload",
    description:
      "Enables users to upload full textbooks, from which AI engine can scan through.",
    color: "#b50800",
  },
  {
    icon: <Quiz />,
    name: "Quiz Generator",
    description:
      "Automatically creates quizzes based on the notes and textbooks uploaded.",
    color: "#ff3e36",
  },
  {
    icon: <FileCopy />,
    name: "Flashcard Creator",
    description:
      "Automatically generates digital flashcards based on the user's notes and textbooks.",
    color: "#FFAE42",
  },
  {
    icon: <Summarize />,
    name: "AI Summaries",
    description: "Provides condensed summaries of chapters or lecture notes.",
    color: "#00b544",
  },
];

const HomeFeatured = () => {
  return (
    <section className="featured">
      <Container>
        <div className="featured-content">
          <h6>What We Offer</h6>
          <h3>
            We Provide <span>Cutting-Edge</span> Features for <br />
            <span>Everyone's</span> Enhanced Learning Experiences
          </h3>
          <p>
            Dive into OmniStudy's curated collection, offering tailored study
            companions, personalized schedules, adaptive learning, and real-time
            feedback—your ultimate toolkit for success.
          </p>
        </div>
        <div className="featured-grid">
          {featuredItems.map((item, i) => (
            <div className="featured-item" key={i}>
              <div>
                <div className="icon" style={{ backgroundColor: item.color }}>
                  {item.icon}
                </div>
                <h6>{item.name}</h6>
              </div>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HomeFeatured;
