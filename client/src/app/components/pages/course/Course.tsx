// Package imports
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Course.css";
import { useNavigate } from "react-router-dom";

// Utility imports
import CoursesDB, { CourseSchema } from "../../../../tools/db/Courses";

export default function Course() {

    // Get URL parameters
    // cid: course ID
    const params = useParams<ParamsType>();

    // Store the course data
    const [courseData, setCourseData] = useState<CourseSchema | null>(null);

    // Navigation hook
    const navigate = useNavigate();

    useEffect(() => {
        // Make sure course ID is present
        if(params.cid) {
            // Get the course data
            console.log(params.cid);
            CoursesDB.getCourseById(params.cid).then((courseData) => {
                // Check if the course exists, else redirect to 404
                if(courseData) 
                    setCourseData(courseData);
                else 
                    navigate("/404");
            });
        }
    }, [navigate, params.cid]); 

    return(
        <div className="course-page">
            <div className="header text-left">
                <h2 className="text text-left">Course {courseData?.name} - {courseData?.title}</h2>
            </div>
        </div>
    )
}

// --------- OBJECT TYPE DEFINITIONS --------- //

// Define the type of the URL parameters
type ParamsType = {
    cid: string
}