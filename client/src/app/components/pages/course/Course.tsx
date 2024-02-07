// Package imports
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Course.css";
import { useNavigate } from "react-router-dom";





// Utility imports
import CoursesDB, { CourseSchema } from "../../../../tools/db/Courses";
import CourseNotes from "./IndividualCoursePg/CourseNotes";
import UpcomingAssignments from "./IndividualCoursePg/upcomingAssignmentCard";
import NextEvent from "./IndividualCoursePg/NextEvent";


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
                <h2 className="text text-left">Course {courseData?.number} - {courseData?.title}</h2>
            </div>
            {/* List out all uploaded notes and most recently uploaded first */}
            <CourseNotes />
            <UpcomingAssignments courseId={params.cid || ''} />
            <NextEvent courseId={params.cid || ''} />
    </div>
       
    )
}

// --------- OBJECT TYPE DEFINITIONS --------- //

// Define the type of the URL parameters
type ParamsType = {
    cid: string
}