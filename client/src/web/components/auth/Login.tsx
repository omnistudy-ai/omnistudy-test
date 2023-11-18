import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../tools/firebase'; // Adjust the import path as needed
import "./Login.css";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      // This will sign in the user with the email and password provided
      await signInWithEmailAndPassword(auth, email, password);
      // Navigate to your desired route after successful login
      navigate('/dashboard');
    } catch (error) {
      console.error("Error signing in with email and password", error);
      // Handle errors here, such as displaying a notification to the user
    }
  };

  return (
    <div>
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="user-box">
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          <a href="#!" onClick={handleLogin} className="animated-btn"> 
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </a>
          <div className="register-link">
            <p>Don't have an account? <a href={"/register"}>Register here</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}
