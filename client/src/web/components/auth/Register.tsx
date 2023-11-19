// Register.tsx

import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../tools/firebase'; // Adjust the import path as needed
import AppAuth from '../../../tools/Auth';
import { useNavigate } from "react-router-dom";
import UsersDB from '../../../tools/db/Users'; // Adjust the import path as needed
import "./Register.css";

const Register: React.FC = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");  
    const navigate = useNavigate();

    const register = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            const user = userCredential.user;

            // Create a user object to add to Firestore
            const newUser = {
                id: user.uid,
                firstName: firstName,
                lastName: lastName,
                name: user.displayName,
                phoneNumber: phoneNumber,
                email: registerEmail, // Or use user.email to get the email from the authentication object
                courses: [], // Assuming new users do not have courses initially
                assignments: [], // Assuming new users do not have assignments initially
                createdAt: new Date().toISOString(),
                plan: "free"
            };

            // Set the user as authorized
            AppAuth.setUser(user);
            AppAuth.setAuthorized(true);

            // Use UsersDB to add the user to Firestore
            await UsersDB.addUser(newUser);

            navigate("/app");
        } catch (error) {
            console.error("Error registering new user:", error);
        }
    };

    return (
        <div>
            <div className="register-box">
                <h2>Register</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="user-box">
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                        <label>First Name</label>
                    </div>
                    <div className="user-box">
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                        <label>Last Name</label>
                    </div>
                    <div className="user-box">
                        <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                        <label>Phone Number</label>
                    </div>
                    <div className="user-box">
                        <input type="email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} required />
                        <label>Email</label>
                    </div>
                    <div className="user-box">
                        <input type="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} required />
                        <label>Password</label>
                    </div>
                    <a href="#!" onClick={register} className="animated-btn"> 
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
};

export default Register;
