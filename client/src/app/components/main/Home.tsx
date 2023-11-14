import "./Home.css";
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import CourseCard from "./Cards/CourseCard"
import TaskProgress from "./Cards/TaskProgress";
import { StudyTimeTracker } from "./Cards/StudyTimeTracker";


export default function Home() {
    return (
        
        <div className="homepage">
            <h1>Welcome to OmniStudy</h1>
            <p>Your one-stop platform for all your educational needs.</p>
            <div className="card__container">
            <CourseCard courseName="Biology 101" timeSpent={5} timeIncreased={true} />
            <TaskProgress progressBar={75.5} />
            <StudyTimeTracker currentHours={12} goalHours={18} />

            </div>
        </div>
       
    );
}
