import "./Navbar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import logoutIcon from "../assets/Logout.png";

function Navbar() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [tabName, setTabName] = useState("[ DASHBOARD ]");
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const name = useAuthStore((state) => state.name);

  const handleLogoutClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmLogout = () => {
    logout();
    setShowConfirmation(false);
    navigate("/");
  };

  const handleCancelLogout = () => {
    setShowConfirmation(false);
  };
  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <div className="navbar-content">
          <span className="navbar-text">{name}</span>
        </div>
      </div>

      <div className="navbar-middle">
        <div className="navbar-content">
          <span className="navbar-text navbar-text-large">{tabName}</span>
        </div>
      </div>

      <div className="navbar-right">
        <div className="navbar-content">
          <button
            type="button"
            className="navbar-logout-btn"
            onClick={handleLogoutClick}
            aria-label="Logout"
          >
            <img src={logoutIcon} alt="Logout" className="navbar-logout-icon" />
          </button>
        </div>
      </div>
      {showConfirmation && (
        <div className="logout-modal-overlay">
          <div className="logout-modal">
            <p className="logout-modal-text">
              Are you sure you want to log out?
            </p>
            <div className="logout-modal-buttons">
              <button
                type="button"
                className="logout-modal-btn logout-modal-yes"
                onClick={handleConfirmLogout}
              >
                &gt; Yes
              </button>
              <button
                type="button"
                className="logout-modal-btn logout-modal-no"
                onClick={handleCancelLogout}
              >
                &gt; No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
