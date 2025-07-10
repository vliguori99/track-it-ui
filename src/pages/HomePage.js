import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { authData } = useAuth();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Track It!</h1>

      {authData ? (
        <div>
          <p>Track your apps</p>
          <Link to="/dashboard" className="button-link">
            Dashboard
          </Link>
        </div>
      ) : (
        <div>
          <p>
            The best application to track your habits and achieve your goals.
          </p>
          <Link to="/login" className="button-link">
            Login
          </Link>
          <Link to="/registration" className="button-link">
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
