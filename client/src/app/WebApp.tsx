// Package imports
import { Routes, Route, useNavigate } from "react-router-dom";

// Component imports
import Home from "./components/main/Home";
import Assignment from "./components/task_tracking/Assignment";
import Assignments from "./components/task_tracking/Assignments";
import Course from "./components/task_tracking/Course";
import Courses from "./components/task_tracking/Courses";
import NotFound404 from "../404";
import DocQA from "./components/DocQA";

// Utility imports
import { AppAuth } from "../tools/Auth";

export default function WebApp() {

    // Ensure the user is logged in before displaying any of the routes below
    // If the user is not logged in, redirect them to the login page
    const navigate = useNavigate();
    // DEV MODE: Set to true to skip the login check
    if(AppAuth.getAuthorized() /* === false */) { 
        navigate("/login"); 
    }

    return(
        <div>
            <Routes>
                {/* Show the application dashboard */}
                <Route path="/" element={<Home/>}/>

                {/* Display all the courses to the user */}
                <Route path="/courses" element={<Courses/>}/>

                {/* Display information about a specific course to the user */}
                <Route path="/courses/:cid" element={<Course/>}/>

                {/* Display all assignments to the user */}
                <Route path="/assignments" element={<Assignments/>}/>

                {/* Display information about an assignment for a specific course */}
                <Route path="/courses/:cid/assignments/:aid" element={<Assignment/>}/>

                {/* Testing document question and answering */}
                <Route path="/doc-qa" element={<DocQA/>}/>

                {/* Display a 404 error for all routes not listed above */}
                <Route path="/*" element={<NotFound404/>}/>
            </Routes>
        </div>
    );
}