// Package imports
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CoursesDB, { CourseSchema } from "../../../../tools/db/Courses";
import AssignmentsDB, { AssignmentSchema } from "../../../../tools/db/Assignments";

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
  const [assignmentData, setAssignmentData] = useState<AssignmentSchema | null>(null);

  useEffect(() => {
    // Make sure course ID is present
    if(params.cid) {
        // Get the course data
        console.log(params.cid);
        CoursesDB.getCourseById(params.cid).then((courseData) => {
            // Check if the course exists, else redirect to 404
            if(courseData) {
                setCourseData(courseData);

                // Get assignment data
                AssignmentsDB.getAssignmentById(params.aid!).then((assignmentData) => {
                    // Check if the assignment exists, else redirect to 404
                    if(assignmentData) {
                        setAssignmentData(assignmentData);
                    }
                });
            }
        });
    }
}, [params.cid]); 

  return (
    <div className="courses-content top-0 left-0 max-w-full">
      {/* Header title and button */}
      <div className="text-left border-b-[1px] border-stone-300 px-5 py-4 bg-stone-100 flex items-center">
        <span className="text-4xl font-bold mr-auto text-stone-600">{courseData?.number}: {assignmentData?.aname}</span>
      </div>
    </div>
  );
}

// --------- OBJECT TYPE DEFINITIONS --------- //

// Define the type of the URL parameters
type ParamsType = {
  cid: string;
  aid: string;
};
