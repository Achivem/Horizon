import "./Spaceship.css";
import ShipBlueprint from "../assets/ShipBlueprint.png";

function Spaceship() {
  return (
    <div className="spaceship-panel">
      <div
        className="spaceship-bg"
        style={{ backgroundImage: `url(${ShipBlueprint})` }}
      />
      <div className="spaceship-content">
        <h2 className="spaceship-title">YOUR SHIP</h2>
        <div className="ship-slots-grid">
          <div className="ship-slot ship-slot-star-wing" />
          <div className="ship-slot ship-slot-cockpit" />
          <div className="ship-slot ship-slot-hull" />
          <div className="ship-slot ship-slot-thruster" />
          <div className="ship-slot ship-slot-port-wing" />
        </div>
      </div>
    </div>
  );
}

export default Spaceship;
