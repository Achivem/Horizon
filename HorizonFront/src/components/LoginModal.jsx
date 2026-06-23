import "./Modal.css";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import eyeIcon from "../assets/eye.png";
import eyeOffIcon from "../assets/eye-off.png";

function LoginModal(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState(false);
  const [userPassword, setUserPassword] = useState(false);

  const handleVisibilityToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginata = {
        email: userEmail,
        password: userPassword,
      };
      const res = await axios.post(
        "http://localhost:8000/auth/login",
        loginData,
      );
      console.log(res);
    } catch (err) {}
  };

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          &#91; LOGIN &#93;
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="modal-form">
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
    </Modal>
  );
}

export default LoginModal;
