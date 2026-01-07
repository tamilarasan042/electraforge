import React, { useState } from "react";
import { createElectronic } from "../services/ElectronicServices";

export default function AddElectronic({ onAdd, token }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [reviewUrl, setReviewUrl] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Adding...");

    // Prepare FormData
    const fd = new FormData();
    fd.append("name", name);
    fd.append("category", category);
    fd.append("price", price);
    fd.append("reviewUrl",reviewUrl);
    if (file) fd.append("image", file);

    try {
      // Call backend service with admin token
      const newElectronic = await createElectronic(fd, token);

      setStatus("Added successfully!");
      setName("");
      setCategory("");
      setPrice("");
      setFile(null);
      setReviewUrl("");

      // Notify parent component
      if (onAdd) onAdd(newElectronic);
    } catch (err) {
      console.error(err);
      setStatus(err.message || "Error adding Electronic.");
    }
  };

  return (
    <form className="cc-form" onSubmit={handleSubmit} autoComplete="off">
      <input
        className="cc-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name (e.g., IPhone, Samsung)"
        required
      />
      <input
        className="cc-input"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="category (Mobile, Laptop...)"
        required
      />
      <input
        className="cc-input"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        type="number"
        required
      />
      <input
        className="cc-file"
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <input
      className="cc-input"
  type="url"
  placeholder="YouTube Review Link"
  value={reviewUrl}
  onChange={(e) => setReviewUrl(e.target.value)}
/>
      <button className="cc-btn cc-primary" type="submit">
        Add Electronic
      </button>
      <p className="cc-status">{status}</p>
    </form>
  );
}
