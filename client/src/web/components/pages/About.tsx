import "./About.css";
import Navbar from "../nav/Navbar";
// import Container from "../UI/Container";
// import logo from "../../assets/OmniStudy-logo.png";
import Footer from "../footer/Footer";
import AboutHero from "../pageComponents/AboutHero/AboutHero";
import Overview from "../pageComponents/Overview/Overview";
import Goals from "../pageComponents/Goals/Goals";
import GoingForward from "../pageComponents/GoingForward/GoingForward";
import Team from "../pageComponents/Team/Team";

export default function About() {
  return (
    <div className="About">
      <Navbar />
      <AboutHero />
      <Overview />
      <Goals />
      <GoingForward />
      <Team />

      {/* <section className="about-hero">
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
      </section> */}

      {/* <section className="project-goals">
        <Container>
          <img src={logo} alt="" />
          <h3>One Step at a Time</h3>
          <h2>Our Goals For the Future</h2>
          <div className="project-goals-content">
            <h4>Empowering Efficient Learning</h4>
            <p>
              OmniStudy's core objective is to empower students through
              personalized study tools, adaptive schedules, and real-time
              feedback. By fostering a smarter approach to learning, our goal is
              to streamline the educational experience, maximizing efficiency
              and ensuring academic success.
            </p>
          </div>
          <div className="project-goals-content">
            <h4>Fostering Academic Confidence</h4>
            <p>
              At OmniStudy, we aim to go beyond traditional methods. Our
              innovative features and adaptive learning strategies are designed
              to not only improve academic results but also to cultivate a
              profound sense of mastery and confidence in students. We are
              committed to empowering students on their educational journey.
            </p>
          </div>
          <div className="project-goals-content">
            <h4>Enhancing Work-Life Balance</h4>
            <p>
              OmniStudy understands the importance of a balanced lifestyle. Our
              vision goes beyond academic success; we aim to reduce study times
              without compromising results, providing students with more time
              for personal pursuits and a well-rounded life. OmniStudy seeks to
              create an environment where students thrive academically while
              enjoying the freedom to explore and develop holistically.
            </p>
          </div>
        </Container>
      </section> */}

      {/* <section className="team">
        <Container>
          <h2>The Omnistudy Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="team-member-picture"></div>
              <div className="team-member-content">
                <h4>Jamison Grudem</h4>
                <span>Founder, CEO</span>
                <span>University of Minnesota</span>
              </div>
            </div>
            <div className="team-member">
              <div className="team-member-picture"></div>
              <div className="team-member-content">
                <h4>Owen Kanzler</h4>
                <span>Frontend</span>
                <span>University of St. Thomas</span>
              </div>
            </div>
            <div className="team-member">
              <div className="team-member-picture"></div>
              <div className="team-member-content">
                <h4>Noah Schlorf</h4>
                <span>Frontend</span>
                <span>University of Minnesota</span>
              </div>
            </div>
            <div className="team-member">
              <div className="team-member-picture"></div>
              <div className="team-member-content">
                <h4>Abbaas Mohamud</h4>
                <span>Frontend</span>
                <span>University of Minnesota</span>
              </div>
            </div>
            <div className="team-member">
              <div className="team-member-picture"></div>
              <div className="team-member-content">
                <h4>Alec Duval</h4>
                <span>Backend</span>
                <span>University of Minnesota</span>
              </div>
            </div>
            <div className="team-member">
              <div className="team-member-picture"></div>
              <div className="team-member-content">
                <h4>Konrad Trestka</h4>
                <span>Backend</span>
                <span>University of Minnesota</span>
              </div>
            </div>
            <div className="team-member">
              <div className="team-member-picture"></div>
              <div className="team-member-content">
                <h4>Brady</h4>
                <span>IDK</span>
                <span>University of Minnesota</span>
              </div>
            </div>
          </div>
        </Container>
      </section> */}

      {/* <section className="going-forward">
        <Container>
          <div className="going-forward-grid">
            <div className="going-forward-img"></div>
            <div className="going-forward-content">
              <h2>Going Forward</h2>
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
                venture signifies not just a financial milestone but a
                commitment to empowering students globally. Through this union,
                we aim to provide a comprehensive, AI-driven educational
                solution that transcends conventional boundaries, fostering a
                future where learning knows no limits.
              </p>
            </div>
          </div>
        </Container>
      </section> */}
      <Footer />
    </div>
  );
}
