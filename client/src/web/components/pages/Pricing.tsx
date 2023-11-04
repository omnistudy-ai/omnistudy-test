import "./Pricing.css";
import Navbar from "../nav/Navbar";
import Container from "../UI/Container";
import Card from "../UI/Card";

export default function Pricing() {
  return (
    <div className="Pricing">
      <Navbar />
      <section className="pricing-content">
        <Container>
          <h1>OmniStudy Pricing</h1>
          <span>Upgrade your study habits with OmniStudy.</span>
          <div className="pricing-grid">
            <Card>
              <div className="price-item-header">
                <h4>Basic</h4>
                <h2>$8 per month</h2>
              </div>
              <div className="price-item-features">
                <h4>Basic Features</h4>
                <ul>
                  <li>Lorem, ipsum dolor.</li>
                  <li>Lorem, ipsum dolor.</li>
                  <li>Lorem, ipsum dolor.</li>
                  <li>Lorem, ipsum dolor.</li>
                </ul>
              </div>
              <a href="/">Get Started</a>
            </Card>
            <Card>
              <div className="price-item-header">
                <h4>OmniStudy</h4>
                <h2>$16 per month</h2>
              </div>
              <div className="price-item-features">
                <h4>OmniStudy Features</h4>
                <ul>
                  <li>Lorem, ipsum dolor.</li>
                  <li>Lorem, ipsum dolor.</li>
                  <li>Lorem, ipsum dolor.</li>
                  <li>Lorem, ipsum dolor.</li>
                </ul>
              </div>
              <a href="/">Get Started</a>
            </Card>
            <Card>
              <div className="price-item-header">
                <h4>Advanced</h4>
                <h2>$24 per month</h2>
              </div>
              <div className="price-item-features">
                <h4>Advanced Features</h4>
                <ul>
                  <li>Lorem, ipsum dolor.</li>
                  <li>Lorem, ipsum dolor.</li>
                  <li>Lorem, ipsum dolor.</li>
                  <li>Lorem, ipsum dolor.</li>
                </ul>
              </div>
              <a href="/">Get Started</a>
            </Card>
          </div>
        </Container>
      </section>
    </div>
  );
}
