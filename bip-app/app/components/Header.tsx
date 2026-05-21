"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  // Hide-on-scroll-down, show-on-scroll-up
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY <= 0) {
        setVisible(true);
      } else if (currentY < lastScrollY.current) {
        // scrolling up → show
        setVisible(true);
      } else if (currentY > lastScrollY.current + 4) {
        // scrolling down (add small deadzone) → hide
        setVisible(false);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "48px",
        background: "var(--bg)",
        borderBottom: "0.5px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        zIndex: 20,
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.25s ease",
      }}
    >
      {/* Logo + theme toggle + profile icon */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <Link href="/" style={{ textDecoration: "none", marginRight: "4px" }}>
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

        {/* Profile icon — right of the dark mode button */}
        <NavIcon href="/profile" label="Profile" active={pathname === "/profile"}>
          <User size={18} />
        </NavIcon>
      </div>

      {/* Right side — empty for now, future nav items can go here */}
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }} />
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
          width: "30px",
          height: "30px",
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
