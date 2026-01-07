import React, { useState } from "react";
import ElectronicList from "./components/ElectronicList";
import AddElectronic from "./components/AddElectronic";
import './dairy.css';

function ElectroWorld() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
  const isAdmin = user?.role === "admin";
  const token = localStorage.getItem("token");

  // Only admin can access
  if (!isAdmin) {
    return (
      <div className="cc-app">
        <header className="cc-header">
          <h1 className="cc-title">Access Denied</h1>
        </header>
        <main className="cc-main">
          <p>You do not have permission to view this page.</p>
        </main>
      </div>
    );
  }

  // Refresh ElectronicList after adding a new electronic
  const [refreshList, setRefreshList] = useState(false);
  const handleAddElectronic = () => setRefreshList(prev => !prev);

  return (
    <div className="cc-app">
      <header className="cc-header">
        <h1 className="cc-title">Admin: ElectraForge Electronics World</h1>
      </header>

      <main className="cc-main">
        {/* Admin: Add new electronic */}
        <AddElectronic token={token} onAdd={handleAddElectronic} />

        {/* Admin: Manage electronics (edit/delete only) */}
        <ElectronicList
          adminView={true}   // Admin mode
          token={token}
          key={refreshList}  // Force reload when new item is added
        />
      </main>

      <footer className="cc-footer">
        Upgrade your world with the best electronics.
      </footer>
    </div>
  );
}

export default ElectroWorld;
