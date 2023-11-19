import React, { useEffect, useState } from "react";
import Card from "../../../../web/components/UI/Card";
import Container from "../../../../web/components/UI/Container";
import ComputerIcon from "@mui/icons-material/Computer";
import PersonIcon from "@mui/icons-material/Person";
import "./Courses.css";
import { v4 as uuidv4 } from "uuid";

import UsersDB from "../../../../tools/db/Users";
import CoursesDB, { CourseSchema } from "../../../../tools/db/Courses";
import AppAuth from "../../../../tools/Auth";

export default function Courses() {
  const [courses, setCourses] = useState<Array<CourseSchema>>([]);

  // State to manage the form visibility
  const [showForm, setShowForm] = useState(false);
  const [showAddButton, setShowAddButton] = useState(true);

  // State to manage form input
  const [newCourse, setNewCourse] = useState({
    name: "",
    title: "",
    startDate: "",
    endDate: "",
    professor: "",
    room: "",
  });

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Generate a random id for the new course
    const courseId = uuidv4();


    // Add the new course to the database for the user
    const uid = AppAuth.getUser()?.uid;
    if(uid) {
      const courseData: CourseSchema = {
        id: courseId,
        owner: uid,
        assignments: [],
        notes: [],
        ...newCourse,
      }
      CoursesDB.addCourseForUser(uid, courseData);
      // Add the new course to the courses array
      setCourses((prevCourses) => [
        ...prevCourses,
        courseData
      ]);
    }

    // Reset the form and hide it
    setNewCourse({
      name: "",
      title: "",
      startDate: "",
      endDate: "",
      professor: "",
      room: "",
    });
    setShowForm(false);
    setShowAddButton(true);
  };

  useEffect(() => {
    // Get the courses for the user
    const uid = AppAuth.getUser()?.uid;
    if(uid) {
      UsersDB.getUserCourses(uid).then((courses) => {
        console.log(courses);
        if(courses) {
          setCourses(courses);
        }
      });
    }
  }, []);

  return (
    <>
      <section className="courses-hero">
        <Container>
          <h1>Upcoming Courses</h1>
          <div className="courses-grid">
            {courses.map((course) => (
              <Card key={course.id}>
                {/* {course.icon} */}
                <h2><strong>{course.name}:</strong> {course.title}</h2>
                <p>{course.startDate} - {course.endDate}</p>
                <p>
                  <span>{course.professor}</span> {course.room}
                </p>
              </Card>
            ))}
          </div>
          {showAddButton && (
            <div className="btn-box">
              <button
                onClick={() => {
                  setShowForm(true);
                  setShowAddButton(false);
                }}
              >
                Add New Course
              </button>
            </div>
          )}
          {showForm && (
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <label>
                  Course Name:
                  <input
                    type="text"
                    value={newCourse.name}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, name: e.target.value })
                    }
                    required
                  />
                </label>
                <label>
                  Course Title:
                  <input
                    type="text"
                    value={newCourse.title}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, title: e.target.value })
                    }
                    required
                  />
                </label>
                <label>
                  Start Date:
                  <input
                    type="text"
                    value={newCourse.startDate}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, startDate: e.target.value })
                    }
                    required
                  />
                </label>
                <label>
                  End Date:
                  <input
                    type="text"
                    value={newCourse.endDate}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, endDate: e.target.value })
                    }
                    required
                  />
                </label>
                <label>
                  Professor:
                  <input
                    type="text"
                    value={newCourse.professor}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, professor: e.target.value })
                    }
                    required
                  />
                </label>
                <label>
                  Room:
                  <input
                    type="text"
                    value={newCourse.room}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, room: e.target.value })
                    }
                    required
                  />
                </label>
                <button type="submit">Add Course</button>
              </form>
            </div>
          )}
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
