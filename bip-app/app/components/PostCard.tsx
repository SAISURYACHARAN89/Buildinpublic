"use client";

import { Bookmark, Share2, MoreHorizontal } from "lucide-react";
import { useState, useRef, useEffect } from "react";

// ── Platform logos ────────────────────────────────────────────────────────
const XLogo = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const IgLogo = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <defs>
      <radialGradient id="ig-g1" cx="30%" cy="107%" r="100%">
        <stop offset="0%" stopColor="#fdf497" />
        <stop offset="5%" stopColor="#fdf497" />
        <stop offset="45%" stopColor="#fd5949" />
        <stop offset="60%" stopColor="#d6249f" />
        <stop offset="90%" stopColor="#285AEB" />
      </radialGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#ig-g1)" />
    <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" fill="none" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
  </svg>
);

const RedditLogo = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="#FF4500">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
  </svg>
);

const PLATFORM_LOGOS: Record<string, { logo: React.ReactNode; color: string }> = {
  x:      { logo: <XLogo />,      color: "var(--text)" },
  ig:     { logo: <IgLogo />,     color: "transparent" },
  reddit: { logo: <RedditLogo />, color: "transparent" },
};

interface PostCardProps {
  avatar: string;
  avatarBg?: string;
  avatarText?: string;
  name: string;
  handle: string;
  time: string;
  verified?: boolean;
  isAd?: boolean;
  platform?: string;
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
  platform,
  content,
  mention,
  mediaUrl,
  mediaAlt,
  mediaAspect = "16:9",
  productCard,
}: PostCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [observing, setObserving] = useState(false);
  const [observeHovered, setObserveHovered] = useState(false);

  const contentParts = mention ? content.split(mention) : [content];
  const platformInfo = platform ? PLATFORM_LOGOS[platform] : null;

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
        position: "relative",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
    >
      {/* Platform logo — top right corner */}
      {platformInfo && (
        <div
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            opacity: 0.5,
            color: platformInfo.color,
            lineHeight: 1,
          }}
        >
          {platformInfo.logo}
        </div>
      )}
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px", gap: "8px" }}>
          {/* Left: name, verified, ad, handle, time */}
          <div style={{ display: "flex", alignItems: "center", gap: "5px", minWidth: 0, flexWrap: "wrap" }}>
            <span style={{ fontWeight: 700, fontSize: "15px", color: "var(--text)", whiteSpace: "nowrap" }}>{name}</span>
            {verified && (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="#1d9bf0" style={{ flexShrink: 0 }}>
                <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91C2.88 9.33 2 10.57 2 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.26 3.91.8c.66 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.33-2.19c1.4.46 2.91.2 3.92-.81s1.26-2.52.8-3.91C21.37 14.67 22.25 13.43 22.25 12zm-6.16-1.96l-4.5 4.5a.75.75 0 01-1.06 0l-2.25-2.25a.75.75 0 011.06-1.06l1.72 1.72 3.97-3.97a.75.75 0 011.06 1.06z" />
              </svg>
            )}
            {isAd && (
              <span style={{ fontSize: "11px", color: "var(--text-muted)", border: "1px solid var(--border-mid)", borderRadius: "4px", padding: "1px 5px", lineHeight: 1.4, flexShrink: 0 }}>Ad</span>
            )}
            <span style={{ color: "var(--text-muted)", fontSize: "14px", whiteSpace: "nowrap" }}>{handle}</span>
            <span style={{ color: "var(--text-muted)", fontSize: "14px" }}>·</span>
            <span style={{ color: "var(--text-muted)", fontSize: "14px", whiteSpace: "nowrap" }}>{time}</span>

            {/* + observe inline after time */}
            {!isAd && (
              <button
                onClick={(e) => { e.stopPropagation(); setObserving((v) => !v); }}
                onMouseEnter={() => setObserveHovered(true)}
                onMouseLeave={() => setObserveHovered(false)}
                title={observing ? "Unobserve" : "Observe"}
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  border: `1px solid ${observing && observeHovered ? "#f4212e55" : "var(--border-mid)"}`,
                  background: "transparent",
                  cursor: "pointer",
                  color: observing && observeHovered ? "#f4212e" : observing ? "var(--text-dim)" : "var(--text-muted)",
                  fontSize: "14px",
                  lineHeight: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.15s",
                  padding: 0,
                }}
              >
                {observing ? (observeHovered ? "×" : "✓") : "+"}
              </button>
            )}
          </div>
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
              width: mediaAspect === "9:16" ? "35%" : mediaAspect === "1:1" ? "55%" : "65%",
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
