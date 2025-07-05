import React from "react";
import { BrowserRouter, Link, Route, Routes, Navigate } from "react-router-dom";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../context/AuthContext"
import "./App.css";

function App() {
  const { authData, logout } = useAuth();

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <nav>
            {!authData ? (
              <>
                <Link to="/register" style={{ margin: "10px" }}>
                  Sign Up
                </Link>
                <Link to="/login" style={{ margin: "10px" }}>
                  Login
                </Link>
              </>
            ) : (
              <button onClick={logout}>Logout</button>
            )}
          </nav>
          <h1>Track-It</h1>
          {authData && <h2>Welcome {authData.username}</h2>}
        </header>

        <main>
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            <Route path="/" element={authData ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
