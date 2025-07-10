import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import "./App.css";
import Navbar from "../components/Navbar";
import HomePage from "./HomePage";

function App() {
  const { authData, logout } = useAuth();

  return (
    <BrowserRouter>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
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

          <Route
            path="/"
            element={
              authData ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
