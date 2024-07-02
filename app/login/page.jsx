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
    // const loginWithGoogle = () => {
    //     signIn("google", { callbackUrl: "/" });
    // };

    return (
        <>
            <title>Connexion - Brekor</title>
            <meta name="description" content="Accédez à votre compte et explorez une gamme d'œuvres d'art uniques en ligne." />
            <meta name="keywords" content="connexion, compte, plateforme d'art en ligne, se connecter à Brekor, artistes amateurs" />

            <div className="login">
                <h1>Créez votre compte</h1>
                <div className="login_content">
                    <form className="login_content_form" onSubmit={handleSubmit}>
                        <label>Email</label>
                        <input
                            placeholder="Email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <label>Mot de passe</label>
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
                    <div className="d-flex flex-column">
                        <div>
                            <p>Ou continuez avec</p>
                        </div>
                        <div className="d-flex">
                            <button className="google">
                                <FcGoogle />
                            </button>
                            <button className="google">
                                <FcGoogle />
                            </button>
                        </div>
                    </div>
                    <a href="/register">Vous n'avez pas de compte ? S'incrire</a>
                </div>
            </div>
        </>
    );
};

export default Login;
