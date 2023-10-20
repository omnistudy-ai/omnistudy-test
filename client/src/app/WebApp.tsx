import { Routes, Route } from "react-router-dom";

export default function WebApp() {
    return(
        <div>
            <Routes>
                <Route path="/courses" element={<p>Courses</p>}/>
                <Route path="/assignments" element={<p>Assignments</p>}/>
            </Routes>
        </div>
    );
}