import React, { useState } from "react";
import { signin } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom"; 
import "../../dairy.css";

const Signin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await signin(form);

      if (error) {
        alert(error);
        return;
      }

      const user = data.user;

      if (user.role === "admin") {
        localStorage.setItem("isAdmin", "true");
        navigate("/admin");
      } else {
        localStorage.removeItem("isAdmin");
        navigate("/products");
      }
    } catch (err) {
      console.error("Signin error:", err);
      alert("Signin failed. Please try again.");
    }
  };

  return (
   <div className="cc-app">
     <div className="auth-box">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">Login</button>
      </form>

      {/* 👇 Add this section */}
      <p style={{ marginTop: "16px", fontSize: "0.95rem" }}>
        Don’t have an account?{" "}
        <Link
          to="/signup"
          style={{
            color: "#5f5295ff",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          Sign up here
        </Link>
      </p>
    </div>
   </div>
  );
};

export default Signin;
