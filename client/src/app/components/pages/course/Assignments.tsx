<<<<<<< HEAD
import { Avatar, CardContent, Stack, SvgIcon, Typography, Grid } from '@mui/material';
import Card from '../../../../web/components/UI/Card';
import './Assignments.css';

interface AssignmentsCard {
    courseName: string;
    assignmentName: string;
    dueDate: Date;
}
//sample date format
// Dummy data for assignments
const assignments = Array(5).fill({ assignmentName: "Assignment Name", dueDate: "Due Date" });


export default function Assignments() {
    return (
        <div className='main-container'>
            {/* Course Name */}
            <h1>Course Name</h1>
            
            <Card className='assignCard'>
                <CardContent>
                    {assignments.map((assignment, index) => (
                        <div key={index}>
                            <Typography variant="body1" className="text-padding text-margin">
                                {assignment.assignmentName}
                            </Typography>
                            <Typography variant="body2" className="text-padding text-margin">
                                {assignment.dueDate}
                            </Typography>
                        </div>
                    ))}
                </CardContent>
            </Card>
          

            {/* Second Card */}
            <Card className='notesCard'>
                <CardContent>
                    <Typography variant="h6" className="text-padding text-margin">
                           {/* Notes */}
                           Course Name
                           
                    </Typography>
                    <Typography variant="body1" className="text-padding text-margin">
                        {/* {course2.assignmentName} */}
                        </Typography>
                    <Typography variant="body2" className="text-padding text-margin">
                        {/* {course2.dueDate} */}
                        </Typography>
                </CardContent>
            </Card>
        </div>
    );
    
}
=======

import AssignmentsDB, { AssignmentSchema } from "../../../../tools/db/Assignments";
import { useState, useEffect } from "react";
import AppAuth from "../../../../tools/Auth";
import AssignmentsModal from "./AssignmentsModal";

function Assignments() {

  const [assignments, setAssignments] = useState<AssignmentSchema[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const uid = AppAuth.getAuth()?.user.uid;
    if(uid) {
      // Get assignments for the user
      AssignmentsDB.getAllAssignmentsForUser(uid).then((assignments) => {
        setAssignments(assignments);
        console.log(assignments);
      });
    }
  }, []);

  return(
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

      {/* Top row under header with numbers cards */}
      <div className="numbers-cards flex flex-row p-8 gap-8">
        {/* Total assignments */}
        <div className="bg-white text-stone-600 w-40 rounded-xl shadow flex flex-col justify-center items-center p-6">
          <div className="mb-4">
            <span className="text-2xl font-bold">Total</span>
          </div>
          <div className="card-body">
            <span className="text-6xl font-bold">{assignments.length}</span>
          </div>
        </div>

        {/* Overdue assignments */}
        <div className="bg-white text-stone-600 w-40 rounded-xl shadow flex flex-col justify-center items-center p-6">
          <div className="card-header mb-4">
            <span className="text-2xl font-bold">Overdue</span>
          </div>
          <div className="card-body">
            <span className="text-6xl font-bold">{assignments.filter((assignment) => new Date(assignment.dueDate) < new Date()).length}</span>
          </div>
        </div>
      </div>

      {/* All assignments container */}
      <div className="all-assignments p-8 pt-0">
        <div className="all-assignments-wrapper bg-white rounded-xl p-4 flex flex-col">
          <span className="text-left text-2xl font-bold mb-2 text-stone-500">Assignments</span>
          {assignments.map((assignment: AssignmentSchema) => {
            return <a href={`/app/courses/${assignment.cid}/assignments/${assignment.aid}`}>
              <div className="flex flex-row items-center justify-center text-left gap-y-3 border-b p-3 rounded-t-lg hover:bg-stone-50">
                <div className="text mr-auto">
                  {new Date(assignment.dueDate) < new Date() ? <span className="font-mono gap-1 text-sm mb-2 p-2 shadow bg-stone-100 text-red-500 flex w-fit justify-center items-center rounded-lg">
                    <img 
                      src="/warning.png"
                      height="18px"
                      width="18px"
                    />
                    Overdue
                  </span> : null}
                  <span className="text-stone-500">{assignment.aname}</span><br/>
                  <span className="text-xs text-stone-400">{assignment.cname.slice(0, 34)}...</span>
                </div>
                <div className="progress text-stone-500">100%</div>
              </div>
            </a>
          })}
        </div>
      </div>
    </div>
  );
}

export default Assignments;
>>>>>>> main
