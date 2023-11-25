import { useState } from "react";
import "./Home.css";
import Navbar from "../nav/Navbar";
import Container from "../UI/Container";
import logo from "../../assets/OmniStudy-logo.png";
import TimelineIcon from "@mui/icons-material/Timeline";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import CheckIcon from "@mui/icons-material/Check";
import LockIcon from "@mui/icons-material/Lock";
import CreateIcon from "@mui/icons-material/Create";
import SpeedIcon from "@mui/icons-material/Speed";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import QuizIcon from "@mui/icons-material/Quiz";
import StyleIcon from "@mui/icons-material/Style";
import SummarizeIcon from "@mui/icons-material/Summarize";
import Card from "../UI/Card";

interface FAQItem {
  question: string;
  answer: string;
  number: any;
}

export default function Home() {
  const faqData: FAQItem[] = [
    {
      number: "01",
      question: "How do I set up my OmniStudy account?",
      answer:
        "Visit our website, click 'Sign Up,' and follow the simple steps to create your personalized account for a seamless start.",
    },
    {
      number: "02",
      question: "Can I use OmniStudy for any subject?",
      answer:
        "Absolutely! OmniStudy caters to a wide range of subjects, tailoring its features to your unique learning style and academic needs.",
    },
    {
      number: "03",
      question: "How does OmniStudy provide personalized study plans?",
      answer:
        "OmniStudy analyzes your learning style and preferences to curate customized study materials and schedules, maximizing your study efficiency.",
    },
    {
      number: "04",
      question: "Is OmniStudy compatible with different devices?",
      answer:
        "Yes, OmniStudy is designed for flexibility. Enjoy a consistent experience across various devices, ensuring accessibility and convenience in your study routine.",
    },
    {
      number: "05",
      question: "What kind of real-time feedback does OmniStudy offer?",
      answer:
        "OmniStudy provides instant feedback on your progress, highlighting strengths and areas for improvement. It adapts recommendations to enhance your learning journey continuously.",
    },
  ];

  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);

  const handleQuestionClick = (index: number) => {
    setSelectedQuestion(selectedQuestion === index ? null : index);
  };

  return (
    <div className="homepage">
      <Navbar />
      <section className="hero">
        <Container>
          <h1>
            Welcome to <span>OmniStudy</span>
          </h1>
          <p>
            Your one-stop platform for all your educational needs. Discover
            personalized companions, adaptive schedules, and real-time feedback
            for an unparalleled learning experience. Elevate your studies now!
          </p>
          <a href="/register">Get Started</a>
        </Container>
      </section>
      <section className="stat">
        <Container>
          <img src={logo} alt="" />
          <h3>OmniStudy</h3>
          <h2>Elevating Statistics to New Heights!</h2>
          <p>
            OmniStudy is A game-changer in education, reducing university
            students' weekly study time by 25%. With a virtual study companion,
            tailored materials, and real-time feedback, students study smarter,
            not harder—achieving stellar results, freeing time for diverse
            pursuits.
          </p>
          <div className="stat-grid">
            <div className="stat-item">
              <TimelineIcon className="stat-icon" />
              <span>100% WORTH IT</span>
              <p>
                In just two weeks, our innovative approach at OmniStudy slashed
                study times by 25%, transforming learning efficiency and
                academic outcomes remarkably
              </p>
            </div>
            <div className="stat-item">
              <DeviceHubIcon className="stat-icon" />
              <span>100% USER FRIENDLY</span>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
                officiis reiciendis in tenetur, harum vero voluptatum dolores
                nostrum neque fugit?
              </p>
            </div>
            <div className="stat-item">
              <CheckIcon className="stat-icon" />
              <span>100% VERIFIED</span>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                architecto quidem obcaecati laboriosam ea eligendi repellendus
                earum sit laudantium autem.
              </p>
            </div>
            <div className="stat-item">
              <LockIcon className="stat-icon" />
              <span>Secure & Flexible</span>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
                eos reiciendis, minus dolor voluptatibus ratione corrupti autem
                quam impedit accusamus.
              </p>
            </div>
            <div className="stat-item">
              <CreateIcon className="stat-icon" />
              <span>#1 Educational Resource</span>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi,
                magnam adipisci? Tenetur, tempore. Facilis quasi architecto odio
                pariatur aperiam minima?
              </p>
            </div>
            <div className="stat-item">
              <SpeedIcon className="stat-icon" />
              <span>In Beta Testing</span>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur voluptatibus atque architecto rem aperiam! Nisi ad
                officiis commodi reiciendis ea?
              </p>
            </div>
          </div>
        </Container>
      </section>
      <section className="mission-statement">
        <Container>
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              At the heart of our mission is a dedication to revolutionizing the
              learning experience. We envision leveraging the power of
              technology to create unparalleled educational experiences that
              transcend traditional boundaries. Recognizing that learning is an
              ever-evolving journey, our platform is designed to facilitate
              effective and engaging education for everyone, anywhere.
            </p>
          </div>
        </Container>
      </section>
      <section className="features">
        <Container>
          <img src={logo} alt="" />
          <h3>Elevate Learning Everywhere</h3>
          <h2>Unlock Your Learning Potential Now!</h2>
          <p>
            Dive into OmniStudy's curated collection, offering tailored study
            companions, personalized schedules, adaptive learning, and real-time
            feedback—your ultimate toolkit for success.
          </p>
          <div className="featured-grid">
            <div className="featured-item">
              <HeadphonesIcon className="featured-icon" />
              <span>AI Listening</span>
              <p>
                Utilizes AI algorithms to record lectures and generate summary
                notes that are searchable by topic.
              </p>
            </div>
            <div className="featured-item">
              <QuestionMarkIcon className="featured-icon" />
              <span>Assignment Assistance</span>
              <p>
                Uses a data-driven approach to generate prompts and solutions
                for assignments
              </p>
            </div>
            <div className="featured-item">
              <AutoStoriesIcon className="featured-icon" />
              <span>Textbook Upload</span>
              <p>
                Enables users to upload full textbooks, from which AI engine can
                scan through.
              </p>
            </div>
            <div className="featured-item">
              <QuizIcon className="featured-icon" />
              <span>Quiz Generator</span>
              <p>
                Automatically creates quizzes based on the notes and textbooks
                uploaded.
              </p>
            </div>
            <div className="featured-item">
              <StyleIcon className="featured-icon" />
              <span>Flashcard Creator</span>
              <p>
                Automatically generates digital flashcards based on the user's
                notes and textbooks.
              </p>
            </div>
            <div className="featured-item">
              <SummarizeIcon className="featured-icon" />
              <span>AI Summaries</span>
              <p>Provides condensed summaries of chapters or lecture notes.</p>
            </div>
          </div>
        </Container>
      </section>
      <section className="testimonials">
        <Container>
          <h2>See What Others Had To Say</h2>
          <div className="testimonial-grid">
            <Card className="testimonial-item">
              <p>
                "OmniStudy transformed my academic experience! With its
                personalized approach, I studied smarter, not longer, achieving
                remarkable results. Truly a game-changer!"
              </p>
              <span>
                - Owen Kanzler - <br /> University of St. Thomas
              </span>
            </Card>
            <Card className="testimonial-item">
              <p>
                "Impressed by OmniStudy's impact! The real-time feedback and
                tailored materials optimized my study routine, resulting in
                improved grades. A must-have for students!"
              </p>
              <span>
                - Olivia Williams - <br /> University of Minnesota
              </span>
            </Card>
            <Card className="testimonial-item">
              <p>
                "OmniStudy redefined how I approach studies. The adaptive
                learning recommendations enhanced my understanding, making
                studying effective and enjoyable. Thank you!"
              </p>
              <span>
                - Alex Rodriguez - <br /> University of Minnesota
              </span>
            </Card>
            <Card className="testimonial-item">
              <p>
                "As a busy student, OmniStudy was a lifesaver! The virtual
                companion and personalized schedules made learning enjoyable and
                efficient. Highly recommend!"
              </p>
              <span>
                - Emily Thompson - <br /> University of Minnesota
              </span>
            </Card>
          </div>
        </Container>
      </section>
      <section className="faq">
        <Container>
          <img src={logo} alt="" />
          <h3>Capitalize on Opportunity</h3>
          <h2>OmniStudy FAQ</h2>
          <p>
            Explore our FAQ section for comprehensive answers to common queries.
            From setting up your account to maximizing study benefits, find
            solutions that empower your OmniStudy experience effortlessly.
          </p>
          <div className="faq-questions">
            {faqData.map((item, index) => (
              <div
                className="faq-question"
                key={index}
                onClick={() => handleQuestionClick(index)}
              >
                <div className="question-head">
                  <span>{item.number}</span>
                  <h4>{item.question}</h4>
                </div>
                {selectedQuestion === index && <p>{item.answer}</p>}
              </div>
            ))}
          </div>
        </Container>
      </section>
      <footer className="footer">
        <Container>
          <div className="footer-top">
            <div className="footer-logo">
              <img src={logo} alt="" />
            </div>
            <div className="footer-links">
              <div className="footer-omnistudy-links">
                <h3>OmniStudy</h3>
                <a href="/">Pricing</a>
                <a href="/">About Us</a>
                <a href="/login">Login</a>
                <a href="/register">Register</a>
              </div>
              <div className="footer-features">
                <h3>Features</h3>
                <a href="/">Calender</a>
                <a href="/">Textbook Upload</a>
                <a href="/">Listening</a>
                <a href="/">Flashcards</a>
                <a href="/">Summaries</a>
              </div>
              <div className="footer-socials">
                <h3>Social</h3>
                <a href="/">Instagram</a>
                <a href="/">Facebook</a>
                <a href="/">Twitter</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <h2>OmniStudy</h2>
            <a href="/">Privacy Policy</a>
            <a href="/">Terms & Conditions</a>
          </div>
        </Container>
      </footer>
    </div>
  );
}
