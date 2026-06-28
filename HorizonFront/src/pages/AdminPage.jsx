import "../App.css";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import useAuthStore from "../store/authStore";
import Navbar from "../components/Navbar";
import NumberCard from "../components/NumberCard";
import VisitsChart from "../components/VisitsChart";
import SalesCard from "../components/SalesCard";
import Tab from "../components/Tab";
import ProductCrud from "../components/ProductCrud";
import PeopleIcon from "../assets/People.png";
import SalesIcon from "../assets/Sales.png";
import PartsIcon from "../assets/Parts.png";

const siteVisitsData = [
  { name: "Jan", visits: 820 },
  { name: "Feb", visits: 1040 },
  { name: "Mar", visits: 980 },
  { name: "Apr", visits: 1210 },
  { name: "May", visits: 1380 },
  { name: "Jun", visits: 1150 },
  { name: "Jul", visits: 1520 },
  { name: "Aug", visits: 1675 },
];

const partMarketData = [
  { name: "Cockpits", sales: 84 },
  { name: "Wings", sales: 142 },
  { name: "Hulls", sales: 96 },
  { name: "Thrusters", sales: 118 },
];

function AdminPage() {
  const [activeTab, setActiveTab] = useState("DASH");
  const [parts, setParts] = useState([]);
  const token = useAuthStore((state) => state.token);

  const fetchParts = useCallback(async () => {
    if (!token) return;
    try {
      const res = await axios.get("http://localhost:8000/parts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setParts(res.data);
    } catch (err) {
      console.error("Error loading parts statistics", err);
    }
  }, [token]);

  useEffect(() => {
    let active = true;
    const initFetch = async () => {
      await Promise.resolve();
      if (active) {
        fetchParts();
      }
    };
    initFetch();
    return () => {
      active = false;
    };
  }, [fetchParts]);

  const totalPartsInStock =
    parts.length > 0
      ? parts.reduce((acc, part) => acc + (part.stock || 0), 0)
      : 4760;

  return (
    <div className="interact-page">
      <Navbar title={activeTab === "DASH" ? "[ DASHBOARD ]" : "[ PRODUCT ]"} />
      <main className="admin-dashboard">
        <Tab activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "DASH" ? (
          <>
            <div className="admin-cards-row">
              <NumberCard
                title="Total Captains"
                value="1,024"
                icon={PeopleIcon}
                detail="Active fleet members"
              />
              <NumberCard
                title="Sales"
                value="318"
                icon={SalesIcon}
                detail="Completed this cycle"
              />
              <NumberCard
                title="Parts in Stock"
                value={totalPartsInStock.toLocaleString()}
                icon={PartsIcon}
                detail="Units available"
              />
            </div>
            <div className="admin-dashboard-row">
              <VisitsChart data={siteVisitsData} />
              <SalesCard data={partMarketData} />
            </div>
          </>
        ) : (
          <ProductCrud onPartsChange={setParts} />
        )}
      </main>
    </div>
  );
}

export default AdminPage;
