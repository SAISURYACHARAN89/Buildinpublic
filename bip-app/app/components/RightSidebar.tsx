"use client";

import { Search } from "lucide-react";
import { useState } from "react";

const CATEGORIES = [
  "AI Native",
  "Health Tech",
  "Manufacturing",
  "Food & Snack",
  "Fintech",
  "Climate Tech",
  "Dev Tools",
  "Consumer",
  "B2B SaaS",
  "Web3",
];

export default function RightSidebar() {
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = search.trim()
    ? CATEGORIES.filter((c) => c.toLowerCase().includes(search.toLowerCase()))
    : CATEGORIES;

  return (
    <div
      style={{
        padding: "20px 18px",
        height: "100%",
        overflowY: "auto",
        background: "var(--bg)",
      }}
    >
      {/* Search */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "var(--bg-input)",
          border: `1px solid ${focused ? "var(--text-muted)" : "var(--border-mid)"}`,
          borderRadius: "12px",
          padding: "10px 14px",
          marginBottom: "22px",
          transition: "border-color 0.15s",
        }}
      >
        <Search size={13} color={focused ? "var(--text-muted)" : "var(--text-dim)"} strokeWidth={2.2} />
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
          }}
        />
      </div>

      {/* Section heading */}
      <div
        style={{
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--text-dim)",
          marginBottom: "10px",
        }}
      >
        Trending Startup Narratives
      </div>

      {/* Category rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {filtered.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat === selected ? null : cat)}
            style={{
              width: "100%",
              textAlign: "left",
              background: "var(--bg-card)",
              border: "1px solid var(--border-mid)",
              borderRadius: "10px",
              padding: "11px 14px",
              fontSize: "14px",
              fontWeight: 400,
              color: "var(--text)",
              cursor: "pointer",
              transition: "background 0.12s, border-color 0.12s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "var(--hover-bg)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--text-dim)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-card)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-mid)";
            }}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
