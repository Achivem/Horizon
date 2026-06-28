import { useState } from "react";
import axios from "axios";
import "../App.css";
import RegisterModal from "../components/RegisterModal";

function KeyPage() {
  const [accessCode, setAccessCode] = useState("");
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleValidateAccess = async () => {
    try {
      const res = await axios.post("http://localhost:8000/auth/validate", {
        accessCode,
      });
      if (res.data.success) {
        setShowRegisterModal(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="key-page">
      <div className="key-access-container">
        <label className="key-access-label" htmlFor="access-input">
          ACCESS
        </label>
        <div className="key-input-button-row">
          <input
            id="access-input"
            className="key-access-input"
            type="text"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleValidateAccess()}
          />
          <button
            type="button"
            className="key-access-btn"
            onClick={handleValidateAccess}
          >
            ✓
          </button>
        </div>
      </div>
      <RegisterModal
        show={showRegisterModal}
        onHide={() => setShowRegisterModal(false)}
        isAdmin={true}
      />
    </div>
  );
}

export default KeyPage;
