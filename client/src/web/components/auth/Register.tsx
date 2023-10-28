import "./Register.css";
import React, { useState } from 'react';

export default function Register() {
    const [dobFocus, setDobFocus] = useState(false); // Already removed the React. prefix since useState is imported

    return (
        <div>
            <div className="register-box">
                <h2>Register</h2>
                <form>
                    <div className="user-box">
                        <input type="text" name="firstName" required />
                        <label>First Name</label>
                    </div>
                    <div className="user-box">
                        <input type="text" name="lastName" required />
                        <label>Last Name</label>
                    </div>
                    <div className="user-box">
                        <input type="tel" name="phoneNumber" required />
                        <label>Phone Number</label>
                    </div>
                    <div className="user-box">
                        <input type="email" name="email" required />
                        <label>Email</label>
                    </div>
                    <div className="user-box">
                        <input type="password" name="password" required />
                        <label>Password</label>
                    </div>
                    <a href="#" className="animated-btn"> 
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Submit
                    </a>
                </form>
            </div>
        </div>
    );
}
