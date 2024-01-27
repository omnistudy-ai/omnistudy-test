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
  const [progress, setProgress] = useState(0);

  // TODO: Check to see if the assignment exists for the user
  // If it does not, redirect the user to the 404 page
  // const navigate = useNavigate();

  const [courseData, setCourseData] = useState<CourseSchema | null>(null);
  const [assignmentData, setAssignmentData] = useState<AssignmentSchema | null>(null);

  interface ProgressBarProps {
    progress: number;
  }
  
  function ProgressBar({ progress }: ProgressBarProps) {
    return (
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
    );
  }
  
  
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

const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setProgress(parseInt(event.target.value, 10));
};

return (
  <div className="courses-content top-0 left-0 max-w-full w-full">
    <div className="text-left px-5 py-4 bg-stone-100 flex items-center justify-between w-full">
      <span className="text-4xl font-bold text-stone-600">
        {courseData?.number}: {assignmentData?.aname}
      </span>
      <div className="w-full"> {/* Ensure this div takes the full width */}
        <div className="progress-label">
          <span>Progress: {progress}%</span> {/* Displaying the progress text and percentage */}
        </div>
        <ProgressBar progress={progress} />
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          className="slider w-full"
          id="progressSlider"
          onChange={handleSliderChange}
        />
      </div>
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
