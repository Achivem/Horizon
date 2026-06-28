import "../App.css";
import Navbar from "../components/Navbar";
import NumberCard from "../components/NumberCard";

function AdminPage() {
  return (
    <div className="admin-page">
      <Navbar />
      <div className="number-cards-container">
        <NumberCard title="Total Users" value="1,234" icon={null} />
        <NumberCard title="Active Sessions" value="567" icon={null} />
        <NumberCard title="System Status" value="Online" icon={null} />
      </div>
    </div>
  );
}

export default AdminPage;
