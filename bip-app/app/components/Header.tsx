"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "48px",
        background: "var(--bg)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        zIndex: 20,
      }}
    >
      {/* Logo + theme toggle */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontSize: "18px", letterSpacing: "0.02em", color: "var(--text)" }}>
            <span style={{ fontWeight: 300 }}>publicly</span>
            <span style={{ fontWeight: 700 }}>Built</span>
          </span>
        </Link>

        {/* Dark / light toggle */}
        <button
          onClick={toggle}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "var(--text-muted)",
            transition: "background 0.15s, color 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "var(--hover-bg)";
            (e.currentTarget as HTMLButtonElement).style.color = "var(--text)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)";
          }}
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>

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
          background: active ? "var(--bg-card)" : "transparent",
          color: active ? "var(--text)" : "var(--text-muted)",
          transition: "background 0.15s, color 0.15s",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          if (!active) {
            (e.currentTarget as HTMLDivElement).style.background = "var(--hover-bg)";
            (e.currentTarget as HTMLDivElement).style.color = "var(--text)";
          }
        }}
        onMouseLeave={(e) => {
          if (!active) {
            (e.currentTarget as HTMLDivElement).style.background = "transparent";
            (e.currentTarget as HTMLDivElement).style.color = "var(--text-muted)";
          }
        }}
      >
        {children}
      </div>
    </Link>
  );
}
