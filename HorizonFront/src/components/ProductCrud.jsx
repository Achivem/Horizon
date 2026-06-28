import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import useAuthStore from "../store/authStore";
import { getTokenPayload } from "../utils/tokenUtils";
import "./ProductCrud.css";

function ProductCrud({ onPartsChange }) {
  const token = useAuthStore((state) => state.token);
  const payload = getTokenPayload(token);
  const userId = payload ? payload.id : null;

  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Form states
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [stock, setStock] = useState("");
  const [type, setType] = useState("Cockpit");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [iconPreview, setIconPreview] = useState("");

  const fetchParts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/parts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setParts(res.data);
      if (onPartsChange) {
        onPartsChange(res.data);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to retrieve parts.");
    } finally {
      setLoading(false);
    }
  }, [token, onPartsChange]);

  useEffect(() => {
    let active = true;
    const initFetch = async () => {
      await Promise.resolve();
      if (active) {
        fetchParts();
      }
    };
    initFetch();
    return () => {
      active = false;
    };
  }, [fetchParts]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIcon(reader.result);
        setIconPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setEditId(null);
    setName("");
    setValue("");
    setStock("");
    setType("Cockpit");
    setDescription("");
    setIcon("");
    setIconPreview("");
    setErrorMsg("");
  };

  const handleEditClick = (part) => {
    setErrorMsg("");
    setSuccessMsg("");
    setEditId(part.id);
    setName(part.name);
    setValue(part.value.toString());
    setStock(part.stock.toString());
    setType(part.type);
    setDescription(part.description);
    const src = getIconSrc(part.icon);
    setIcon(src);
    setIconPreview(src);
  };

  const handleDeleteClick = async (partId) => {
    if (!window.confirm("Are you sure you want to decommission this part?")) {
      return;
    }
    setErrorMsg("");
    setSuccessMsg("");
    try {
      await axios.delete(`http://localhost:8000/parts/${partId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccessMsg("Part successfully decommissioned.");
      fetchParts();
      if (editId === partId) {
        resetForm();
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Terminal rejected decommission request.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!name.trim()) return setErrorMsg("Part name is obligatory.");
    if (!value || parseFloat(value) <= 0)
      return setErrorMsg("Value must be greater than 0.");
    if (!stock || parseInt(stock) < 0)
      return setErrorMsg("Stock cannot be negative.");
    if (!description.trim()) return setErrorMsg("Description is obligatory.");
    if (!icon) return setErrorMsg("Part icon is obligatory.");

    const partData = {
      name,
      value: parseFloat(value),
      stock: parseInt(stock),
      type,
      icon,
      description,
      userId,
    };

    try {
      if (editId) {
        await axios.put(`http://localhost:8000/parts/${editId}`, partData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuccessMsg("Part specifications successfully updated.");
      } else {
        await axios.post("http://localhost:8000/parts", partData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuccessMsg("New part registered in database.");
      }
      resetForm();
      fetchParts();
    } catch (err) {
      console.error(err);
      const errMsg =
        err.response?.data?.error || "Transaction refused by mainframe.";
      setErrorMsg(errMsg);
    }
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
      {successMsg && (
        <div className="terminal-alert success">&gt;&gt; {successMsg}</div>
      )}
      {errorMsg && (
        <div className="terminal-alert error">&gt;&gt; ERROR: {errorMsg}</div>
      )}

      <div className="crud-layout">
        <div className="inventory-section">
          <h3 className="section-title">&gt; PARTS INVENTORY</h3>

          {loading && (
            <div className="terminal-loading">
              POLLING FLIGHT DECK DATABASE...
            </div>
          )}

          {!loading && parts.length === 0 ? (
            <div className="empty-inventory">
              NO REGISTERED ASSETS DETECTED.
            </div>
          ) : (
            <div className="inventory-table-wrapper">
              <table className="inventory-table">
                <thead>
                  <tr>
                    <th>ICON</th>
                    <th>NAME</th>
                    <th>TYPE</th>
                    <th>VALUE</th>
                    <th>STOCK</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {parts.map((part) => (
                    <tr
                      key={part.id}
                      className={editId === part.id ? "editing-row" : ""}
                    >
                      <td>
                        <div className="part-icon-box">
                          {part.icon ? (
                            <img src={getIconSrc(part.icon)} alt={part.name} />
                          ) : (
                            <span className="no-img">N/A</span>
                          )}
                        </div>
                      </td>
                      <td className="part-name-cell">{part.name}</td>
                      <td>
                        <span
                          className={`part-type-badge ${part.type.toLowerCase()}`}
                        >
                          {part.type}
                        </span>
                      </td>
                      <td className="part-value-cell">
                        {part.value.toLocaleString()} CR
                      </td>
                      <td className="part-stock-cell">{part.stock}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            type="button"
                            className="crud-btn-mini edit"
                            onClick={() => handleEditClick(part)}
                          >
                            &#91; EDIT &#93;
                          </button>
                          <button
                            type="button"
                            className="crud-btn-mini delete"
                            onClick={() => handleDeleteClick(part.id)}
                          >
                            &#91; DECOM &#93;
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right column: Form console */}
        <div className="form-section">
          <h3 className="section-title">
            &gt; {editId ? `EDIT PART #${editId}` : "CREATE NEW PART"}
          </h3>

          <form className="crud-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="part-name">&gt; NAME:</label>
              <input
                id="part-name"
                type="text"
                className="crud-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter part name"
              />
            </div>

            <div className="form-group-row">
              <div className="form-group half">
                <label htmlFor="part-value">&gt; VALUE (CR):</label>
                <input
                  id="part-value"
                  type="number"
                  step="0.01"
                  className="crud-input"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="0.00"
                />
              </div>

              <div className="form-group half">
                <label htmlFor="part-stock">&gt; STOCK COUNT:</label>
                <input
                  id="part-stock"
                  type="number"
                  className="crud-input"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="part-type">&gt; TYPE CATEGORY:</label>
              <select
                id="part-type"
                className="crud-input crud-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Cockpit">Cockpit</option>
                <option value="Wing">Wing</option>
                <option value="Hull">Hull</option>
                <option value="Thruster">Thruster</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="part-desc">&gt; DESCRIPTION:</label>
              <textarea
                id="part-desc"
                className="crud-input crud-textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>&gt; PART ICON:</label>
              <div className="file-upload-container">
                <label htmlFor="part-file-upload" className="file-upload-label">
                  &#91; SELECT GRAPHIC FILE &#93;
                </label>
                <input
                  id="part-file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />

                {iconPreview && (
                  <div className="visual-preview-box">
                    <img src={iconPreview} alt="Preview" />
                    <button
                      type="button"
                      className="clear-preview-btn"
                      onClick={() => {
                        setIcon("");
                        setIconPreview("");
                      }}
                    >
                      X
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="crud-submit-btn">
                &gt; {editId ? "SAVE ADJUSTMENTS" : "COMMISSION PART"}
              </button>
              {editId && (
                <button
                  type="button"
                  className="crud-cancel-btn"
                  onClick={resetForm}
                >
                  &gt; ABORT EDIT
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductCrud;
