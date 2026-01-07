import React from "react";
import { Navigate } from "react-router-dom";

/**
 * Protect routes for admin users only
 * Usage: <ProtectedRoute><AdminDashboard /></ProtectedRoute>
 */
const ProtectedRoute = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user || user.role !== "admin") {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default ProtectedRoute;
