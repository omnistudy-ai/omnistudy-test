import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../../tools/firebase';
import AppAuth, { SignInMethod } from '../../../tools/Auth';
import { useNavigate } from "react-router-dom";
import UsersDB from '../../../tools/db/Users';
import "./Register.css";

const Register: React.FC = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");  
    const navigate = useNavigate();

    const googleProvider = new GoogleAuthProvider();

    const isValidEmail = (email: string) => {
        return email.includes('@');
    };

    const isValidPassword = (password: string) => {
        return password.length >= 6;
    };

    const isValidPhoneNumber = (phone: string) => {
        return phone.replace(/\D/g, '').length >= 10;
    };
    

    const registerWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            const newUser = {
                id: user.uid,
                firstName: user.displayName?.split(" ")[0]!, 
                lastName: user.displayName?.split(" ")[1]!, 
                phoneNumber: user.phoneNumber!,
                email: user.email!,
                courses: [], 
                assignments: [], 
                createdAt: new Date().toISOString(),
                plan: "free"
            };
            AppAuth.authorize(user, SignInMethod.Google);
            await UsersDB.addUser(newUser);
    
            navigate("/app");
        } catch (error) {
            console.error("Error with Google sign-in:", error);
        }
    };
    
    const register = async () => {
        if (!isValidEmail(registerEmail)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (!isValidPassword(registerPassword)) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        if (!isValidPhoneNumber(phoneNumber)) {
            alert("Please enter a valid phone number.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            const user = userCredential.user;

            const newUser = {
                id: user.uid,
                firstName: firstName,
                lastName: lastName,
                name: user.displayName,
                phoneNumber: phoneNumber,
                email: registerEmail,
                courses: [],
                assignments: [],
                createdAt: new Date().toISOString(),
                plan: "free"
            };

            AppAuth.authorize(user, SignInMethod.Email);
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
                    {/* User input fields */}
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
                <button onClick={registerWithGoogle} className="google-sign-in-btn">
                    Register with Google
                </button>
            </div>
        </div>
    );
};

export default Register;
