import "../App.css";
import { useState } from "react";
import logo from "../assets/HorizonLogo.svg";
import Button from "react-bootstrap/Button";
import RegisterModal from "../components/RegisterModal";
import LoginModal from "../components/LoginModal";

function EntryPage() {
  const [registerModalShow, setRegisterModalShow] = useState(false);
  const [loginModalShow, setLoginModalShow] = useState(false);

  return (
    <div className="entry-page">
      <div className="intro">
        <div className="logo-container">
          <img src={logo} alt="Horizon logo" className="logo-image" />
          <p className="glow">Our vast expanse awaits you...</p>
        </div>
      </div>
      <div className="user-input">
        <Button
          variant="success"
          size="lg"
          className="custom-btn"
          onClick={() => setRegisterModalShow(true)}
        >
          R E G I S T E R
        </Button>

        <RegisterModal
          show={registerModalShow}
          onHide={() => setRegisterModalShow(false)}
          onOpenLogin={() => setLoginModalShow(true)}
        />

        <Button
          variant="success"
          size="lg"
          className="custom-btn"
          onClick={() => setLoginModalShow(true)}
        >
          L O G I N
        </Button>

        <LoginModal
          show={loginModalShow}
          onHide={() => setLoginModalShow(false)}
        />
      </div>
    </div>
  );
}

export default EntryPage;
