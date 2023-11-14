import { useState } from "react";
import "./About.css";
import Navbar from "../nav/Navbar";
import Container from "../UI/Container";
import logo from "../../assets/OmniStudy-logo.png";

export default function About() {
  const [viewMore, setViewMore] = useState(false);

  const viewMoreHandler = () => {
    setViewMore(!viewMore);
  };

  return (
    <div className="About">
      <Navbar />

      <section className="about-hero">
        <Container>
          <h1>Project Overview</h1>
          <p>
            At the heart of our mission is a dedication to revolutionizing the
            learning experience. We envision leveraging the power of technology
            to create unparalleled educational experiences that transcend
            traditional boundaries. Recognizing that learning is an
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
        </Container>
      </section>

      <section className="project-goals">
        <Container>
          <div className="goals-grid">
            <div className="goals-img">
              <h3>"OmniStudy, Knowledge's Infinite Navigator."</h3>
            </div>
            <div className="goals-content">
              <h2>Our Goals</h2>
              <p>
                <span>Quality Education for All:</span> We’re leveraging the
                collaborative spirit and technological experiences to create a
                learning environment where quality education is a must for all.
                Our platform is a testament to this, giving personalized
                educational journeys for all!
              </p>
              <p>
                <span>Economic Growth Through Learning:</span> With the goal of
                aligning education with the evolving job market, our platform
                ensures that learners are equipped with the latest skills and
                knowledge. Our platform empowers students alike to be ahead of
                the curve, leading to an easy transition from academic pursuits
                to real careers.
              </p>
              <p>
                <span>Innovation in Education Infrastructure:</span> At
                OmniStudy, we are at the forefront of educational innovation.
                Our site is not just a tool but a sign of progress, showing
                cutting edge solutions that refine how knowledge is consumed.
              </p>
            </div>
          </div>
          <div className="goals-img2">
            <h3>
              "AI's Brilliance: Igniting Minds, Shaping Futures, Empowering
              Educational Horizons."
            </h3>
          </div>
        </Container>
      </section>

      <section className="team">
        <Container>
          <h2>Team</h2>
          <div className="team-leader">
            <img src="../blue-vape.png" alt="About the project manager" />
            <h3>Jamison Grudem</h3>
            <span>Founder, CEO</span>
            <p>
              The man behind it all! Jamison Grudem, best described as a
              relentless innovator, known for his extraordinary visons. He
              navigates the realms of unknown, mystifying everyone in his path.
              Grudem, is the architect of this educational experience that
              captivates and inspires all.
            </p>
          </div>
          {viewMore && (
            <div className="team-members">
              <div className="frontend">
                <div className="team-member">
                  <h3>Owen Kanzler</h3>
                  <span>frontend</span>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis eveniet sequi beatae voluptatum minus esse
                    dolorum error dolore delectus atque.
                  </p>
                </div>
                <div className="team-member">
                  <h3>Noah Schlorf</h3>
                  <span>frontend</span>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis eveniet sequi beatae voluptatum minus esse
                    dolorum error dolore delectus atque.
                  </p>
                </div>
                <div className="team-member">
                  <h3>Abbaas Muhamud</h3>
                  <span>frontend</span>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis eveniet sequi beatae voluptatum minus esse
                    dolorum error dolore delectus atque.
                  </p>
                </div>
              </div>
              <div className="backend">
                <div className="team-member">
                  <h3>Alec Duval</h3>
                  <span>backend</span>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis eveniet sequi beatae voluptatum minus esse
                    dolorum error dolore delectus atque.
                  </p>
                </div>
                <div className="team-member">
                  <h3>Konrad Trestka</h3>
                  <span>backend</span>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis eveniet sequi beatae voluptatum minus esse
                    dolorum error dolore delectus atque.
                  </p>
                </div>
              </div>
            </div>
          )}
          <button onClick={viewMoreHandler}>
            {!viewMore ? "View The Team" : "Hide The Team"}
          </button>
        </Container>
      </section>

      <section className="going-forward">
        <Container>
          <h2>Going Forward</h2>
          <div className="going-forward-content">
            <p>
              OmniStudy, our groundbreaking AI, is poised for an exciting
              journey ahead as we chart a course towards scalability and
              potential acquisition by Chegg for a remarkable one billion
              dollars. With a steadfast commitment to revolutionizing the
              educational landscape, OmniStudy has demonstrated unparalleled
              capabilities in enhancing learning experiences. Our strategic
              vision involves harnessing cutting-edge technologies to further
              refine and expand the platform's capabilities, ensuring seamless
              integration with diverse educational environments. As we forge
              ahead, we envisage an enriched collaboration with Chegg, a
              prominent player in the education technology sector. The synergy
              between OmniStudy's advanced AI algorithms and Chegg's expansive
              reach promises to redefine the edtech landscape. This momentous
              venture signifies not just a financial milestone but a commitment
              to empowering students globally. Through this union, we aim to
              provide a comprehensive, AI-driven educational solution that
              transcends conventional boundaries, fostering a future where
              learning knows no limits.
            </p>
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
