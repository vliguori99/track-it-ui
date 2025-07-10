import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import './Navbar.css';

const Navbar = () => {
  const { authData, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Track-It</Link>
      </div>
      <div className="navbar-links">
        {!authData ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <span> Welcome, {authData.username}!</span>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;