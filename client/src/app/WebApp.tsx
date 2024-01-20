// Package imports
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Page imports
import Dashboard from "./components/main/Dashboard";
import Assignment from "./components/pages/course/Assignment";
import Assignments from "./components/pages/course/Assignments";
import Course from "./components/pages/course/Course";
import Courses from "./components/pages/course/Courses";
import Schedule from "./components/pages/schedule/Schedule";
import Settings from "./components/pages/misc/Settings";
import SpeechToText from "./components/pages/features/SpeechToText";
import NoteTaker from "./components/pages/features/NoteTaker";
import NotFound404 from "./NotFound404";

// Component imports
import NavbarNorth from "./components/nav/NavbarNorth";
import Navbar from "./components/nav/Navbar";
import DocQA from "./components/DocQA";

// Utility imports
import AppAuth from "../tools/Auth";
// import Footer from "../web/components/footer/Footer";
import "./WebApp.css";

export default function WebApp() {
  // Ensure the user is logged in before displaying any of the routes below
  // If the user is not logged in, redirect them to the login page
  const navigate = useNavigate();

  useEffect(() => {
    if (AppAuth.getAuth().authorized === false) {
      navigate("/login");
    }
  });

  return (
    <div className="web-app flex flex-col relative">

      {/* Top navbar */}
      <div className="w-full sticky top-0 left-0 z-50">
        <NavbarNorth/>
      </div>

      <div className="app-content grid"
        style={{ gridTemplateColumns: "250px 1fr" }}
      >
        <Navbar></Navbar>
        <div className="app-content-without-navbar">
          <Routes>
            {/* Show the application dashboard */}
            <Route path="/" element={<Dashboard />} />
            {/* Display all the courses to the user */}
            <Route path="/courses" element={<Courses />} />
            {/* Display information about a specific course to the user */}
            <Route path="/courses/:cid" element={<Course />} />
            {/* Display all assignments to the user */}
            <Route path="/assignments" element={<Assignments />} />
            {/* Display information about an assignment for a specific course */}
            <Route path="/courses/:cid/assignments/:aid" element={<Assignment />} />
            {/* Display the user's schedule */}
            <Route path="/schedule" element={<Schedule/>} />
            {/* Display user and application settings */}
            <Route path="/settings" element={<Settings />} />
            {/* Testing document question and answering */}
            <Route path="/doc-qa" element={<DocQA />} />
            {/* Testing speech to text */}
            <Route path="/speech-to-text" element={<SpeechToText />} />
            {/* Testing note taking */}
            <Route path="/note-taker" element={<NoteTaker/>}></Route>
            {/* Display a 404 error for all routes not listed above */}
            <Route path="/*" element={<NotFound404 />} />
          </Routes>
        </div>
      </div>

    </div>
  );
}
