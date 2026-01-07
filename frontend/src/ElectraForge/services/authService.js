// src/services/authService.js

const API = "http://localhost:5000/api/auth";

/**
 *  Signup — create a new user
 * @param {Object} user - { username, email, password, role? }
 */
export const signup = async (user) => {
  try {
    const res = await fetch(`${API}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    //  Handle both HTTP errors and Mongoose validation messages
    if (!res.ok) {
      return { data: null, error: data.message || "Signup failed" };
    }

    //  Success
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.message || "Network error" };
  }
};

/**
 * Signin — login any user (admin or normal)
 * @param {Object} user - { email, password }
 */
export const signin = async (user) => {
  try {
    const res = await fetch(`${API}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    //  Handle HTTP or server errors
    if (!res.ok) {
      return { data: null, error: data.message || "Signin failed" };
    }

    if (!data.token || !data.user) {
      return { data: null, error: "Invalid response from server" };
    }

    //  Store user info
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("isAdmin", data.user.role === "admin" ? "true" : "false");

    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.message || "Network error" };
  }
};

/**
 *  Admin login — restricted to admin accounts
 * @param {Object} admin - { email, password }
 */
export const loginAdmin = async (admin) => {
  try {
    const res = await fetch(`${API}/admin-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(admin),
    });

    const data = await res.json();

    // Handle HTTP or server errors
    if (!res.ok) {
      return { data: null, error: data.message || "Admin login failed" };
    }

    // Validate expected response fields
    if (!data.token || !data.user) {
      return { data: null, error: "Invalid response from server" };
    }

    //  Only allow admin users
    if (data.user.role !== "admin") {
      return { data: null, error: "Not an admin account" };
    }

    //  Store data in localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("isAdmin", "true");

    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.message || "Network error" };
  }
};

/**
 *  Signout user
 */
export const signout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("isAdmin");
};
