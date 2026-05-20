"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "48px",
        background: "#0d0d0d",
        borderBottom: "1px solid #1e1e1e",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        zIndex: 20,
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ textDecoration: "none" }}>
        <span style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "0.05em", color: "#e7e9ea" }}>
          BIP
        </span>
      </Link>

      {/* Right nav icons */}
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <NavIcon href="/profile" label="Profile" active={pathname === "/profile"}>
          <User size={19} />
        </NavIcon>
      </div>
    </header>
  );
}

function NavIcon({
  href,
  label,
  active,
  children,
}: {
  href: string;
  label: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} title={label} style={{ textDecoration: "none" }}>
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: active ? "#1e1e1e" : "transparent",
          color: active ? "#e7e9ea" : "#71767b",
          transition: "background 0.15s, color 0.15s",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          if (!active) {
            (e.currentTarget as HTMLDivElement).style.background = "#1a1a1a";
            (e.currentTarget as HTMLDivElement).style.color = "#e7e9ea";
          }
        }}
        onMouseLeave={(e) => {
          if (!active) {
            (e.currentTarget as HTMLDivElement).style.background = "transparent";
            (e.currentTarget as HTMLDivElement).style.color = "#71767b";
          }
        }}
      >
        {children}
      </div>
    </Link>
  );
}
