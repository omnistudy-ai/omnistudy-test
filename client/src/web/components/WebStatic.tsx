import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import About from "./About/About";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";

export default function WebStatic() {
    return(
        <div>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/about" element={<About/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
            </Routes>
        </div>
    );
}