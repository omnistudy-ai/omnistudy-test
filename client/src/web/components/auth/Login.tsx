import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../../tools/firebase'; // Adjust the import path as needed
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import AppAuth from '../../../tools/Auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      AppAuth.setUser(user);
      AppAuth.setAuthorized(true);
      navigate('/app');
    } catch (error) {
      console.error("Error with Google sign-in:", error);
      // Handle errors here, such as displaying a notification to the user
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      AppAuth.setUser(userCredential.user);
      AppAuth.setAuthorized(true);
      navigate('/app');
    } catch (error) {
      console.error("Error signing in with email and password", error);
      // Handle errors here, such as displaying a notification to the user
    }
  };

  return (
    <div>
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={(e) => e.preventDefault()}>
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
            Submit
          </a>
          {/* Google Sign-In Button */}
          <button onClick={loginWithGoogle} className="google-sign-in-btn">
            Login with Google
          </button>
          <div className="register-link">
            <p>Don't have an account? <a href={"/register"}>Register here</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
