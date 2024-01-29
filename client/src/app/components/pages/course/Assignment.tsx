import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CoursesDB, { CourseSchema } from "../../../../tools/db/Courses";
import AssignmentsDB, { AssignmentSchema } from "../../../../tools/db/Assignments";
import "./Assignment.css";

// Define the type of the URL parameters
type ParamsType = {
  cid: string;
  aid: string;
};

export default function Assignment() {
  const params = useParams<ParamsType>();
  const [progress, setProgress] = useState(0);
  const [courseData, setCourseData] = useState<CourseSchema | null>(null);
  const [assignmentData, setAssignmentData] = useState<AssignmentSchema | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (params.cid) {
      CoursesDB.getCourseById(params.cid).then((course) => {
        if (course) {
          setCourseData(course);
          AssignmentsDB.getAssignmentById(params.aid!).then((assignment) => {
            if (assignment) {
              setAssignmentData(assignment);
            }
          });
        }
      });
    }
  }, [params.cid, params.aid]);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(parseInt(event.target.value, 10));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles([...files, ...Array.from(event.target.files)]);
    }
  };

  const handleFileUpload = () => {
    files.forEach((file) => {
      if (assignmentData) {
        AssignmentsDB.uploadFileAndUpdateAssignment(assignmentData.aid, file)
          .then(() => {
            console.log("File uploaded successfully.");
            // Optionally, handle the state update or notifications here
          })
          .catch((error) => {
            console.error("Error uploading file: ", error);
          });
      }
    });
  };

  return (
    <div className="courses-content">
      <div className="text-left px-5 py-4 bg-stone-100 flex items-center justify-between w-full">
        <span className="text-4xl font-bold text-stone-600">
          {courseData?.number}: {assignmentData?.aname}
        </span>
        <div className="w-full">
          <div className="progress-label">
            <span>Progress: {progress}%</span>
          </div>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
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
      <div className="file-upload-section">
        <input type="file" onChange={handleFileChange} multiple />
        <button onClick={handleFileUpload}>Upload Files</button>
      </div>
    </div>
  );
}
