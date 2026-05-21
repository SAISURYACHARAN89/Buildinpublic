"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Sun, Moon, ChevronDown, Check } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useHeader } from "../context/HeaderContext";
import { useState, useRef, useEffect } from "react";

const FEED_OPTIONS = ["For you", "Following"];

export default function Header() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  const { visible } = useHeader();

  const [feedTab, setFeedTab] = useState("For you");
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    }
    if (dropOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropOpen]);

  return (
    <div
      style={{
        height: "48px",
        background: "var(--bg)",
        borderBottom: "0.5px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        flexShrink: 0,
        position: "sticky",
        top: visible ? 0 : "-48px",
        zIndex: 20,
        transition: "top 0.25s ease",
        overflow: "visible",
      }}
    >
      {/* Left: For you / Following dropdown */}
      <div ref={dropRef} style={{ position: "relative" }}>
        <button
          onClick={() => setDropOpen((o) => !o)}
          style={{
            display: "flex", alignItems: "center", gap: "5px",
            background: "transparent", border: "none", cursor: "pointer",
            color: "var(--text)", fontSize: "14px", fontWeight: 600,
            padding: "6px 10px", borderRadius: "8px",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--hover-bg)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
        >
          {feedTab}
          <ChevronDown
            size={13}
            color="var(--text-muted)"
            style={{
              transform: dropOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
            }}
          />
        </button>

        {dropOpen && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 6px)",
              left: 0,
              background: "var(--menu-bg)",
              border: "1px solid var(--border-mid)",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              minWidth: "160px",
              zIndex: 100,
            }}
          >
            {FEED_OPTIONS.map((opt) => {
              const active = feedTab === opt;
              return (
                <button
                  key={opt}
                  onClick={() => { setFeedTab(opt); setDropOpen(false); }}
                  style={{
                    width: "100%", display: "flex", alignItems: "center",
                    justifyContent: "space-between",
                    padding: "11px 16px",
                    background: "transparent", border: "none", cursor: "pointer",
                    color: active ? "var(--text)" : "var(--text-muted)",
                    fontSize: "14px", fontWeight: active ? 600 : 400,
                    transition: "background 0.1s",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--hover-bg)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                >
                  {opt}
                  {active && <Check size={13} color="#1d9bf0" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Center: Logo */}
      <Link href="/" style={{ textDecoration: "none", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
        <span style={{ fontSize: "18px", letterSpacing: "0.02em", color: "var(--text)", whiteSpace: "nowrap" }}>
          <span style={{ fontWeight: 300 }}>publicly</span>
          <span style={{ fontWeight: 700 }}>Built</span>
        </span>
      </Link>

      {/* Right: dark mode + profile */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <button
          onClick={toggle}
          title={isDark ? "Light mode" : "Dark mode"}
          style={{
            width: "30px", height: "30px", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "transparent", border: "none", cursor: "pointer",
            color: "var(--text-muted)", transition: "background 0.15s, color 0.15s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--hover-bg)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)"; }}
        >
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        <NavIcon href="/profile" label="Profile" active={pathname === "/profile"}>
          <User size={17} />
        </NavIcon>
      </div>
    </div>
  );
}

function NavIcon({ href, label, active, children }: { href: string; label: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link href={href} title={label} style={{ textDecoration: "none" }}>
      <div
        style={{
          width: "30px", height: "30px", borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: active ? "var(--bg-card)" : "transparent",
          color: active ? "var(--text)" : "var(--text-muted)",
          transition: "background 0.15s, color 0.15s", cursor: "pointer",
        }}
        onMouseEnter={(e) => { if (!active) { (e.currentTarget as HTMLDivElement).style.background = "var(--hover-bg)"; (e.currentTarget as HTMLDivElement).style.color = "var(--text)"; } }}
        onMouseLeave={(e) => { if (!active) { (e.currentTarget as HTMLDivElement).style.background = "transparent"; (e.currentTarget as HTMLDivElement).style.color = "var(--text-muted)"; } }}
      >
        {children}
      </div>
    </Link>
  );
}
