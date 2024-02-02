import React from "react";
import Container from "../../UI/Container";
import "./Testimonials.css";
import guy from "../../../assets/guy.svg";
import girl from "../../../assets/girl.svg";

const testimonialsTop = [
  {
    image: guy,
    content:
      "OmniStudy transformed my academic experience! With its personalized approach, I studied smarter, not longer, achieving remarkable results. Truly a game-changer!",
    name: "Owen Kanzler",
    school: "University of St. Thomas",
  },
  {
    image: girl,
    content:
      "Impressed by OmniStudy's impact! The real-time feedback and tailored materials optimized my study routine, resulting in improved grades. A must-have for students!",
    name: "Olivia Williams",
    school: "University of Minnesota",
  },
];

const testimonialsBottom = [
  {
    image: guy,
    content:
      "OmniStudy redefined how I approach studies. The adaptive earning recommendations enhanced my understanding, making studying effective and enjoyable. Thank you!",
    name: "Alex Rodriguez",
    school: "University of Minnesota",
  },
  {
    image: girl,
    content:
      "As a busy student, OmniStudy was a lifesaver! The virtual companion and personalized schedules made learning enjoyable and efficient. Highly recommend!",
    name: "Emily Thompson",
    school: "University of Minnesota",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <Container>
        <div className="testimonial-content">
          <div className="testimonials-top">
            {testimonialsTop.map((item, i) => (
              <div className="testimonial" key={i}>
                <div className="testimonial-top">
                  <div className="testimonial-img">
                    <img src={item.image} alt={item.image} loading="lazy" />
                  </div>
                  <div className="testimonial-text">
                    <h1>"</h1>
                    <p>{item.content}</p>
                  </div>
                </div>
                <div className="testimonial-bottom">
                  <span>- {item.name}</span>
                  <span>{item.school}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="testimonials-bottom">
            {testimonialsBottom.map((item, i) => (
              <div className="testimonial" key={i}>
                <div className="testimonial-top">
                  <div className="testimonial-img">
                    <img src={item.image} alt={item.image} loading="lazy" />
                  </div>
                  <div className="testimonial-text">
                    <h1>"</h1>
                    <p>{item.content}</p>
                  </div>
                </div>
                <div className="testimonial-bottom">
                  <span>- {item.name}</span>
                  <span>{item.school}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
