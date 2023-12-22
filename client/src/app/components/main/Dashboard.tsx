import "./Dashboard.css";
import CourseCard from "./Cards/CourseCard"
import TaskProgress from "./Cards/TaskProgress";
import { StudyTimeTracker } from "./Cards/StudyTimeTracker";


export default function Dashboard() {
    return (
        <div className="home-container">
            <h1>Welcome Back!</h1>
            <div className="card__container">
            <CourseCard courseName="Biology 101" timeSpent={5} timeIncreased={true} />
            <TaskProgress progressBar={75.5} />
            <StudyTimeTracker currentHours={12} goalHours={18} />
            

            </div>
            {/* Wont let me import chartJs so I used a placeholder library till I fix */}
            {/* <div className="GradesBar">
            <GradesBar grades={userGrades} />
            </div> */}
        </div>
       
    );
}
