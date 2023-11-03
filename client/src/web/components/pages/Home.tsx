import "./Home.css";
import Navbar from "../nav/Navbar";
import Container from "../UI/Container";
import heroImg from "../../assets/hero-img.png";
import featureImg from "../../assets/feature-img.png";
import missionImg from "../../assets/content-img.png";
import logo from "../../assets/OmniStudy-logo.png";
import statImg from "../../assets/stat-img.png";
import Card from "../UI/Card";

export default function Home() {
  return (
    <div className="homepage">
      <Navbar />
      <section className="hero">
        <Container>
          <div className="hero-grid">
            <div className="hero-content">
              <h1>
                Welcome to <span>OmniStudy</span>
              </h1>
              <p>Your one-stop platform for all your educational needs.</p>
              <a href="/register">Get Started</a>
            </div>
            <div className="hero-img">
              <img src={heroImg} alt="" />
            </div>
          </div>
        </Container>
      </section>
      <section className="stat">
        <Container>
          <div className="stat-content">
            <h2>Reduce Weekly Study Time By 25%</h2>
            <div className="stat-grid">
              <Card className="stat-item">
                <div>
                  <h4>Users</h4>
                </div>
                <div>
                  <h3>1347</h3>
                  <span>570 last month</span>
                </div>
              </Card>
              <Card className="stat-item">
                <div>
                  <h4>Info</h4>
                </div>
                <div>
                  <h3>10</h3>
                  <span>2 Last Month</span>
                </div>
              </Card>
              <Card>
                <div className="stat-info">
                  <div>
                    <h4>Study Time Reduced</h4>
                  </div>
                  <div>
                    <h3>25%</h3>
                    <span>down 3% last month</span>
                  </div>
                </div>
                <div className="stat-img">
                  <img src={statImg} alt="" />
                </div>
              </Card>
            </div>
            <div className="stat-text">
              <Card>
                <h3>What We Did</h3>
                <p>
                  Study Shows OmniStudy reduced universitys students weekly
                  study time by 25%. By providing students with a virtual study
                  companion, OmniStudy tailors study materials and schedules to
                  their unique learning styles and needs. The AI's real-time
                  feedback and adaptive learning recommendations have empowered
                  students to study smarter, not harder. As a result, they now
                  devote less time to studying, yet achieve better results,
                  leaving them with more time for other pursuits while still
                  excelling in their educational pursuits.
                </p>
              </Card>
              <Card>
                <h3>How We Did It</h3>
                <p>
                  Through strategic partnerships with educational institutions,
                  we established a seamless rollout process. University
                  administrators integrated our AI platform into their learning
                  management systems, ensuring widespread accessibility. We
                  conducted informative workshops and training sessions,
                  equipping students with the skills to leverage OmniStudy
                  effectively. Feedback channels were established to continually
                  refine the platform, ensuring it met the unique needs of
                  students at each campus. This collaborative effort led to a
                  successful, wide-reaching implementation, benefitting students
                  across multiple universities.
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </section>
      <section className="features">
        <Container>
          <h2>Features</h2>
          <div className="feature-grid">
            <Card className="feature-item">
              <div className="feature-item-img">
                <img src={featureImg} alt="" />
              </div>
              <h3>Lorem, ipsum.</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem,
                praesentium.
              </p>
              <a href="/">Learn More</a>
            </Card>
            <Card className="feature-item">
              <div className="feature-item-img">
                <img src={featureImg} alt="" />
              </div>
              <h3>Lorem, ipsum.</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem,
                praesentium.
              </p>
              <a href="/">Learn More</a>
            </Card>
            <Card className="feature-item">
              <div className="feature-item-img">
                <img src={featureImg} alt="" />
              </div>
              <h3>Lorem, ipsum.</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem,
                praesentium.
              </p>
              <a href="/">Learn More</a>
            </Card>
          </div>
        </Container>
      </section>
      <section className="mission-statement">
        <Container>
          <div className="mission-img">
            <img src={missionImg} alt="" />
          </div>
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum
              culpa voluptatibus ratione quod illum, minima quo omnis,
              laboriosam corrupti voluptate aut. Nemo distinctio, minima dolore
              possimus reiciendis quia temporibus ipsum. Repudiandae voluptas
              vitae id ad quis rerum odio, perferendis deleniti in minima, sunt
              ducimus facilis eaque et animi. Iure, placeat officia. Est iste,
              officia accusamus veritatis temporibus ut nobis labore? Dolores
              debitis ducimus temporibus labore hic quia impedit cupiditate
              molestiae? Cupiditate labore ea repudiandae ratione esse fugiat
              similique facere assumenda atque odio eaque, recusandae rerum
              nulla exercitationem? Repudiandae, velit quasi.
            </p>
          </div>
        </Container>
      </section>
      <section className="content">
        <Container>
          <div className="content-content">
            <h2>Lorem, ipsum.</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
              repellendus voluptate voluptatum illum, dignissimos sint similique
              asperiores laudantium autem odit natus cupiditate quos repellat ut
              expedita aliquid obcaecati? Fuga, ipsa. Doloribus, quas minus?
              Optio veniam rem corrupti culpa recusandae beatae harum, dolore
              dicta provident iusto voluptatibus non sunt consequuntur id illum
              iure consectetur! Cum reprehenderit doloribus deleniti, ab
              aspernatur aliquam. Incidunt inventore neque accusamus recusandae
              repellendus minima aut nemo eius voluptates voluptate magni eaque
              animi, sequi quibusdam? Aliquid, dolores in sapiente architecto
              labore nam quia ut, voluptates quaerat officiis corrupti! Nulla
              sunt ex earum tempora quod quo, eveniet delectus ducimus
              laudantium? Inventore sequi similique nobis, quos dolorem porro
              qui quae quia sapiente nihil saepe ex dicta laudantium nulla. Rem,
              aspernatur.
            </p>
          </div>
          <div className="content-img">
            <img src={missionImg} alt="" />
          </div>
        </Container>
      </section>
      <section className="testimonials">
        <Container>
          <h2>Testimonials/Reviews</h2>
          <div className="testimonial-grid">
            <Card className="testimonial-item">
              <div className="testimonial-img">
                <img src={featureImg} alt="" />
              </div>
              <div className="testimonial-content">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores nulla deleniti pariatur alias nemo ea distinctio eaque
                  sit amet labore.
                </p>
                <h3>- John Doe</h3>
              </div>
            </Card>
            <Card className="testimonial-item">
              <div className="testimonial-img">
                <img src={featureImg} alt="" />
              </div>
              <div className="testimonial-content">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores nulla deleniti pariatur alias nemo ea distinctio eaque
                  sit amet labore.
                </p>
                <h3>- John Doe</h3>
              </div>
            </Card>
            <Card className="testimonial-item">
              <div className="testimonial-img">
                <img src={featureImg} alt="" />
              </div>
              <div className="testimonial-content">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores nulla deleniti pariatur alias nemo ea distinctio eaque
                  sit amet labore.
                </p>
                <h3>- John Doe</h3>
              </div>
            </Card>
            <Card className="testimonial-item">
              <div className="testimonial-img">
                <img src={featureImg} alt="" />
              </div>
              <div className="testimonial-content">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores nulla deleniti pariatur alias nemo ea distinctio eaque
                  sit amet labore.
                </p>
                <h3>- John Doe</h3>
              </div>
            </Card>
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
