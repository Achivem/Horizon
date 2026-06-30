import { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../store/authStore";
import { getTokenPayload } from "../utils/tokenUtils";
import "./ProductCrud.css";

function PartsView() {
  const token = useAuthStore((state) => state.token);
  const [parts, setParts] = useState([]);
  const [selectedPart, setSelectedPart] = useState(null);

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
          {parts.length === 0 ? (
            <div className="terminal-loading">Loading parts...</div>
          ) : (
            <div className="part-icons-grid">
              {parts.map((part) => {
                console.log("part.icon:", part.icon);
                console.log("type:", typeof part.icon);
                return (
                  <div
                    key={part.id}
                    className={`userpart-icon-box ${selectedPart?.id === part.id ? "active" : ""}`}
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
