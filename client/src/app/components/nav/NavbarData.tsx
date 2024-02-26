// this is NavbarData.tsx
// import HomeIcon from '@mui/icons-material/Home';
import CourseIcon from '@mui/icons-material/School';
import AssignmentsIcon from '@mui/icons-material/Grading';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ScheduleIcon from '@mui/icons-material/Schedule';
import EventIcon from '@mui/icons-material/Event';
import ClassIcon from '@mui/icons-material/Class';


export const NavbarData = [
    {
        title: "Course",
        icon: <CourseIcon />,
        link: "/app/courses"
    },    
    {
        title: "Assignments",
        icon: <AssignmentsIcon />,
        link: "/app/assignments"
    },    
    // {
    //     title: "Events",
    //     icon: <EventIcon />,
    //     link: "/app/events"
    // },
    {
        title: "Schedule",
        icon: <ScheduleIcon />,
        link: "/app/schedule"
    },
]