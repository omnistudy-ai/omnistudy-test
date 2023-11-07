import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { NavbarData } from "./NavbarData";

import logoImg from "../../assets/OmniStudy-logo2.png";

function Navbar() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    };

    return (
        <div className="sidebar">

            <div className="sidebarLogo">
                <img className="sidebarLogoImg" src={logoImg} alt="" />
                <p className="sidebarLogoText">OmniStudy</p>
            </div>

            <ul className="sidebarList">
                {NavbarData.map((val,key)=>{
                    return (
                        <li 
                        key={ key } 
                        id={  window.location.pathname == val.link ? "active" : "" }
                        className="row" 
                        onClick={() => { 
                            window.location.pathname = val.link 
                        }}
                        >
                            <div id="icon" >{ val.icon }</div>
                            <div id="title" >{ val.title }</div>
                        </li>
                    )
                })}
            </ul>
        </div>
       
    );
} export default Navbar;