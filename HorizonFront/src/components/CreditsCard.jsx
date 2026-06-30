import { useState } from "react";
import axios from "axios";
import useAuthStore from "../store/authStore";
import MoneySmall from "../assets/Money-Small.png";
import MoneyMedium from "../assets/Money-Medium.png";
import MoneyLarge from "../assets/Money-Large.png";
import "./CreditsCard.css";

const creditPacks = [
  { id: "small", amount: 500, icon: MoneySmall },
  { id: "medium", amount: 1200, icon: MoneyMedium },
  { id: "large", amount: 2800, icon: MoneyLarge },
];

function CreditsCard() {
  return (
    <div className="credits-pack-row">
      {creditPacks.map((pack) => (
        <div key={pack.id} className="credit-pack">
          <img
            className="credit-pack-icon"
            src={pack.icon}
            alt={`${pack.amount} credits`}
          />
          <div className="credit-pack-value">
            {pack.amount.toLocaleString()}
          </div>
          <div className="credit-pack-unit">CREDITS</div>
          <button type="button" className="credit-buy-btn">
            PURCHASE
          </button>
        </div>
      ))}
    </div>
  );
}

export default CreditsCard;
