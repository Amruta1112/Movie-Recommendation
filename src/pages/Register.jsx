import React, { useState } from "react";
import { registerUser } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await registerUser(email,Username, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register</h2>
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="register-btn" onClick={handleRegister}>
          Register
        </button>
        {error && <p className="error-message">{error}</p>}
        <p>
          Already have an account?{" "}
          <Link to="/" className="login-link">
            Login here
          </Link>
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
        .register-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100vw;
          height: 100vh;
          background-color: #121212;
          padding: 0;
          box-sizing: border-box;
        }

        /* Register form style */
        .register-form {
          background-color: #1e1e1e;
          padding: 40px;
          border-radius: 12px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          text-align: center;
        }

        .register-form h2 {
          color: #fff;
          font-size: 32px;
          margin-bottom: 20px;
          font-weight: 500;
        }

        .register-form input {
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

        .register-form input:focus {
          outline: none;
          border: 2px solid #007bff;
          background-color: #444;
        }

        .register-btn {
          width: 40%;
          padding: 14px;
          margin: 12px 0;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
          font-weight: bold;
        }

        .register-btn {
          background-color: #007bff;
          color: white;
        }

        .register-btn:hover {
          background-color: #0056b3;
        }

        .error-message {
          color: red;
          font-size: 14px;
          margin-top: 10px;
          font-weight: 500;
        }

        .login-link {
          color: #007bff;
          text-decoration: none;
          font-weight: bold;
        }

        /* Mobile Responsiveness */
        @media (max-width: 500px) {
          .register-form {
            padding: 30px;
            max-width: 90%;
          }
        }
      `}</style>
    </div>
  );
};

export default Register;
