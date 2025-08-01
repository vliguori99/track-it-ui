import React, { authData } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

const ProtectedRoute = ({ children }) => {
  const { authData } = useAuth();

  if (!authData) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;