import { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../store/authStore";
import { getTokenPayload } from "../utils/tokenUtils";
import "./ProductCrud.css";

function PartsView() {
  const token = useAuthStore((state) => state.token);
  const [parts, setParts] = useState([]);
  const [selectedPart, setSelectedPart] = useState(null);
  const [typeFilter, setTypeFilter] = useState("All");
  const [valueRange, setValueRange] = useState("All");
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/parts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setParts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching parts:", error);
      });
  }, [token]);

  useEffect(() => {
    if (!token) return;
    const payload = getTokenPayload(token);
    if (!payload) return;
    axios
      .get(`http://localhost:8000/user/${payload.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBalance(res.data.balance))
      .catch((err) => console.error("Error fetching balance:", err));
  }, [token]);

  const partTypes = [...new Set(parts.map((p) => p.type))];

  const filteredParts = parts.filter((part) => {
    if (typeFilter !== "All" && part.type !== typeFilter) return false;
    if (valueRange !== "All") {
      const v = Number(part.value);
      if (valueRange === "0-100" && (v < 0 || v > 100)) return false;
      if (valueRange === "100-500" && (v < 100 || v > 500)) return false;
      if (valueRange === "500-1000" && (v < 500 || v > 1000)) return false;
      if (valueRange === "1000+" && v < 1000) return false;
    }
    return true;
  });

  const handleIconClick = (part) => {
    setSelectedPart(part);
  };

  const getIconSrc = (iconData) => {
    if (!iconData) return "";
    if (typeof iconData === "string") {
      if (iconData.startsWith("data:")) return iconData;
      return `data:image/png;base64,${iconData}`;
    }
    if (iconData.type === "Buffer" && Array.isArray(iconData.data)) {
      try {
        const bytes = new Uint8Array(iconData.data);
        let binary = "";
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        if (binary.startsWith("data:")) {
          return binary;
        }
        return `data:image/png;base64,${window.btoa(binary)}`;
      } catch (e) {
        console.error("Error converting icon buffer", e);
        return "";
      }
    }
    return "";
  };

  return (
    <div className="crud-panel-container">
      <div className="part-layout">
        <div className="store-section">
          <div className="store-filter-bar">
            <div className="store-filters">
              <select
                className="filter-select"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="All">All Types</option>
                {partTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <select
                className="filter-select"
                value={valueRange}
                onChange={(e) => setValueRange(e.target.value)}
              >
                <option value="All">All Values</option>
                <option value="0-100">0 - 100</option>
                <option value="100-500">100 - 500</option>
                <option value="500-1000">500 - 1,000</option>
                <option value="1000+">1,000+</option>
              </select>
            </div>
            <div className="store-balance">
              <span className="balance-label">CREDITS:</span>
              <span className="balance-value">
                {balance?.toLocaleString() ?? "—"}
              </span>
            </div>
          </div>
          {parts.length === 0 ? (
            <div className="terminal-loading">Loading parts...</div>
          ) : (
            <div className="part-icons-grid">
              {filteredParts.map((part) => {
                return (
                  <div
                    key={part.id}
                    className={`userpart-icon-box type-${part.type.toLowerCase()} ${selectedPart?.id === part.id ? "active" : ""}`}
                    onClick={() => handleIconClick(part)}
                    style={{ cursor: "pointer" }}
                  >
                    {part.icon ? (
                      <img src={getIconSrc(part.icon)} alt={part.name} />
                    ) : (
                      <div className="no-img">No Image</div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="form-section">
          <h3 className="section-title">Part Details</h3>
          {selectedPart ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <p>
                <strong>Name:</strong> {selectedPart.name}
              </p>
              <p>
                <strong>Value:</strong> {selectedPart.value}
              </p>
              <p>
                <strong>Stock:</strong> {selectedPart.stock}
              </p>
              <p>
                <strong>Type:</strong> {selectedPart.type}
              </p>
              <p>
                <strong>Description:</strong> {selectedPart.description}
              </p>
            </div>
          ) : (
            <div>Select a part to see details</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PartsView;
