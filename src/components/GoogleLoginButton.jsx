// src/components/GoogleLoginButton.js
import React from "react";
import { signInWithGoogle } from "../services/auth";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const user = await signInWithGoogle();
            alert(`Welcome, ${user.displayName}`);
            navigate("/home");  // Redirect to home after successful Google login
        } catch (error) {
            alert("Google login failed.");
        }
    };

    return (
        <button onClick={handleLogin}>
            Sign in with Google
        </button>
    );
};

export default GoogleLoginButton;
