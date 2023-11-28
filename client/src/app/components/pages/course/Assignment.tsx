// Package imports
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CoursesDB, { CourseSchema } from "../../../../tools/db/Courses";

import Container from "../../../../web/components/UI/Container";
import "./Assignment.css";

export default function Assignment() {
  // Get URL parameters
  // cid: course ID
  // aid: assignment ID
  const params = useParams<ParamsType>();

  // TODO: Check to see if the assignment exists for the user
  // If it does not, redirect the user to the 404 page
  // const navigate = useNavigate();

  const [courseData, setCourseData] = useState<CourseSchema | null>(null);

  useEffect(() => {
    // Make sure course ID is present
    if(params.cid) {
        // Get the course data
        console.log(params.cid);
        CoursesDB.getCourseById(params.cid).then((courseData) => {
            // Check if the course exists, else redirect to 404
            if(courseData) 
                setCourseData(courseData);
        });
    }
}, []); 

  return (
    <div>
      <>
        <section className="assignment-hero">
          <Container>
            <h2>
              {courseData?.name ? courseData?.name : ""}: {params.aid}
            </h2>
            <div className="assignment-details">
              <p>
                Due: <span>Nov 29 at 11:59pm</span>
              </p>
              <p>
                Points: <span>20</span>
              </p>
              <p>
                Questions: <span>10</span>
              </p>
              <p>
                Time Limit: <span>None</span>
              </p>
            </div>
          </Container>
        </section>
        <section className="assignment-description">
          <Container>
            <h2>Instructions</h2>
            <div className="assignment-description-heading">
              <h2>Lab 5</h2>
            </div>
            <div className="assignment-description-content">
              <p>
                To build a house, start by obtaining necessary permits and
                selecting a suitable location. Hire an architect to design the
                layout. Next, secure financing and hire a reputable contractor.
                Begin construction with site preparation, foundation laying,
                framing, and roofing. Progress to interior and exterior
                finishing, plumbing, electrical work, and landscaping. Finally,
                conduct inspections and obtain a certificate of occupancy.
              </p>
              <div className="btn-box">
                <button>Start Assignment</button>
              </div>
            </div>
          </Container>
        </section>
        <section className="assignment-notes">
          <Container>
            <h2>Notes</h2>
            <div className="assignment-notes-grid">
              <div className="assignment-note">
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Cupiditate sapiente exercitationem consequuntur eius nihil
                  error, similique natus explicabo debitis aut.
                </p>
              </div>
              <div className="assignment-note">
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Cupiditate sapiente exercitationem consequuntur eius nihil
                  error, similique natus explicabo debitis aut.
                </p>
              </div>
              <div className="assignment-note">
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Cupiditate sapiente exercitationem consequuntur eius nihil
                  error, similique natus explicabo debitis aut.
                </p>
              </div>
              <div className="assignment-note">
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Cupiditate sapiente exercitationem consequuntur eius nihil
                  error, similique natus explicabo debitis aut.
                </p>
              </div>
            </div>
          </Container>
        </section>
      </>
    </div>
  );
}

// --------- OBJECT TYPE DEFINITIONS --------- //

// Define the type of the URL parameters
type ParamsType = {
  cid: string;
  aid: string;
};
