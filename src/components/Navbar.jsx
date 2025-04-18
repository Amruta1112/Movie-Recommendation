import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FaBars, FaCameraRetro, FaFilm } from "react-icons/fa";
import "../styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Guest");

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || "User");
      } else {
        setUserName("Guest");
      }
    });
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/", { replace: true });
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", () => {
      navigate("/", { replace: true });
    });
  };

  return (
    <nav className="navbar">
      {/* Left Side (Menu & Logo) */}
      <div className="navbar-left">
        <FaFilm className="menu-icon" />
        <span className="menu-text">MOVIEMATE</span>
      </div>

      {/* Right Side (User Options) */}
      <div className="navbar-right">
        <Link to="/liked" className="nav-link">Liked Movies</Link>
        <Link to="/watchlist" className="watchlist">+ Watchlist</Link>
        <h4 className="welcome-text">{userName}</h4>
        {userName === "Guest" ? (
          <Link to="/login" className="sign-in">Sign In</Link>
        ) : (
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
