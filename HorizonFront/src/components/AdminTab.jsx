import "./Tab.css";
import tabActive from "../assets/TabActive.png";
import tabInactive from "../assets/TabInactive.png";

function AdminTab({ activeTab, onTabChange }) {
  return (
    <div className="tab-container">
      <button
        type="button"
        className={`tab-btn ${activeTab === "DASH" ? "active" : ""}`}
        style={{
          backgroundImage: `url(${activeTab === "DASH" ? tabActive : tabInactive})`,
        }}
        onClick={() => onTabChange("DASH")}
      >
        DASH
      </button>
      <button
        type="button"
        className={`tab-btn ${activeTab === "CRUD" ? "active" : ""}`}
        style={{
          backgroundImage: `url(${activeTab === "CRUD" ? tabActive : tabInactive})`,
        }}
        onClick={() => onTabChange("CRUD")}
      >
        CRUD
      </button>
    </div>
  );
}

export default AdminTab;
