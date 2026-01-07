import React, { useState } from "react";
import ElectronicList from "./ElectronicList";
import AddElectronic from "./AddElectronic";
import '../dairy.css';


export default function AdminPage() {
  const token = localStorage.getItem("token");
  const [refreshList, setRefreshList] = useState(false);

  const handleAddElectronic = () => {
    setRefreshList(prev => !prev); // reload ElectronicList
  };

  return (
    <div className="cc-app">
      <header className="cc-header">
        <h1 className="cc-title">Admin Dashboard: Electronic Management</h1>
      </header>

      <main className="cc-main">
        {/* Add new Electronic */}
        <AddElectronic token={token} onAdd={handleAddElectronic} />

        {/* Electronic cards with edit/delete */}
        <ElectronicList
          adminView={true}
          token={token}
          key={refreshList} // reload when new item is added
        />
      </main>

      <footer className="cc-footer">
        Future-ready gadgets for today’s world.
      </footer>
    </div>
  );
}
