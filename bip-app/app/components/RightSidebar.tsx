"use client";

import { Search } from "lucide-react";
import { useState } from "react";

const CATEGORIES = [
  { label: "AI Native",       count: "2,345+" },
  { label: "Health Tech",     count: "267+"   },
  { label: "Manufacturing",   count: "1,817+" },
  { label: "Food & Snack",    count: "1,500+" },
  { label: "Fintech",         count: "983+"   },
  { label: "Climate Tech",    count: "612+"   },
  { label: "Dev Tools",       count: "448+"   },
  { label: "Consumer",        count: "2,100+" },
  { label: "B2B SaaS",        count: "3,240+" },
  { label: "Web3",            count: "389+"   },
];

export default function RightSidebar() {
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set(["AI Native"]));

  const toggle = (label: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  };

  const filtered = search.trim()
    ? CATEGORIES.filter((c) => c.label.toLowerCase().includes(search.toLowerCase()))
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
      {/* ── Search ─────────────────────────────────────── */}
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

      {/* ── Section heading ────────────────────────────── */}
      <div
        style={{
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--text-dim)",
          marginBottom: "14px",
        }}
      >
        Trending Startup Narratives
      </div>

      {/* ── Pill grid ──────────────────────────────────── */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {filtered.map((cat) => {
          const active = selected.has(cat.label);
          return (
            <button
              key={cat.label}
              onClick={() => toggle(cat.label)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: active ? "#1d9bf010" : "var(--bg-card)",
                border: `1px solid ${active ? "#1d9bf055" : "var(--border-mid)"}`,
                borderRadius: "20px",
                padding: "6px 13px",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--text-dim)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-mid)";
                }
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: active ? 600 : 400,
                  color: active ? "#1d9bf0" : "var(--text)",
                }}
              >
                {cat.label}
              </span>
              <span
                style={{
                  fontSize: "11px",
                  color: active ? "#1d9bf088" : "var(--text-dim)",
                }}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
