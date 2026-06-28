import "./Card.css";

function NumberCard({ title, value, icon, detail }) {
  const iconContent =
    typeof icon === "string" && /\.(png|svg|jpe?g|webp|gif)$/i.test(icon) ? (
      <img src={icon} alt="" />
    ) : (
      icon
    );

  return (
    <div className="number-card">
      <div className="number-card-body">
        <span className="number-card-title">{title}</span>
        <span className="number-card-value">{value}</span>
        {detail && <span className="number-card-detail">{detail}</span>}
      </div>
      <div className="number-card-icon">{iconContent}</div>
    </div>
  );
}

export default NumberCard;
