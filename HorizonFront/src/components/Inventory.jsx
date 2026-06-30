import { useState } from "react";
import axios from "axios";
import useAuthStore from "../store/authStore";
import "./Inventory.css";

function Inventory() {
  const token = useAuthStore((state) => state.token);
  const [userParts, setUserParts] = useState([]);

  return (
    <div className="inventory-panel">
      <h3 className="inventory-title">INVENTORY</h3>
      {userParts.length === 0 ? (
        <div className="terminal-loading">No parts owned yet</div>
      ) : (
        <div className="inventory-list"></div>
      )}
    </div>
  );
}

export default Inventory;
