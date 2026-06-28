import "./Modal.css";
import { useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import eyeIcon from "../assets/eye.png";
import eyeOffIcon from "../assets/eye-off.png";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";

function LoginModal(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleVisibilityToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginData = {
        email: userEmail,
        password: userPassword,
      };
      const res = await axios.post(
        "http://localhost:8000/auth/login",
        loginData,
      );
      login(res.data.token, res.data.name, res.data.faction);
      if (res.data.role == "Admin") {
        navigate("/Dash");
      }
      if (res.data.role == "Customer") {
        navigate("/Station");
      }
    } catch (err) {
      setErrorMessage(err.response.data.error);
      setShowErrorModal(true);
    }
  };

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          &#91; LOGIN &#93;
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="modal-form" onSubmit={handleLoginSubmit}>
          <div className="modal-form-row">
            <label className="modal-form-label" htmlFor="login-email">
              &gt; Email:
            </label>
            <input
              id="login-email"
              className="modal-input"
              type="email"
              name="email"
              value={userEmail}
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
              placeholder="Enter your email"
            />
          </div>

          <div className="modal-form-row">
            <label className="modal-form-label" htmlFor="login-password">
              &gt; Password:
            </label>
            <div className="password-field">
              <input
                id="login-password"
                className="modal-input"
                type={showPassword ? "text" : "password"}
                name="password"
                value={userPassword}
                onChange={(e) => {
                  setUserPassword(e.target.value);
                }}
                placeholder="Enter your password"
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

          <div className="modal-form-submit">
            <button type="submit" className="modal-submit-btn">
              &gt; SUBMIT
            </button>
          </div>
        </form>
      </Modal.Body>
      <Modal
        show={showErrorModal}
        onHide={() => setShowErrorModal(false)}
        size="sm"
        centered
        dialogClassName="error-modal"
      >
        <Modal.Body>
          <div className="error-modal-content">
            <p className="error-message">{errorMessage}</p>
            <button
              type="button"
              className="error-modal-btn"
              onClick={() => {
                setShowErrorModal(false);
              }}
            >
              &gt; TRY AGAIN
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </Modal>
  );
}

export default LoginModal;
