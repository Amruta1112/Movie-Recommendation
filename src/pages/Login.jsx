import React, { useState } from "react";
import { loginUser, loginWithGoogle } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await loginUser(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
        const user = await loginWithGoogle(); // This would return the user object from Google Auth
      
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login to MovieMate</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-btn" onClick={handleLogin}>
          Login 
        </button>
        <button className="google-btn" onClick={handleGoogleLogin}>
          <img
            src="src\assets\0ffa191b263fd048aa05ae507c5976fa.png" // Google logo image URL
            alt="Google Logo"
            className="google-logo"
          />
          Continue with Google
        </button>
        {error && <p className="error-message">{error}</p>}
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>

      <style jsx>{`
                /* Fullscreen Layout */
                html, body, #root {
                    height: 100%;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #121212;
                    font-family: 'Roboto', sans-serif;
                }

                /* Fullscreen container */
                .login-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100vw;  /* Full width of the viewport */
                    height: 100vh; /* Full height of the viewport */
                    background-color: #121212;
                    padding: 0;
                    box-sizing: border-box;
                }

                /* Login form style */
                .login-form {
                    background-color: #1e1e1e;
                    padding: 40px;
                    border-radius: 12px;
                    width: 100%;
                    max-width: 400px; /* Form width is limited to 400px */
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
                    text-align: center;
                }

                .login-form h2 {
                    color: #fff;
                    font-size: 32px;
                    margin-bottom: 20px;
                    font-weight: 500;
                }

                .login-form input {
                    width: 100%;
                    padding: 14px;
                    margin: 12px 0;
                    background-color: #333;
                    color: #fff;
                    border: none;
                    border-radius: 8px;
                    font-size: 16px;
                    transition: all 0.3s ease;
                }

                .login-form input:focus {
                    outline: none;
                    border: 2px solid #007bff;
                    background-color: #444;
                }

                .login-btn,
                .google-btn {
                    width: 107%;
                    padding: 10px;
                    margin: 12px 0;
                    border: none;
                    border-radius: 8px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                    font-weight: bold;
                }

                .login-btn {
                    background-color: #007bff;
                    color: white;
                }

                .login-btn:hover {
                    background-color: #0056b3;
                }

               .google-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 107%;
                    padding: 5px;
                     margin: 12px 0;
                    border: none;
                    border-radius: 8px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                    font-weight: bold;
                    background-color: #db4437;
                    color: white;
                }

                .google-btn:hover {
                    background-color: #c1351d;
                }

                .google-logo {
                     width: 40px; /* Adjust logo size */
                    height: 40px;
                    margin-right: 8px; /* Space between logo and text */
                } 
                .error-message {
                    color: red;
                    font-size: 14px;
                    margin-top: 10px;
                    font-weight: 500;
                }
                .registerText: {
                    marginTop: "15px",
                    fontSize: "14px",
                },
                .registerLink: {
                    color: "#007bff",
                    textDecoration: "none",
                    fontWeight: "bold",
                },    
                
                /* Mobile Responsiveness */
                @media (max-width: 500px) {
                    .login-form {
                        padding: 30px;
                        max-width: 90%;
                    }
                }
            `}</style>
    </div>
  );
};

export default Login;
