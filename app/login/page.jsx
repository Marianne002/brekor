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
                <div className="login_content">
                <h1 className="gradient-color">Connectez vous</h1>
                    <form className="login_content_form" onSubmit={handleSubmit}>
                        <label>Adresse mail</label>
                        <input
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <label>Mot de passe</label>
                        <input
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && <p className="error">{error}</p>}
                        <button className="btn" type="submit">Se connecter</button>
                    </form>
                    <div className="d-flex flex-column">
                        <div>
                            <p>Ou continuez avec</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between column-gap-3
                        ">
                            <button className="rs">
                                <img src="/assets/icon-google.svg" alt="Icon Google" />
                            </button>
                            <button className="rs">
                                <img src="/assets/icon-facebook.svg" alt="Icon Facebook" />
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
