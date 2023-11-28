// Package imports
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Page imports
import Dashboard from "./components/main/Dashboard";
import Assignment from "./components/pages/course/Assignment";
import Assignments from "./components/pages/course/Assignments";
import Course from "./components/pages/course/Course";
import Courses from "./components/pages/course/Courses";
import Settings from "./components/pages/misc/Settings";
import NotFound404 from "./NotFound404";

// Component imports
import Navbar from "./components/nav/Navbar";
import DocQA from "./components/DocQA";

// Utility imports
import AppAuth from "../tools/Auth";
import Footer from "../web/components/footer/Footer";

export default function WebApp() {
  // Ensure the user is logged in before displaying any of the routes below
  // If the user is not logged in, redirect them to the login page
  const navigate = useNavigate();

  useEffect(() => {
    if (AppAuth.getAuthorized() === false) {
      navigate("/login");
    }
  });

  return (
    <div className="web-app">
      <Navbar></Navbar>

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

        {/* Display user and application settings */}
        <Route path="/settings" element={<Settings />} />

        {/* Testing document question and answering */}
        <Route path="/doc-qa" element={<DocQA />} />

        {/* Display a 404 error for all routes not listed above */}
        <Route path="/*" element={<NotFound404 />} />
      </Routes>
    </div>
  );
}
