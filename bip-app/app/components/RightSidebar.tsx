"use client";

import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const categories = [
  { label: "AI native", count: "2345+", expanded: false, subcategories: [] },
  { label: "Manufacturing", count: "1817+", expanded: false, subcategories: [] },
  { label: "Food snack", count: "1500+", expanded: false, subcategories: [] },
  {
    label: "Health Tech",
    count: "267+",
    expanded: true,
    subcategories: [
      { label: "drug monitor", checked: false },
      { label: "AI doctors", checked: false },
      { label: "sleep wellness", checked: false },
      { label: "petlabs", checked: false },
      { label: "AI Radiology", checked: true },
    ],
  },
];

export default function RightSidebar() {
  const [cats, setCats] = useState(categories);
  const [search, setSearch] = useState("");

  const toggleCategory = (idx: number) => {
    setCats((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, expanded: !c.expanded } : c))
    );
  };

  const toggleSubcat = (catIdx: number, subIdx: number) => {
    setCats((prev) =>
      prev.map((c, i) =>
        i === catIdx
          ? {
              ...c,
              subcategories: c.subcategories.map((s, j) =>
                j === subIdx ? { ...s, checked: !s.checked } : s
              ),
            }
          : c
      )
    );
  };

  return (
    <div
      style={{
        padding: "16px 20px",
        borderLeft: "1px solid #1e1e1e",
        height: "100%",
        overflowY: "auto",
      }}
    >
      {/* Search */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "#161616",
          border: "1px solid #2a2a2a",
          borderRadius: "20px",
          padding: "8px 14px",
          gap: "8px",
          marginBottom: "16px",
        }}
      >
        <Search size={14} color="#555e67" />
        <input
          type="text"
          placeholder="Search founders, startups..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#e7e9ea",
            fontSize: "13px",
            width: "100%",
          }}
        />
      </div>

      {/* Platform filters */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          marginBottom: "20px",
          paddingLeft: "2px",
        }}
      >
        <FilterCheckbox checked label="X" />
        <FilterCheckbox checked label="IG" />
        <FilterCheckbox checked={false} label="Reddit" />
      </div>

      {/* Categories */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {cats.map((cat, idx) => (
          <div key={cat.label}>
            <button
              onClick={() => toggleCategory(idx)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#161616",
                border: "1px solid #2a2a2a",
                borderRadius: cat.expanded && cat.subcategories.length > 0 ? "10px 10px 0 0" : "10px",
                padding: "11px 14px",
                cursor: "pointer",
                color: "#e7e9ea",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "14px", fontWeight: 500 }}>{cat.label}</span>
                <span style={{ fontSize: "12px", color: "#555e67" }}>{cat.count}</span>
              </div>
              {cat.expanded ? (
                <ChevronUp size={14} color="#555e67" />
              ) : (
                <ChevronDown size={14} color="#555e67" />
              )}
            </button>

            {cat.expanded && cat.subcategories.length > 0 && (
              <div
                style={{
                  background: "#111111",
                  border: "1px solid #2a2a2a",
                  borderTop: "none",
                  borderRadius: "0 0 10px 10px",
                  padding: "12px 14px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px 8px",
                }}
              >
                {cat.subcategories.map((sub, subIdx) => (
                  <label
                    key={sub.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      cursor: "pointer",
                    }}
                    onClick={() => toggleSubcat(idx, subIdx)}
                  >
                    <CheckboxIcon checked={sub.checked} />
                    <span style={{ fontSize: "12px", color: "#8b98a5" }}>{sub.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function FilterCheckbox({ checked, label }: { checked: boolean; label: string }) {
  const [isChecked, setIsChecked] = useState(checked);
  return (
    <label
      style={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer" }}
      onClick={() => setIsChecked((v) => !v)}
    >
      <CheckboxIcon checked={isChecked} />
      <span style={{ color: isChecked ? "#e7e9ea" : "#555e67", fontSize: "13px", fontWeight: 500 }}>
        {label}
      </span>
    </label>
  );
}

function CheckboxIcon({ checked }: { checked: boolean }) {
  return (
    <div
      style={{
        width: "14px",
        height: "14px",
        borderRadius: "3px",
        border: checked ? "none" : "1.5px solid #444",
        background: checked ? "#1d9bf0" : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {checked && (
        <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
          <path
            d="M1 3.5L3.5 6L8 1"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}
