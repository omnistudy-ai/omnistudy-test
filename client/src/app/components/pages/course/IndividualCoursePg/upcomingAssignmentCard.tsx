import { useState, useEffect } from "react";
import AssignmentsDB, { AssignmentSchema } from "../../../../../tools/db/Assignments";
import { Timestamp } from "firebase/firestore";



type PropsType = {
  courseId: string;
};

export const UpcomingAssignments = ({ courseId }: PropsType) => {
  const [assignments, setAssignments] = useState<AssignmentSchema[]>([]);

  useEffect(() => {
    AssignmentsDB.getAllAssignmentsForCourse(courseId)
      .then((data) => {
        console.log("Fetched Data: ", data); // Log the fetched data

        // Update the state with the fetched data
        setAssignments(data);
      })
      .catch(error => {
        console.error("Failed to fetch assignments: ", error);
      });
  }, [courseId]);

  return (
    <div className="p-4 max-w-full">
      <h2 className="text-xl font-semibold mb-2">Upcoming Assignments</h2>
      <div className="space-y-3">
        {assignments.map((assignment) => (
          <div key={assignment.aid} className="flex flex-row justify-between py-1 ml-50 bg-white shadow-md rounded-md p-4">
            <h3 className="text-lg font-bold">{assignment.aname}</h3>

            <p className="text-sm text-gray-600 pl-50">
              Due: {new Date(assignment.dueDate).toLocaleDateString()}
            </p>

            <p className="text-sm text-gray-600">Due Time: {assignment.dueTime}</p>
            {assignment.notes && assignment.notes.length < 20 && assignment.notes.trim() !== '' && (
              <p className="text-sm text-gray-600">Notes: {assignment.notes}</p>
               )}
          </div>
        ))}

        {assignments.length === 0 && <p className="text-sm text-gray-500">No upcoming assignments.</p>}
      </div>
    </div>
  );
};

export default UpcomingAssignments;