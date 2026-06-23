import "./Modal.css";
import { useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import eyeIcon from "../assets/eye.png";
import eyeOffIcon from "../assets/eye-off.png";

const factionOptions = [
  { value: "Astra", label: "Astra", icon: "Astra.png" },
  { value: "Terra", label: "Terra", icon: "Terra.png" },
  { value: "Nadir", label: "Nadir", icon: "Nadir.png" },
  { value: "Quasar", label: "Quasar", icon: "Quasar.png" },
];

function RegisterModal(props) {
  const [selectedFaction, setSelectedFaction] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedPassword, setSelectedPassword] = useState("");
  const [selectedBirthdate, setSelectedBirthdate] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleVisibilityToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const registerData = {
        name: selectedName,
        password: selectedPassword,
        email: selectedEmail,
        birthdate: selectedBirthdate,
        faction: selectedFaction,
      };
      const res = await axios.post(
        "http://localhost:8000/auth/register",
        registerData,
      );
      console.log(res);
    } catch (err) {}
  };

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          &#91; REGISTRATION &#93;
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="modal-form" onSubmit={handleRegisterSubmit}>
          <div className="modal-form-row">
            <label className="modal-form-label" htmlFor="register-name">
              &gt; Name:
            </label>
            <input
              id="register-name"
              className="modal-input"
              type="text"
              name="name"
              value={selectedName}
              onChange={(e) => {
                setSelectedName(e.target.value);
              }}
              placeholder="Enter your name"
            />
          </div>

          <div className="modal-form-row">
            <label className="modal-form-label" htmlFor="register-password">
              &gt; Password:
            </label>
            <div className="password-field">
              <input
                id="register-password"
                className="modal-input"
                type={showPassword ? "text" : "password"}
                name="password"
                value={selectedPassword}
                onChange={(e) => {
                  setSelectedPassword(e.target.value);
                }}
                placeholder="Enter a password"
              />
              <button
                type="button"
                className="visibility-toggle"
                onClick={handleVisibilityToggle}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <img src={showPassword ? eyeOffIcon : eyeIcon} alt="" />
              </button>
            </div>
          </div>

          <div className="modal-form-row">
            <label className="modal-form-label" htmlFor="register-email">
              &gt; Email:
            </label>
            <input
              autocomplete="email"
              id="register-email"
              className="modal-input"
              type="email"
              name="email"
              value={selectedEmail}
              onChange={(e) => {
                setSelectedEmail(e.target.value);
              }}
              placeholder="Enter your email"
            />
          </div>

          <div className="modal-form-row">
            <label className="modal-form-label" htmlFor="register-birthdate">
              &gt; Birthdate:
            </label>
            <input
              id="register-birthdate"
              className="modal-input"
              type="date"
              name="birthdate"
              value={selectedBirthdate}
              onChange={(e) => {
                setSelectedBirthdate(e.target.value);
              }}
            />
          </div>

          <div className="modal-form-row modal-form-row--faction">
            <span className="modal-form-label">&gt; Faction:</span>
            <div className="faction-options">
              {factionOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  value={selectedFaction}
                  className={`faction-option ${
                    selectedFaction === option.value ? "selected" : ""
                  }`}
                  onClick={() => setSelectedFaction(option.value)}
                  aria-pressed={selectedFaction === option.value}
                >
                  <img
                    src={`/src/assets/${option.icon}`}
                    alt={option.label}
                    className="faction-icon"
                  />
                  <span className="faction-label">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="modal-form-submit">
            <button type="submit" className="modal-submit-btn">
              &gt; SUBMIT
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default RegisterModal;
