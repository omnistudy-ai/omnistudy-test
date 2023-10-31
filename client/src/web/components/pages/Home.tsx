import "./Home.css";
import Navbar from "../nav/Navbar";
import Container from "../UI/Container";
import heroImg from "../../assests/Android-bro.png";
import featureImg from "../../assests/Android-bro2.png";
import missionImg from "../../assests/mission-img.png";
import Card from "../UI/Card";

export default function Home() {
  return (
    <div className="homepage">
      <Navbar />
      <section className="hero">
        <Container>
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
              <img src={featureImg} alt="" />
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
