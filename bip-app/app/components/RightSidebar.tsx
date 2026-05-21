"use client";

import { Search } from "lucide-react";
import { useState } from "react";

const CATEGORIES = [
  { label: "AI Native",     count: 2345 },
  { label: "B2B SaaS",      count: 3240 },
  { label: "Consumer",      count: 2100 },
  { label: "Manufacturing", count: 1817 },
  { label: "Food & Snack",  count: 1500 },
  { label: "Fintech",       count: 983  },
  { label: "Climate Tech",  count: 612  },
  { label: "Dev Tools",     count: 448  },
  { label: "Health Tech",   count: 267  },
  { label: "Web3",          count: 389  },
];

const MAX = Math.max(...CATEGORIES.map((c) => c.count));

export default function RightSidebar() {
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = search.trim()
    ? CATEGORIES.filter((c) => c.label.toLowerCase().includes(search.toLowerCase()))
    : CATEGORIES;

  return (
    <div
      style={{
        padding: "20px 16px",
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
          gap: "9px",
          background: "var(--bg-input)",
          border: `1px solid ${focused ? "var(--border-mid)" : "var(--border)"}`,
          borderRadius: "10px",
          padding: "9px 13px",
          marginBottom: "28px",
          transition: "border-color 0.15s",
        }}
      >
        <Search size={13} color="var(--text-dim)" strokeWidth={2} />
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

      {/* Heading */}
      <div
        style={{
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--text-dim)",
          marginBottom: "16px",
        }}
      >
        Narratives
      </div>

      {/* Rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {filtered.map((cat) => {
          const isSelected = selected === cat.label;
          const barWidth = Math.round((cat.count / MAX) * 100);

          return (
            <button
              key={cat.label}
              onClick={() => setSelected(isSelected ? null : cat.label)}
              style={{
                position: "relative",
                width: "100%",
                textAlign: "left",
                background: "transparent",
                border: "none",
                borderRadius: "8px",
                padding: "10px 10px",
                cursor: "pointer",
                overflow: "hidden",
              }}
            >
              {/* Background fill bar */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  width: `${barWidth}%`,
                  background: isSelected ? "#1d9bf008" : "var(--bg-subtle)",
                  borderRadius: "8px",
                  transition: "background 0.2s",
                  pointerEvents: "none",
                }}
              />

              {/* Content */}
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: isSelected ? 600 : 400,
                    color: isSelected ? "var(--text)" : "var(--text-muted)",
                    transition: "color 0.15s, font-weight 0.15s",
                  }}
                >
                  {cat.label}
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    color: "var(--text-dim)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {cat.count.toLocaleString()}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
