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