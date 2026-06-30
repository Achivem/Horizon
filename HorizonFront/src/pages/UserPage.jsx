import "../App.css";
import { useState } from "react";
import useAuthStore from "../store/authStore";
import Navbar from "../components/Navbar";
import UserTab from "../components/UserTab";
import PartsView from "../components/PartsView";
import Spaceship from "../components/Spaceship";
import Inventory from "../components/Inventory";
import CreditsCard from "../components/CreditsCard";

function UserPage() {
  const [activeTab, setActiveTab] = useState("STORE");
  const token = useAuthStore((state) => state.token);

  return (
    <div className="interact-page">
      <Navbar
        title={
          activeTab === "STORE"
            ? "[ STATION ]"
            : activeTab === "SHIP"
              ? "[ LAUNCHPAD ]"
              : "[ CREDITS ]"
        }
      />
      <main className="userPage">
        <UserTab activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === "STORE" ? (
          <>
            <PartsView></PartsView>
          </>
        ) : activeTab === "SHIP" ? (
          <div className="ship-layout">
            <Spaceship />
            <Inventory />
          </div>
        ) : (
          <CreditsCard />
        )}
      </main>
    </div>
  );
}

export default UserPage;
