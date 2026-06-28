import "./NumberCard.css";

function NumberCard({ title, value, icon }) {
  return (
    <div className="number-card">
      <div className="number-card-header">
        <h3 className="number-card-title">{title}</h3>
        {icon && <img src={icon} alt={title} className="number-card-icon" />}
      </div>
      <div className="number-card-value">{value}</div>
    </div>
  );
}

export default NumberCard;
