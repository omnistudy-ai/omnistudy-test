import React, { useState, useEffect } from "react";
import AssignmentsDB, { AssignmentSchema } from "../../../../tools/db/Assignments";
import AppAuth from "../../../../tools/Auth";
import AssignmentsModal from "./AssignmentsModal";
import { Link } from 'react-router-dom';

function Assignments() {
  // State for assignments list
  const [assignments, setAssignments] = useState<AssignmentSchema[]>([]);
  // State to control the visibility of the modal form
  const [showForm, setShowForm] = useState(false);

  // Effect to fetch assignments on component mount
  useEffect(() => {
    const uid = AppAuth.getAuth()?.user.uid;
    if (uid) {
      // Get assignments for the user
      AssignmentsDB.getAllAssignmentsForUser(uid).then((assignments) => {
        setAssignments(assignments);
      });
    }
  }, []);

  // Function to handle assignment deletion
  const deleteAssignment = async (aid: string, cid: string) => {
    const isConfirmed = window.confirm("Deleting this assignment cannot be undone. Are you sure you want to proceed?");
    if (!isConfirmed) {
      return; 
    }
    try {
      // Calls the delete method from AssignmentsDB and updates the local state
      await AssignmentsDB.deleteAssignment(aid, cid);
      setAssignments(assignments.filter(assignment => assignment.aid !== aid));
    } catch (error) {
      console.error("Failed to delete assignment:", error);
    }
  };

  return (
    <div className="assignments-page courses-content top-0 left-0 max-w-full">
      <AssignmentsModal show={showForm} setShow={setShowForm} assignments={assignments} setAssignments={setAssignments} />
  
      {/* Header title and button */}
      <div className="text-left border-b-[1px] border-stone-300 px-5 py-4 bg-stone-100 flex items-center">
        <span className="text-4xl font-bold mr-auto text-stone-600">Your Assignments</span>
        <button 
          className="bg-cyan-500 px-3 py-2 text-sm rounded-md text-stone-100 font-bold hover:bg-cyan-600 duration-200"
          onClick={() => setShowForm(!showForm)}
        >
          Add New
        </button>
      </div>
  
      {/* Assignments list */}
      <div className="all-assignments p-8 pt-0">
        <div className="all-assignments-wrapper bg-white rounded-xl p-4 flex flex-col">
          <span className="text-left text-2xl font-bold mb-2 text-stone-500">Assignments</span>
          {assignments.map((assignment: AssignmentSchema) => (
            <div key={assignment.aid} className="flex flex-row items-center justify-between text-left gap-y-3 border-b p-3 rounded-t-lg hover:bg-stone-50">
              <a href={`/app/courses/${assignment.cid}/assignments/${assignment.aid}`} className="flex-grow" onClick={(e) => e.stopPropagation()}>
                <div className="text mr-auto">
                  {new Date(assignment.dueDate * 1000) < new Date() && <span className="font-mono text-sm mb-2 p-2 shadow bg-stone-100 text-red-500 flex w-fit justify-center items-center rounded-lg">Overdue</span>}
                  <span className="font-bold text-stone-500">Assignment: {assignment.aname}</span><br/>
                  <span className="text-stone-400">Course: {assignment.cname.slice(0, 34)}...</span>
                </div>
                <div className="text-stone-400">Progress: {assignment.progress}%</div>
              </a>
              <button
                className="delete-assignment bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const isConfirmed = window.confirm("Deleting this assignment cannot be undone. Are you sure you want to proceed?");
                  if (isConfirmed) {
                    deleteAssignment(assignment.aid, assignment.cid);
                  }
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
}

export default Assignments;
