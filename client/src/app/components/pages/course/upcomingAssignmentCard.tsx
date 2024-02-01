import { useState, useEffect } from "react";
import AssignmentsDB, { AssignmentSchema } from "../../../../tools/db/Assignments";

type PropsType = {
  courseId: string;
};

const UpcomingAssignments = ({ courseId }: PropsType) => {
  const [assignments, setAssignments] = useState<AssignmentSchema[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) {
      console.error("Course ID is not provided.");
      setError("Course ID is not provided.");
      return;
    }

    AssignmentsDB.getAllAssignmentsForCourse(courseId)
      .then((data) => {
        console.log("Fetched Data: ", data);
        if (data.length === 0) {
          console.log(`No assignments found for course ID: ${courseId}`);
          setError("No assignments found for this course.");
          return;
        }

        const upcomingAssignments = data.filter(assignment => {
          const dueDate = new Date(assignment.dueDate);
          return dueDate > new Date() && !isNaN(dueDate.getTime()); // Ensure dueDate is valid
        });

        if (upcomingAssignments.length === 0) {
          console.log(`No upcoming assignments found for course ID: ${courseId}`);
          setError("No upcoming assignments.");
        } else {
          setAssignments(upcomingAssignments);
        }
      })
      .catch(err => {
        console.error("Failed to fetch assignments: ", err);
        setError("Failed to fetch assignments.");
      });
  }, [courseId]);

  return (
    <div className="p-4 max-w-full">
      <h2 className="text-2xl font-semibold mb-4">Upcoming Assignments</h2>
      {error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : assignments.length > 0 ? (
        <div className="space-y-3">
          {assignments.map((assignment) => (
            <div key={assignment.aid} className="bg-white shadow-md rounded-md p-4">
              <h3 className="text-lg font-bold">{assignment.aname}</h3>
              <p className="text-sm text-gray-600">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
              {/* Add more details or actions for each assignment */}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">Fetching assignments...</p>
      )}
    </div>
  );
};

export default UpcomingAssignments;
