import HomeIcon from '@mui/icons-material/Home';
import CourseIcon from '@mui/icons-material/School';
import AssignmentsIcon from '@mui/icons-material/Grading';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';


export const NavbarData = [
    {
        title: "Welcome",
        icon: <HomeIcon />,
        link: "/app"
    },
    {
        title: "Dashboard",
        icon: <DashboardIcon />,
        link: "/app/dashboard"
    },
    {
        title: "Course",
        icon: <CourseIcon />,
        link: "/app/Course"
    },    
    {
        title: "Assignments",
        icon: <AssignmentsIcon />,
        link: "/app/Assignments"
    },    
    {
        title: "Settings",
        icon: <SettingsIcon />,
        link: "/app/Settings"
    },    
    {
        title: "Logout",
        icon: <LogoutIcon />,
        link: "/logout"
    },
]