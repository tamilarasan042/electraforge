import React, { useEffect, useState } from "react";

const API = "http://localhost:5000/api";

// Headers with Bearer token
const authHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

// Fetch all users
const fetchUsers = async (token) => {
  const res = await fetch(`${API}/users`, { headers: authHeaders(token) });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to fetch users");
  }
  return res.json();
};

// Delete a user
const deleteUser = async (id, token) => {
  const res = await fetch(`${API}/users/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to delete user");
  }
  return res.json();
};

// Update a user
const updateUser = async (id, token, data) => {
  const res = await fetch(`${API}/users/${id}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to update user");
  }
  return res.json();
};

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(null); // user being edited
  const [formData, setFormData] = useState({ username: "", email: "", role: "" });

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const token = user?.token;

  const loadUsers = async () => {
    if (!token || user?.role !== "admin") {
      alert("You are not authorized. Please login as admin.");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const data = await fetchUsers(token);
      setUsers(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id, token);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditClick = (user) => {
    setEditUser(user);
    setFormData({ username: user.username, email: user.email, role: user.role });
  };

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateUser(editUser._id, token, formData);
      setUsers((prev) => prev.map((u) => (u._id === editUser._id ? updated.user : u)));
      setEditUser(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCancelEdit = () => setEditUser(null);

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(135deg, #805767ff, #829ea8ff)",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Admin Dashboard</h2>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading users...</p>
      ) : users.length === 0 ? (
        <p style={{ textAlign: "center" }}>No users found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            boxShadow: "0 4px 12px rgba(104, 98, 98, 0.1)",
            background: "white",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <thead
            style={{
              background: "linear-gradient(90deg, #643239ff, #324c5dff)",
              color: "#807878ff",
            }}
          >
            <tr>
              <th style={{ padding: "12px" }}>#</th>
              <th style={{ padding: "12px" }}>Username</th>
              <th style={{ padding: "12px" }}>Email</th>
              <th style={{ padding: "12px" }}>Role</th>
              <th style={{ padding: "12px" }}>Created At</th>
              <th style={{ padding: "12px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, idx) => (
              <tr
                key={u._id}
                style={{ textAlign: "center", borderBottom: "1px solid #cb8888ff" }}
              >
                <td style={{ padding: "12px" }}>{idx + 1}</td>
                <td style={{ padding: "12px" }}>{u.username}</td>
                <td style={{ padding: "12px" }}>{u.email}</td>
                <td style={{ padding: "12px" }}>{u.role}</td>
                <td style={{ padding: "12px" }}>
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: "12px" }}>
                  <button
                    style={{
                      padding: "6px 12px",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      marginRight: "6px",
                      background: "linear-gradient(90deg, #294557ff, #29404fff)",
                      color: "#888282ff",
                    }}
                    onClick={() => handleEditClick(u)}
                  >
                    Edit
                  </button>
                  <button
                    style={{
                      padding: "6px 12px",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      background: "linear-gradient(90deg, #ff85b3, #ff6fa5)",
                      color: "#333",
                    }}
                    onClick={() => handleDelete(u._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Edit Modal */}
      {editUser && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(118, 112, 112, 0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <form
            onSubmit={handleFormSubmit}
            style={{
              background: "white",
              padding: 24,
              borderRadius: 12,
              minWidth: 300,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <h3>Edit User</h3>
            <input
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleFormChange}
              required
            />
            <input
              name="email"
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={handleFormChange}
              required
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleFormChange}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
              <button type="button" onClick={handleCancelEdit}>
                Cancel
              </button>
              <button type="submit" style={{ background: "#561435ff", border: "none", padding: "6px 12px", borderRadius: 8 }}>
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
