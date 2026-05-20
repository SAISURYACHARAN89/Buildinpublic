"use client";

import { Bookmark, Share2, MoreHorizontal } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface PostCardProps {
  avatar: string;
  avatarBg?: string;
  avatarText?: string;
  name: string;
  handle: string;
  time: string;
  verified?: boolean;
  isAd?: boolean;
  content: string;
  mention?: string;
  mediaUrl?: string;
  mediaAlt?: string;
  mediaAspect?: "16:9" | "9:16" | "1:1";
  productCard?: {
    image: string;
    name: string;
    description: string;
    price: string;
    originalPrice: string;
  };
  stats: {
    comments: string;
    reposts: string;
    likes: string;
    views: string;
  };
}

export default function PostCard({
  avatar,
  avatarBg,
  avatarText,
  name,
  handle,
  time,
  verified,
  isAd,
  content,
  mention,
  mediaUrl,
  mediaAlt,
  mediaAspect = "16:9",
  productCard,
}: PostCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const contentParts = mention ? content.split(mention) : [content];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  return (
    <article
      style={{
        borderBottom: "1px solid var(--border)",
        padding: "16px 16px 12px 16px",
        display: "flex",
        gap: "12px",
        cursor: "pointer",
        transition: "background 0.1s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "var(--hover-bg)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "transparent";
      }}
    >
      {/* Avatar */}
      <div style={{ flexShrink: 0 }}>
        {avatarText ? (
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: avatarBg || "#e85d04",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              fontWeight: 700,
              color: "white",
            }}
          >
            {avatarText}
          </div>
        ) : (
          <img
            src={avatar}
            alt={name}
            style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }}
          />
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px", flexWrap: "wrap" }}>
          <span style={{ fontWeight: 700, fontSize: "15px", color: "var(--text)" }}>{name}</span>
          {verified && (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#1d9bf0">
              <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91C2.88 9.33 2 10.57 2 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.26 3.91.8c.66 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.33-2.19c1.4.46 2.91.2 3.92-.81s1.26-2.52.8-3.91C21.37 14.67 22.25 13.43 22.25 12zm-6.16-1.96l-4.5 4.5a.75.75 0 01-1.06 0l-2.25-2.25a.75.75 0 011.06-1.06l1.72 1.72 3.97-3.97a.75.75 0 011.06 1.06z" />
            </svg>
          )}
          {isAd && (
            <span
              style={{
                fontSize: "11px",
                color: "var(--text-muted)",
                border: "1px solid var(--border-mid)",
                borderRadius: "4px",
                padding: "1px 5px",
                lineHeight: 1.4,
              }}
            >
              Ad
            </span>
          )}
          <span style={{ color: "var(--text-muted)", fontSize: "14px" }}>{handle}</span>
          <span style={{ color: "var(--text-muted)", fontSize: "14px" }}>·</span>
          <span style={{ color: "var(--text-muted)", fontSize: "14px" }}>{time}</span>
        </div>

        {/* Text */}
        <div style={{ fontSize: "15px", color: "var(--text)", lineHeight: "1.6", marginBottom: "12px", whiteSpace: "pre-line" }}>
          {mention ? (
            <>
              {contentParts[0]}
              <span style={{ color: "#1d9bf0" }}>{mention}</span>
              {contentParts[1]}
            </>
          ) : (
            content
          )}
        </div>

        {/* Media */}
        {mediaUrl && (
          <div
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              marginBottom: "12px",
              border: "1px solid var(--border)",
              aspectRatio:
                mediaAspect === "9:16" ? "9/16" :
                mediaAspect === "1:1"  ? "1/1"  : "16/9",
              width: mediaAspect === "9:16" ? "56%" : "100%",
            }}
          >
            <img
              src={mediaUrl}
              alt={mediaAlt || "media"}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        )}

        {/* Product Card */}
        {productCard && (
          <div
            style={{
              border: "1px solid var(--border-mid)",
              borderRadius: "12px",
              overflow: "hidden",
              marginBottom: "12px",
              display: "flex",
              gap: "12px",
              padding: "12px",
              background: "var(--bg-card)",
            }}
          >
            <img
              src={productCard.image}
              alt={productCard.name}
              style={{ width: "72px", height: "72px", borderRadius: "8px", objectFit: "cover", flexShrink: 0 }}
            />
            <div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)", marginBottom: "2px" }}>
                {productCard.name}
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "6px" }}>
                {productCard.description}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "15px", fontWeight: 700, color: "var(--text)" }}>{productCard.price}</span>
                <span style={{ fontSize: "13px", color: "var(--text-muted)", textDecoration: "line-through" }}>
                  {productCard.originalPrice}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Action bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "4px",
            marginTop: "8px",
          }}
        >
          <ActionBtn title="Save">
            <Bookmark size={17} />
          </ActionBtn>
          <ActionBtn title="Share">
            <Share2 size={17} />
          </ActionBtn>

          <div ref={menuRef} style={{ position: "relative" }}>
            <ActionBtn title="More" onClick={() => setMenuOpen((v) => !v)}>
              <MoreHorizontal size={17} />
            </ActionBtn>

            {menuOpen && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "calc(100% + 4px)",
                  background: "var(--menu-bg)",
                  border: "1px solid var(--border-mid)",
                  borderRadius: "10px",
                  overflow: "hidden",
                  minWidth: "140px",
                  zIndex: 50,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}
              >
                <button
                  style={{
                    width: "100%",
                    padding: "11px 16px",
                    background: "transparent",
                    border: "none",
                    color: "#f4212e",
                    fontSize: "14px",
                    fontWeight: 500,
                    textAlign: "left",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "var(--hover-bg)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                    <line x1="4" y1="22" x2="4" y2="15" />
                  </svg>
                  Report
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function ActionBtn({
  children,
  title,
  onClick,
}: {
  children: React.ReactNode;
  title: string;
  onClick?: () => void;
}) {
  return (
    <button
      title={title}
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "32px",
        height: "32px",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        color: "var(--text-muted)",
        borderRadius: "50%",
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
      {children}
    </button>
  );
}
