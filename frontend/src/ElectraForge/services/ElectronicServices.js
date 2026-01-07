const API = "http://localhost:5000/api";

// Fetch all ice creams (public)
export const fetchElectronic = async () => {
  const res = await fetch(`${API}/electronics`);
  if (!res.ok) throw new Error("Failed to fetch electronics");
  return res.json();
};

// Helper to build headers for authorized requests
const authHeaders = (token) =>
  token ? { Authorization: `Bearer ${token}` } : {};

// Create a new electronic (requires admin token)
export const createElectronic = async (formData, token) => {
  const res = await fetch(`${API}/electronics`, {
    method: "POST",
    body: formData,
    headers: authHeaders(token), //  only Authorization
  });

  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.message || "Failed to create electronic");
  }
  return res.json();
};

// Update an existing electronic (requires admin token)
export const updateElectronic = async (id, formData, token) => {
  if (!token) throw new Error("Unauthorized: No token provided");

  const res = await fetch(`${API}/electronics/${id}`, {
    method: "PUT",
    body: formData,
    headers: authHeaders(token), // only Authorization
  });

  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.message || "Failed to update electronic");
  }
  return res.json();
};

// Delete an electronic (requires admin token)
export const deleteElectronic = async (id, token) => {
  if (!token) throw new Error("Unauthorized: No token provided");

  const res = await fetch(`${API}/electronics/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });

  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.message || "Failed to delete electronic");
  }
  return res.json();
};
