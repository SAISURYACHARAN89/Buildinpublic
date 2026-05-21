"use client";

import { Search } from "lucide-react";
import { useState } from "react";

const CATEGORIES = [
  {
    label: "AI Native",
    count: "2345+",
    subcategories: ["LLM infra", "AI agents", "Code gen", "AI ops"],
  },
  {
    label: "Health Tech",
    count: "267+",
    subcategories: ["Drug monitor", "AI doctors", "Sleep wellness", "AI Radiology"],
  },
  {
    label: "Manufacturing",
    count: "1817+",
    subcategories: ["Robotics", "Supply chain", "Quality AI", "Automation"],
  },
  {
    label: "Food & Snack",
    count: "1500+",
    subcategories: ["D2C brands", "Alt protein", "Beverage", "Ghost kitchens"],
  },
];

export default function RightSidebar() {
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set(["AI Radiology"]));

  const toggle = (item: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(item) ? next.delete(item) : next.add(item);
      return next;
    });
  };

  return (
    <div
      style={{
        padding: "20px 18px",
        height: "100%",
        overflowY: "auto",
        background: "var(--bg)",
      }}
    >
      {/* ── Search ───────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "var(--bg-input)",
          border: `1px solid ${focused ? "var(--text-muted)" : "var(--border-mid)"}`,
          borderRadius: "12px",
          padding: "10px 14px",
          marginBottom: "24px",
          transition: "border-color 0.15s",
        }}
      >
        <Search size={14} color={focused ? "var(--text-muted)" : "var(--text-dim)"} strokeWidth={2} />
        <input
          type="text"
          placeholder="Search founders, startups…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            color: "var(--text)",
            fontSize: "13px",
            width: "100%",
            letterSpacing: "0.01em",
          }}
        />
      </div>

      {/* ── Section title ────────────────────────────────── */}
      <div
        style={{
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--text-dim)",
          marginBottom: "16px",
        }}
      >
        Trending Startup Narratives
      </div>

      {/* ── Category blocks ──────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {CATEGORIES.map((cat) => (
          <div key={cat.label}>
            {/* Category header */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--text)",
                }}
              >
                {cat.label}
              </span>
              <span
                style={{
                  fontSize: "11px",
                  color: "var(--text-dim)",
                }}
              >
                {cat.count}
              </span>
            </div>

            {/* Pill grid */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
              }}
            >
              {cat.subcategories.map((sub) => {
                const active = selected.has(sub);
                return (
                  <button
                    key={sub}
                    onClick={() => toggle(sub)}
                    style={{
                      background: active ? "#1d9bf015" : "var(--bg-card)",
                      border: `1px solid ${active ? "#1d9bf055" : "var(--border-mid)"}`,
                      borderRadius: "20px",
                      padding: "5px 12px",
                      fontSize: "12px",
                      fontWeight: active ? 500 : 400,
                      color: active ? "#1d9bf0" : "var(--text-muted)",
                      cursor: "pointer",
                      transition: "all 0.15s",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--text-dim)";
                        (e.currentTarget as HTMLButtonElement).style.color = "var(--text)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-mid)";
                        (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)";
                      }
                    }}
                  >
                    {sub}
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div
              style={{
                marginTop: "18px",
                height: "0.5px",
                background: "var(--border)",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
