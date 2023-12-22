import React, { useEffect, useState } from "react";
import Container from "../../../../web/components/UI/Container";
import ComputerIcon from "@mui/icons-material/Computer";
import PersonIcon from "@mui/icons-material/Person";
import "./Courses.css";
import { v4 as uuidv4 } from "uuid";

import UsersDB from "../../../../tools/db/Users";
import CoursesDB, { CourseSchema } from "../../../../tools/db/Courses";
import AssignmentsDB, { AssignmentSchema } from "../../../../tools/db/Assignments";
import ExamsDB, { ExamSchema } from "../../../../tools/db/Exams";
import AppAuth from "../../../../tools/Auth";
import CourseCard from "./CourseCard";

export default function Courses() {

  // Get all courses for the user
  const [courses, setCourses] = useState<Array<CourseSchema>>([]);
  // Get all assignments for the user
  const [assignments, setAssignments] = useState<Array<any>>([]);
  // Get all exams for the user
  const [exams, setExams] = useState<Array<any>>([]);

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
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    // Generate a random id for the new course
    const courseId = uuidv4();

    // Add the new course to the database for the user
    const uid = AppAuth.getAuth()?.user.uid;
    console.log("uid: ", uid);
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
    // Confirm the user is logged in before getting data
    const uid = AppAuth.getAuth()?.user.uid;
    if(uid) {
      // Get courses for the user
      UsersDB.getUserCourses(uid).then((courses) => {
        if(courses) setCourses(courses);
      });
      // Get assignments for the user
      AssignmentsDB.getAllAssignmentsForUser(uid).then((assignments) => {
        setAssignments(assignments);
        console.log(assignments);
      });
      // Get exams for the user
      ExamsDB.getAllExamsForUser(uid).then((exams) => {
        setExams(exams);
      });
    }
  }, []);

  return (
    <div className="courses-content top-0 left-0 max-w-full">
      {/* Header title and button */}
      <div className="text-left border-b-[1px] border-stone-300 px-5 py-4 bg-stone-100 flex items-center">
        <span className="text-4xl font-bold mr-auto text-stone-600">Your Courses</span>
        <button className="bg-cyan-500 px-3 py-2 text-sm rounded-md text-stone-100 font-bold hover:bg-cyan-600 duration-200">Add New Course</button>
      </div>

      {/* Courses cards container */}
      <div className="courses-cards bg-stone-100 flex flex-row p-8 gap-8 flex-wrap">
        {courses.map((course) => {
          return <CourseCard course={course} />
        })}
      </div>

      {/* Upcoming assignments and exams card */}
      <div 
        className="assignments-and-exams grid gap-8 p-8 pt-4 bg-stone-100"
        style={{ gridTemplateColumns: "1.6fr 1fr" }}
      >

        {/* Upcoming assignments */}
        <div>
          <div className="upcoming-assignments bg-white rounded-xl shadow">
            <div className="header flex px-5 py-3 justify-center items-center">
              <span className="mr-auto font-bold text-xl">Upcoming Assignments</span>
              <button className="text-cyan-500 hover:text-cyan-600 duration-200"><a href="/app/assignments">View All</a></button>
            </div>
            <div id="upcoming-assignments" className="assignments flex flex-col gap-y-4 px-5 pb-4 pt-0">
              {assignments.map((assignment: AssignmentSchema) => {
                return <a href={`/assignments/${assignment.aid}`}>
                  <div className="flex flex-row items-center justify-center text-left gap-y-3">
                    <div className="text mr-auto">
                      <span className="text-stone-500">{assignment.aname}</span><br/>
                      <span className="text-xs text-stone-400">{assignment.cname.slice(0, 34)}...</span>
                    </div>
                    <div className="progress text-stone-500">100%</div>
                  </div>
                </a>
              })}
            </div>
          </div>
        </div>

        {/* Upcoming exams */}
        <div>
          <div className="upcoming-exams bg-white rounded-xl">
            <div className="header flex px-5 py-3 justify-center items-center">
              <span className="mr-auto font-bold text-xl">Upcoming Exams</span>
              <button className="text-cyan-500 hover:text-cyan-600 duration-200"><a href="/app/exams">View All</a></button>
            </div>
            <div className="exams">
            </div>
          </div>
        </div>

      </div>

      <section className="courses-hero">
        <Container>
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
              <form>
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
                <button type="submit" onClick={(e) => handleSubmit(e)}>Add Course</button>
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
            <div className="progress-className">
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
            <div className="progress-className">
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
            <div className="progress-className">
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
            <div className="progress-className">
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
    </div>
  );
}
