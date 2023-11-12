// this is NavbarData.tsx
import HomeIcon from '@mui/icons-material/Home';
import CourseIcon from '@mui/icons-material/School';
import AssignmentsIcon from '@mui/icons-material/Grading';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';


export const NavbarData = [
    {
        title: "Dashboard",
        icon: <DashboardIcon />,
        link: "/app"
    },
    {
        title: "Course",
        icon: <CourseIcon />,
        link: "/app/Courses"
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