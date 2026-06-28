import "./SalesCard.css";

function SalesCard({ data, title = "Part Market" }) {
  const maxSales = Math.max(...data.map((item) => item.sales), 1);

  return (
    <section className="sales-card-panel">
      <h2 className="sales-card-title">{title}</h2>
      <div className="sales-card-bars">
        {data.map((item) => (
          <div key={item.name} className="sales-bar-row">
            <span className="sales-bar-label">{item.name}</span>
            <div className="sales-bar-track">
              <div
                className="sales-bar-fill"
                style={{ width: `${(item.sales / maxSales) * 100}%` }}
              />
            </div>
            <span className="sales-bar-value">{item.sales.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SalesCard;
