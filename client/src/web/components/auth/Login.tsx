import React, { useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../tools/firebase';
import AppAuth, { SignInMethod } from '../../../tools/Auth';
import { useNavigate } from "react-router-dom";
import typewriterTexts from "./typewriter.json";
import "./Login.css";

const Login: React.FC = () => {

    // Login email form value handling
    const [loginEmail, setLoginEmail] = useState("");
    const [showLoginEmailPlaceholder, setShowLoginEmailPlaceholder] = useState(true);

    // Login password form value handling
    const [loginPassword, setLoginPassword] = useState(""); 
    const [showLoginPasswordPlaceholder, setShowLoginPasswordPlaceholder] = useState(true);

    // Checkbox 'remember me' reference
    const checkboxRef = React.useRef<HTMLInputElement>(null);

    // Random 'welcome to' text
    const [typewriterText, setTypewriterText] = useState<string>("AI-powered study partner!");

    const navigate = useNavigate();
    const googleProvider = new GoogleAuthProvider();

    // Check that the email is valid 
    const isValidEmail = (email: string) => {
        return email.includes('@') && email.includes('.');
    };

    // Check that the password is valid
    const isValidPassword = (password: string) => {
        return password.length >= 8 && password.length < 15;
    };
    

    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            AppAuth.authorize(user, SignInMethod.Google);
            navigate("/app/courses");
        } catch (error) {
            console.error("Error with Google sign-in:", error);
        }
    };
    
    const login = async () => {
        if (!isValidEmail(loginEmail)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (!isValidPassword(loginPassword)) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            const user = userCredential.user;

            AppAuth.authorize(user, SignInMethod.Email);
            navigate("/app/courses");
        } catch (error) {
            console.error("Error registering new user:", error);
        }
    };

    function updateTypewriterText() {
        const interval = setInterval(() => {
            setTypewriterText(typewriterTexts[Math.floor(Math.random() * typewriterTexts.length)]);
        }, 4500);
    }

    useEffect(() => {
        updateTypewriterText();
    }, []);

    return (
        <section className="h-screen bg-slate-100">
        <div className="container h-full px-6 py-24">
            <div className="flex flex-col h-full items-center justify-center lg:justify-between">

                {/* Logo */}
                <div className="flex flex-col">
                    <div className="flex flex-row justify-center items-center">
                        <img
                            src="logo_blue.png"
                            alt=""
                            className="w-[4rem] h-[4rem] mr-4 mt-1"
                        />
                        <h3 className="text-5xl text-cyan-500 font-mono font-bold">OmniStudy</h3>
                    </div>
                    <div>
                        <span className="typewriter-wrapper text-stone-500 lg:text-2xl md:text-xs font-mono mt-2 grid">
                            <span>Welcome back to your</span> 
                            <span className="flex justify-center items-center">
                                <span className="typewriter text-cyan-500">
                                    {typewriterText}
                                </span>
                            </span>
                        </span>
                    </div>
                </div>

                <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                    {/* Page art */}
                    <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
                        <img
                        src="register_art.png"
                        className="w-full"
                        alt="Register image" />
                    </div>
                    {/* Page form */}
                    <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
                        <h1 className="text-left mb-5 text-2xl font-bold text-stone-500">Sign in to your account</h1>
                        <form onSubmit={(e) => e.preventDefault()}>
                            {/* Email input */}
                            <div className="relative mb-6" data-te-input-wrapper-init>
                                <input
                                    type="text"
                                    className="peer block min-h-[auto] w-full rounded border-2 border-stone-300 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-stone-400 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                    id="exampleFormControlInput3"
                                    placeholder="Email address"
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    onBlur={(e) => {
                                        setShowLoginEmailPlaceholder(loginEmail == "")
                                    }}
                                />
                                {loginEmail == "" || showLoginEmailPlaceholder ? <label
                                    htmlFor="exampleFormControlInput3"
                                    className="pointer-events-none bg-slate-100 border-t-2 border-stone-300 px-2 absolute text-slate-500 left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:border-slate-100 peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-stone-400 dark:peer-focus:text-primary"
                                >
                                    Email address
                                </label> : null}
                            </div>
                            {/* Password input */}
                            <div className="relative mb-6" data-te-input-wrapper-init>
                                <input
                                    type="password"
                                    className="peer block min-h-[auto] w-full rounded border-2 border-stone-300 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-stone-400 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                    id="exampleFormControlInput33"
                                    placeholder="Password"
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    onBlur={(e) => {
                                        setShowLoginPasswordPlaceholder(loginPassword == "")
                                    }}
                                />
                                {loginPassword == "" || showLoginPasswordPlaceholder ? <label
                                    htmlFor="exampleFormControlInput33"
                                    className="pointer-events-none bg-slate-100 border-t-2 border-stone-300 px-2 absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:border-slate-100 peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-stone-400 dark:peer-focus:text-primary"
                                >
                                    Password
                                </label> : null}
                            </div>
                            <div className="mb-5 flex items-center justify-between">
                                {/* Remember me checkbox */}
                                <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                                    <input
                                        className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-stone-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-cyan-600 checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_5px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-stone-400 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                        type="checkbox"
                                        value=""
                                        id="exampleCheck3"
                                        ref={checkboxRef}
                                    />
                                    <label
                                        className="inline-block pl-[0.15rem] hover:cursor-pointer text-stone-500 text-left"
                                        htmlFor="exampleCheck3">
                                        Remember me
                                    </label>
                                </div>
                                {/* Forgot password link */}
                                <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                                    <a
                                      className="inline-block pl-[0.15rem] hover:cursor-pointer text-cyan-600 text-left"
                                      href={"/forgot-password"}
                                    >
                                        Forgot password
                                    </a>
                                </div>
                            </div>

                            {/* Login button */}
                            <button
                                type="submit"
                                className="bg-cyan-500 hover:bg-cyan-600 inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                data-te-ripple-init
                                data-te-ripple-color="light"
                                onClick={login}
                            >
                                Sign in
                            </button>

                            {/* Register link */}
                            <div className="my-2 text-left">
                                <span className="text-stone-500">
                                    Don't have an account? <a className="text-cyan-600" href={"/register"}>Register here</a>.
                                </span>
                            </div>

                            {/* OR divider */}
                            <div
                                className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                <p
                                className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                                OR
                                </p>
                            </div>

                            {/* Google button */}
                            <a
                                onClick={loginWithGoogle}
                                className="mb-3 w-full flex items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-stone-500 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                style={{ backgroundColor: "#FAFAFA" }}
                                href="#!"
                                role="button"
                                data-te-ripple-init
                                data-te-ripple-color="light">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="100"
                                    height="100"
                                    viewBox="0 0 48 48"
                                    className="mr-2 h-3.5 w-3.5">
                                    <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                </svg>
                                Continue with Google
                            </a>
                            {/* Facebook button
                            <a
                                className="mb-3 w-full flex items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                style={{ backgroundColor: "#3b5998" }}
                                href="#!"
                                role="button"
                                data-te-ripple-init
                                data-te-ripple-color="light">
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-2 h-3.5 w-3.5"
                                fill="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                </svg>
                                Continue with Facebook
                            </a>*/}
                            {/* Twitter button
                            <a
                                className="mb-3 flex w-full items-center justify-center rounded bg-info px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
                                style={{ backgroundColor: "#55acee" }}
                                href="#!"
                                role="button"
                                data-te-ripple-init
                                data-te-ripple-color="light">
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-2 h-3.5 w-3.5"
                                fill="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                </svg>
                                Continue with Twitter
                            </a>*/}
                        </form>
                    </div>
                </div>

            </div>
        </div>
        </section>
    );
};

export default Login;

