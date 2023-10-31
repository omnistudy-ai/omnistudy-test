// Package imports
import { Routes, Route } from "react-router-dom";

// Component imports
import Home from "./components/pages/Home"
import About from "./components/pages/About";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import NotFound404 from "../404";
import Pricing from "./components/pages/Pricing";

export default function WebStatic() {
    return(
        <div>
            <Routes>
                {/* Show the homepage of the website */}
                <Route path="/" element={<Home/>}></Route>

                {/* Show the about page of the website */}
                <Route path="/about" element={<About/>}></Route>

                {/* Show the login page to the user */}
                <Route path="/login" element={<Login/>}></Route>

                {/* Show the pricing page to the user */}
                <Route path="/pricing" element={<Pricing/>}></Route>

                {/* Show the register page to the user */}
                <Route path="/register" element={<Register/>}></Route>

                {/* Display a 404 error for all routes not listed above */}
                <Route path="/*" element={<NotFound404/>}></Route>
            </Routes>
        </div>
    );
}