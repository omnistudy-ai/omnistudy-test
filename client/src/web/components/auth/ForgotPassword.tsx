import React, { useState } from 'react';

const ForgotPassword: React.FC = () => {

    // Login email form value handling
    const [loginEmail, setLoginEmail] = useState("");
    const [showLoginEmailPlaceholder, setShowLoginEmailPlaceholder] = useState(true);

    return (
        <section className="h-screen bg-slate-100">
        <div className="container h-full px-6 py-24">
            <div className="flex flex-col h-full items-center justify-center">

                {/* Logo */}
                <div className="flex flex-col mb-12">
                    <div className="flex flex-row justify-center items-center">
                        <img
                            src="logo_blue.png"
                            alt=""
                            className="w-[4rem] h-[4rem] mr-4 mt-1"
                        />
                        <h3 className="text-5xl text-cyan-500 font-mono font-bold">OmniStudy</h3>
                    </div>
                </div>

                <div className="g-6 flex h-75 flex-wrap items-start justify-center">
                    {/* Page form */}
                    <div>
                        <h1 className="text-left mb-5 text-2xl font-bold text-stone-500">Enter your email</h1>
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

                            {/* Send reset link button */}
                            <button
                                type="submit"
                                className="bg-cyan-500 hover:bg-cyan-600 inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                data-te-ripple-init
                                data-te-ripple-color="light"
                                onClick={() => {}}
                            >
                                Send Reset Link
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
        </section>
    );
};

export default ForgotPassword;

