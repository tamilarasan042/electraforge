import React, { useState } from "react";
import { updateElectronic } from "../services/ElectronicServices";

export default function EditElectronic({ electronic, onClose }) {
  const [name, setName] = useState(electronic.name);
  const [category, setCategory] = useState(electronic.category);
  const [price, setPrice] = useState(electronic.price);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  // Get token from localStorage
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Saving...");

    const fd = new FormData();
    fd.append("name", name);
    fd.append("category", category);
    fd.append("price", price);
    if (file) fd.append("image", file);

    try {
      await updateElectronic(electronic._id, fd, token); //  pass token
      setStatus("Updated!");
      setTimeout(onClose, 500);
    } catch (err) {
      setStatus("Error updating: " + err.message);
    }
  };

  const styles = {
    modal: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(255, 182, 193, 0.35)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    box: {
      background: "linear-gradient(90deg, #4b6a7eff, #597587ff)", 
      padding: "30px",
      borderRadius: "20px",
      boxShadow: "0 12px 28px rgba(255,105,180,0.25)",
      width: "320px",
      textAlign: "center",
      fontFamily: "'Poppins', sans-serif",
      color: "#4d2336",
    },
    input: {
      width: "100%",
      padding: "10px 12px",
      margin: "8px 0",
      borderRadius: "12px",
      border: "1px solid #561435ff",
      outline: "none",
      fontSize: "1rem",
    },
    fileInput: {
      margin: "10px 0",
      fontSize: "0.9rem",
      color: "#66344d",
    },
    button: {
      padding: "10px 18px",
      margin: "8px 6px",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      fontWeight: 600,
      color: "black",
      background: "linear-gradient(90deg, #999ec3ff, #471866ff)",
      transition: "all 0.3s ease",
    },
    cancelBtn: {
      padding: "10px 18px",
      margin: "8px 6px",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      fontWeight: 600,
      color: "black",
      background: "linear-gradient(90deg, #6b2b44ff, #6f374bff)",
      transition: "all 0.3s ease",
    },
    status: {
      marginTop: "12px",
      fontSize: "0.95rem",
      fontWeight: "500",
    },
    heading: {
      marginBottom: "18px",
      fontSize: "1.4rem",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.modal}>
      <div style={styles.box}>
        <h3 style={styles.heading}>Edit Electronic!!</h3>
        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
          <input
            style={styles.input}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="category"
            required
          />
          <input
            style={styles.input}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder="Price"
            required
          />
          <input
            style={styles.fileInput}
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div>
            <button type="submit" style={styles.button}>
              Save
            </button>
            <button type="button" onClick={onClose} style={styles.cancelBtn}>
              Cancel
            </button>
          </div>
        </form>
        <p style={styles.status}>{status}</p>
      </div>
    </div>
  );
}
