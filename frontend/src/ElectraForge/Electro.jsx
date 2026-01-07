import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./CloudHome"; 
import AboutPage from "./components/About"; 
import ProductPage from "./components/ProductPage";
import CartPage from "./components/CartPage";
import Signup from "./components/Auth/Signup";
import Signin from "./components/Auth/Signin";
import AdminPage from "./components/AdminPage"; // Admin dashboard main page
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard"; // Admin: user list
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import ElectroWorld from "./ElectroWorld";

function Electro() {
  return (
    <Router>
      <NavBar />

      <Routes>
        {/* Public user routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* Admin login */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Admin protected routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/electronic-world"
          element={
            <ProtectedRoute adminOnly={true}>
              <ElectroWorld />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default Electro;
