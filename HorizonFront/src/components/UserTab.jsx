import "./Tab.css";
import tabActive from "../assets/TabActive.png";
import tabInactive from "../assets/TabInactive.png";

function UserTab({ activeTab, onTabChange }) {
  return (
    <div className="tab-container">
      <button
        type="button"
        className={`tab-btn ${activeTab === "STORE" ? "active" : ""}`}
        style={{
          backgroundImage: `url(${activeTab === "STORE" ? tabActive : tabInactive})`,
        }}
        onClick={() => onTabChange("STORE")}
      >
        STORE
      </button>
      <button
        type="button"
        className={`tab-btn ${activeTab === "SHIP" ? "active" : ""}`}
        style={{
          backgroundImage: `url(${activeTab === "SHIP" ? tabActive : tabInactive})`,
        }}
        onClick={() => onTabChange("SHIP")}
      >
        SHIP
      </button>
      <button
        type="button"
        className={`tab-btn ${activeTab === "CREDS" ? "active" : ""}`}
        style={{
          backgroundImage: `url(${activeTab === "CREDS" ? tabActive : tabInactive})`,
        }}
        onClick={() => onTabChange("CREDS")}
      >
        CREDS
      </button>
    </div>
  );
}

export default UserTab;
