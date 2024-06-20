// app/login/page.jsx
"use client";

import "@styles/Login.scss";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    // Initialize the state variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Get the router object
    const router = useRouter();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Sign in with email and password
            const response = await signIn("credentials", {
                redirect: false,
                email: email,
                password: password,
            });
            console.log("Response from signIn:", response);

            // If response is ok, redirect to home page
            if (response.ok) {
                router.push("/")
            }else{
                setError("Invalid email or password. Please try again!");
            }
        } catch (error) {
            console.log("Error logging in: ", error);
        }
    };

    // Handle Google login
    const loginWithGoogle = () => {
        signIn("google", { callbackUrl: "/" });
    };

    return (
        <div className="login">
            <img src="/assets/login.jpg" alt="login" className="login_decor" />
            <div className="login_content">
                <form className="login_content_form" onSubmit={handleSubmit}>
                    <input
                        placeholder="Email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p className="error">{error}</p>}
                    <button type="submit">Log In</button>
                </form>
                <button className="google" onClick={loginWithGoogle}>
                <p>Log In with Google</p>
                <FcGoogle />
                </button>
                <a href="/register">Don't have an account? Sign In Here</a>
            </div>
        </div>
    );
};

export default Login;
