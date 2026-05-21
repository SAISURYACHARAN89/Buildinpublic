"use client";

import { Search } from "lucide-react";
import { useState } from "react";

const CATEGORIES = [
  { label: "AI Native",     count: "2,345" },
  { label: "B2B SaaS",      count: "3,240" },
  { label: "Consumer",      count: "2,100" },
  { label: "Manufacturing", count: "1,817" },
  { label: "Food & Snack",  count: "1,500" },
  { label: "Fintech",       count: "983"   },
  { label: "Climate Tech",  count: "612"   },
  { label: "Dev Tools",     count: "448"   },
  { label: "Health Tech",   count: "267"   },
  { label: "Web3",          count: "389"   },
];

export default function RightSidebar() {
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const filtered = search.trim()
    ? CATEGORIES.filter((c) => c.label.toLowerCase().includes(search.toLowerCase()))
    : CATEGORIES;

  const visible = showAll ? filtered : filtered.slice(0, 5);

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
          marginBottom: "24px",
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

      {/* Section heading */}
      <div
        style={{
          fontSize: "15px",
          fontWeight: 600,
          color: "var(--text)",
          marginBottom: "14px",
        }}
      >
        Trending Narratives
      </div>

      {/* Rows */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {visible.map((cat, i) => (
          <button
            key={cat.label}
            onClick={() => setSelected(selected === cat.label ? null : cat.label)}
            style={{
              width: "100%",
              textAlign: "left",
              background: "transparent",
              border: "none",
              borderBottom: i < visible.length - 1 ? "0.5px solid var(--border)" : "none",
              padding: "12px 8px",
              cursor: "pointer",
              transition: "background 0.15s",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "8px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "var(--hover-bg)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: selected === cat.label ? 600 : 500,
                  color: selected === cat.label ? "var(--text)" : "var(--text-muted)",
                  transition: "color 0.15s",
                }}
              >
                {cat.label}
              </div>
              <div style={{ fontSize: "11px", color: "var(--text-dim)", marginTop: "2px" }}>
                {cat.count} startups
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Show more / less */}
      {filtered.length > 5 && (
        <button
          onClick={() => setShowAll((v) => !v)}
          style={{
            marginTop: "10px",
            background: "transparent",
            border: "none",
            color: "#1d9bf0",
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
            padding: "4px 8px",
          }}
        >
          {showAll ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}


const CATEGORIES = [
  { label: "AI Native",     count: "2,345", trend: "+12%" },
  { label: "B2B SaaS",      count: "3,240", trend: "+8%"  },
  { label: "Consumer",      count: "2,100", trend: "+5%"  },
  { label: "Manufacturing", count: "1,817", trend: "+3%"  },
  { label: "Food & Snack",  count: "1,500", trend: "+6%"  },
  { label: "Fintech",       count: "983",   trend: "+9%"  },
  { label: "Climate Tech",  count: "612",   trend: "+18%" },
  { label: "Dev Tools",     count: "448",   trend: "+14%" },
  { label: "Health Tech",   count: "267",   trend: "+7%"  },
  { label: "Web3",          count: "389",   trend: "-2%"  },
];

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
          marginBottom: "24px",
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

      {/* Section heading */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "7px",
          marginBottom: "12px",
        }}
      >
        <TrendingUp size={13} color="var(--text-dim)" strokeWidth={2} />
        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.09em",
            textTransform: "uppercase",
            color: "var(--text-dim)",
          }}
        >
          Trending Narratives
        </span>
      </div>

      {/* Rows */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {filtered.map((cat, i) => {
          const isSelected = selected === cat.label;
          const isNeg = cat.trend.startsWith("-");

          return (
            <button
              key={cat.label}
              onClick={() => setSelected(isSelected ? null : cat.label)}
              style={{
                width: "100%",
                textAlign: "left",
                background: isSelected ? "var(--bg-card)" : "transparent",
                border: "none",
                borderBottom: i < filtered.length - 1 ? "0.5px solid var(--border)" : "none",
                padding: "12px 8px",
                cursor: "pointer",
                transition: "background 0.15s",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "8px",
              }}
              onMouseEnter={(e) => {
                if (!isSelected)
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--hover-bg)";
              }}
              onMouseLeave={(e) => {
                if (!isSelected)
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
            >
              {/* Left: rank + label */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
                <span
                  style={{
                    fontSize: "12px",
                    color: "var(--text-dim)",
                    fontVariantNumeric: "tabular-nums",
                    width: "16px",
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </span>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: isSelected ? 600 : 500,
                      color: isSelected ? "var(--text)" : "var(--text-muted)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      transition: "color 0.15s",
                    }}
                  >
                    {cat.label}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "var(--text-dim)",
                      marginTop: "1px",
                    }}
                  >
                    {cat.count} startups
                  </div>
                </div>
              </div>

              {/* Right: trend */}
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: isNeg ? "#f4212e" : "#00ba7c",
                  flexShrink: 0,
                }}
              >
                {cat.trend}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
