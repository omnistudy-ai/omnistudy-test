import "./Register.css";
import React, { useState } from 'react';
import { auth } from '../../../tools/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export default function Register() {    
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");  
    const register = async ()  => {
        try{
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            console.log(user);
        } catch(error:any){
            console.log(error.message);
        }
    };
    return (
        <div>
            <div className="register-box">
                <h2>Register</h2>
                <form>
                    <div className="user-box">
                        <input type="email"  onChange={(event)=>setRegisterEmail(event.target.value)} name="email" required />
                        <label>Email</label>
                    </div>
                    <div className="user-box">
                        <input type="password" onChange={(event)=>setRegisterPassword(event.target.value)} name="password" required />
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
}
