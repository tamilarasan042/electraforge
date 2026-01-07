import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../services/authService";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data, error } = await loginAdmin({ email, password });

      if (error) {
        setError(error);
        return;
      }

      // Store the admin user and token in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: data.user.username,
          email: data.user.email,
          role: data.user.role,
          token: data.token,
        })
      );

      navigate("/admin/users"); // redirect to admin dashboard
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="cc-app">
      <div className="admin-login">
        <h2>Admin Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit} autoComplete="on">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
