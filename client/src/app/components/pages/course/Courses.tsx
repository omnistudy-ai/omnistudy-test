import React from "react";
import Card from "../../../../web/components/UI/Card";
import Container from "../../../../web/components/UI/Container";
import ComputerIcon from "@mui/icons-material/Computer";
import PersonIcon from "@mui/icons-material/Person";
import "./Courses.css";

export default function Courses() {
  return (
    <>
      <section className="courses-hero">
        <Container>
          <h1>Upcoming Courses</h1>
          <div className="courses-grid">
            <Card>
              <ComputerIcon />
              <h2>Cisc 131</h2>
              <p>September 7 - December 20</p>
              <p>
                <span>Prof. Kanzler</span> room - 69
              </p>
            </Card>
            <Card>
              <ComputerIcon />
              <h2>Cisc 230</h2>
              <p>September 7 - December 20</p>
              <p>
                <span>Prof. Kanzler</span> room - 69
              </p>
            </Card>
            <Card>
              <ComputerIcon />
              <h2>Cisc 231</h2>
              <p>September 7 - December 20</p>
              <p>
                <span>Prof. Kanzler</span> room - 69
              </p>
            </Card>
            <Card>
              <ComputerIcon />
              <h2>Cisc 330</h2>
              <p>September 7 - December 20</p>
              <p>
                <span>Prof. Kanzler</span> room - 69
              </p>
            </Card>
          </div>
        </Container>
      </section>
      <section className="courses-lower-grid">
        <section className="timetable">
          <Container>
            <h2>Timetable</h2>
            <div className="timetable-day">
              <h3>Today 18.11</h3>
              <div className="day-course">
                <span>due 6/9</span>
                <div className="day-content">
                  <div className="color">
                    <ComputerIcon />
                  </div>
                  <p>
                    Object Oriented Programming <span>In Person</span>
                  </p>
                </div>
                <PersonIcon />
                <span>12:00 AM</span>
              </div>
              <div className="day-course">
                <span>due 6/9</span>
                <div className="day-content">
                  <div className="color">
                    <ComputerIcon />
                  </div>
                  <p>
                    Object Oriented Programming <span>In Person</span>
                  </p>
                </div>
                <PersonIcon />
                <span>12:00 AM</span>
              </div>
              <div className="day-course">
                <span>due 6/9</span>
                <div className="day-content">
                  <div className="color">
                    <ComputerIcon />
                  </div>
                  <p>
                    Object Oriented Programming <span>In Person</span>
                  </p>
                </div>
                <PersonIcon />
                <span>12:00 AM</span>
              </div>
            </div>
            <div className="timetable-day">
              <h3>Tomorrow 19.11</h3>
              <div className="day-course">
                <span>due 6/9</span>
                <div className="day-content">
                  <div className="color">
                    <ComputerIcon />
                  </div>
                  <p>
                    Object Oriented Programming <span>In Person</span>
                  </p>
                </div>
                <PersonIcon />
                <span>12:00 AM</span>
              </div>
            </div>
          </Container>
        </section>
        <section className="progress">
          <h2>Progress</h2>
          <div className="progress-grid">
            <div className="progress-class">
              <div className="progress-bar-underlay">
                <div
                  className="progress-bar-overlay"
                  style={{ width: "61%" }}
                ></div>
              </div>
              <div className="progress-content">
                <h3>Object oriented Programing</h3>
                <span>200/330</span>
              </div>
            </div>
            <div className="progress-class">
              <div className="progress-bar-underlay">
                <div
                  className="progress-bar-overlay"
                  style={{ width: "61%" }}
                ></div>
              </div>
              <div className="progress-content">
                <h3>Object oriented Programing</h3>
                <span>200/330</span>
              </div>
            </div>
            <div className="progress-class">
              <div className="progress-bar-underlay">
                <div
                  className="progress-bar-overlay"
                  style={{ width: "61%" }}
                ></div>
              </div>
              <div className="progress-content">
                <h3>Object oriented Programing</h3>
                <span>200/330</span>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
