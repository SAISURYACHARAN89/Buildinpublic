"use client";

import { Home, User, Bookmark } from "lucide-react";
import { useState } from "react";

const navItems = [
  { icon: Home, label: "Home" },
  { icon: User, label: "Profile" },
  { icon: Bookmark, label: "Saved" },
];

export default function LeftSidebar() {
  const [active, setActive] = useState("Home");

  return (
    <div
      style={{
        width: "56px",
        background: "#0d0d0d",
        borderRight: "1px solid #1e1e1e",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        position: "fixed",
        top: "48px",
        left: 0,
        bottom: 0,
        zIndex: 10,
      }}
    >
      {navItems.map(({ icon: Icon, label }) => (
        <button
          key={label}
          onClick={() => setActive(label)}
          title={label}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: active === label ? "#1e1e1e" : "transparent",
            border: "none",
            cursor: "pointer",
            color: active === label ? "#e7e9ea" : "#555e67",
            transition: "background 0.15s, color 0.15s",
          }}
          onMouseEnter={(e) => {
            if (active !== label) {
              (e.currentTarget as HTMLButtonElement).style.background = "#1a1a1a";
              (e.currentTarget as HTMLButtonElement).style.color = "#e7e9ea";
            }
          }}
          onMouseLeave={(e) => {
            if (active !== label) {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = "#555e67";
            }
          }}
        >
          <Icon size={19} strokeWidth={active === label ? 2.5 : 1.8} />
        </button>
      ))}
    </div>
  );
}
