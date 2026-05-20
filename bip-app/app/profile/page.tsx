"use client";

import Header from "../components/Header";
import { useState, useRef, useEffect } from "react";
import { X, Bookmark, Plus, Check, Camera } from "lucide-react";

// ── icons ──────────────────────────────────────────────────────────────────
const XIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const IgIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const RedditIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
  </svg>
);

// ── platform config ────────────────────────────────────────────────────────
const PLATFORM_CONFIG: Record<string, { label: string; color: string; bg: string; icon: (s?: number) => React.ReactNode; prefix: string }> = {
  x:      { label: "X",         color: "#e7e9ea", bg: "#1a1a1a",  icon: (s) => <XIcon size={s} />,      prefix: "@" },
  ig:     { label: "Instagram", color: "#e1306c", bg: "#1f1015",  icon: (s) => <IgIcon size={s} />,     prefix: "@" },
  reddit: { label: "Reddit",    color: "#ff4500", bg: "#1a1208",  icon: (s) => <RedditIcon size={s} />, prefix: "u/" },
};

// ── posts data ─────────────────────────────────────────────────────────────
const allPosts = [
  { id: 1,  platform: "x",      content: "Just shipped a new feature that cuts load time by 60%. The trick was lazy loading combined with edge caching. Thread below 👇", time: "2h" },
  { id: 2,  platform: "ig",     content: "Golden hour at the office. Sometimes the best ideas come when you step away from the screen. 🌅", time: "5h", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&q=80" },
  { id: 3,  platform: "reddit", content: "Asked r/startups about the best way to validate a B2B idea before building. Got 200+ responses. The consensus: talk to 20 potential customers before writing a single line of code.", time: "8h" },
  { id: 4,  platform: "x",      content: "Hot take: Most developer tools are built for developers who like complexity. The real opportunity is tools for developers who value simplicity.", time: "1d" },
  { id: 5,  platform: "ig",     content: "Team lunch to celebrate hitting 10K users. Grateful for this crew. 🎉", time: "2d", image: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=600&h=400&fit=crop&q=80" },
  { id: 6,  platform: "reddit", content: "Posted a deep dive on how we reduced our AWS bill by 40% without sacrificing performance. Link in comments.", time: "3d" },
];

const savedPosts = [
  { id: 101, platform: "x",  content: "The best startups don't find product-market fit. They create it by shaping what the market wants.", time: "3h" },
  { id: 102, platform: "ig", content: "Morning routine that changed everything: no phone for the first hour. Just coffee and thinking.", time: "1d", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop&q=80" },
];

const TABS = [
  { id: "all",    label: "All" },
  { id: "x",      label: "X" },
  { id: "ig",     label: "Instagram" },
  { id: "reddit", label: "Reddit" },
  { id: "saved",  label: "Saved" },
];

// ── main component ─────────────────────────────────────────────────────────
export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("all");
  const [editOpen, setEditOpen] = useState(false);

  const [profile, setProfile] = useState({
    name: "John Doe",
    handle: "johndoe",
    bio: "Building things on the internet. Founder @startupxyz. Prev @bigtech. Obsessed with developer tools and great UX.",
    banner: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    avatar: "linear-gradient(135deg, #667eea, #764ba2)",
    bannerIsImage: false,
    avatarIsImage: false,
  });
  const [draft, setDraft] = useState(profile);

  // connected platforms as state so + button can add/remove
  const [connected, setConnected] = useState<{ id: string; handle: string }[]>([
    { id: "x",      handle: "@johndoe" },
    { id: "ig",     handle: "@johndoe" },
    { id: "reddit", handle: "u/johndoe" },
  ]);

  const [confirmDisconnect, setConfirmDisconnect] = useState<string | null>(null);
  const confirmRef = useRef<HTMLDivElement>(null);

  // close disconnect popover on outside click — but NOT on clicks inside the popover
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (confirmRef.current && !confirmRef.current.contains(e.target as Node)) {
        setConfirmDisconnect(null);
      }
    }
    if (confirmDisconnect) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [confirmDisconnect]);

  const connectedIds = connected.map((c) => c.id);

  const postsToShow =
    activeTab === "saved"  ? savedPosts
    : activeTab === "all"  ? allPosts.filter((p) => connectedIds.includes(p.platform))
    : allPosts.filter((p) => p.platform === activeTab);

  return (
    <div style={{ background: "#0d0d0d", minHeight: "100vh", color: "#e7e9ea" }}>
      <Header />

      <div style={{ maxWidth: "880px", width: "100%", margin: "48px auto 0" }}>
        {/* Cover */}
        <div style={{
          height: "160px",
          width: "100%",
          background: profile.bannerIsImage ? "none" : profile.banner,
          backgroundImage: profile.bannerIsImage ? `url(${profile.banner})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />

        {/* Profile info */}
        <div style={{ padding: "0 40px" }}>
          {/* Avatar + Edit row */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: "-36px", marginBottom: "12px" }}>
            <div style={{ width: "72px", height: "72px", borderRadius: "50%", border: "3px solid #0d0d0d", overflow: "hidden", flexShrink: 0 }}>
              {profile.avatarIsImage ? (
                <img src={profile.avatar} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: profile.avatar, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", fontWeight: 700, color: "white" }}>
                  {profile.name.charAt(0)}
                </div>
              )}
            </div>
            <button
              onClick={() => { setDraft(profile); setEditOpen(true); }}
              style={{ background: "transparent", border: "1px solid #2f3336", borderRadius: "20px", padding: "7px 16px", color: "#e7e9ea", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#1a1a1a")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              Edit profile
            </button>
          </div>

          {/* Name & bio */}
          <div style={{ marginBottom: "16px" }}>
            <div style={{ fontSize: "18px", fontWeight: 700, color: "#e7e9ea", marginBottom: "2px" }}>{profile.name}</div>
            <div style={{ fontSize: "14px", color: "#71767b", marginBottom: "10px" }}>@{profile.handle}</div>
            <div style={{ fontSize: "14px", color: "#c4cdd6", lineHeight: 1.6 }}>{profile.bio}</div>
          </div>

          {/* Connected platforms */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "11px", color: "#555e67", fontWeight: 600, marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.07em" }}>
              Connected platforms
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
              {connected.map((p) => {
                const cfg = PLATFORM_CONFIG[p.id];
                const isConfirming = confirmDisconnect === p.id;
                return (
                  <div key={p.id} style={{ position: "relative" }}>
                    {/* Platform pill */}
                    <button
                      onClick={() => setConfirmDisconnect(isConfirming ? null : p.id)}
                      style={{ display: "flex", alignItems: "center", gap: "7px", background: cfg.bg, border: `1px solid ${isConfirming ? cfg.color : cfg.color + "33"}`, borderRadius: "20px", padding: "6px 12px", color: cfg.color, cursor: "pointer", transition: "border 0.15s" }}
                    >
                      {cfg.icon(14)}
                      <span style={{ fontSize: "13px", fontWeight: 500 }}>{p.handle}</span>
                    </button>

                    {/* Inline confirm popover */}
                    {isConfirming && (
                      <div
                        ref={confirmRef}
                        style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, background: "#1a1a1a", border: "1px solid #2f3336", borderRadius: "10px", padding: "8px 10px", zIndex: 50, boxShadow: "0 6px 20px rgba(0,0,0,0.6)", display: "flex", alignItems: "center", gap: "8px", whiteSpace: "nowrap" }}
                      >
                        <span style={{ fontSize: "12px", color: "#a8b3bc" }}>Disconnect {cfg.label}?</span>
                        {/* Confirm tick */}
                        <button
                          onMouseDown={(e) => {
                            e.stopPropagation();
                            setConnected((c) => c.filter((x) => x.id !== p.id));
                            setConfirmDisconnect(null);
                          }}
                          title="Yes, disconnect"
                          style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#f4212e22", border: "1px solid #f4212e55", color: "#f4212e", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                        >
                          <Check size={12} />
                        </button>
                        {/* Cancel X */}
                        <button
                          onMouseDown={(e) => {
                            e.stopPropagation();
                            setConfirmDisconnect(null);
                          }}
                          title="Cancel"
                          style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#2f333622", border: "1px solid #2f3336", color: "#71767b", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                        >
                          <X size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
              <AddPlatformButton connected={connected} onAdd={(id, handle) => setConnected((c) => [...c, { id, handle }])} />
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: "1px solid #1e1e1e" }}>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{ background: "transparent", border: "none", borderBottom: activeTab === tab.id ? "2px solid #1d9bf0" : "2px solid transparent", padding: "12px 18px", color: activeTab === tab.id ? "#e7e9ea" : "#71767b", fontSize: "14px", fontWeight: activeTab === tab.id ? 600 : 400, cursor: "pointer", marginBottom: "-1px", display: "flex", alignItems: "center", gap: "6px" }}
              >
                {tab.id === "saved" && <Bookmark size={13} />}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Posts */}
        <div>
          {postsToShow.length === 0 && (
            <div style={{ padding: "48px 40px", color: "#555e67", fontSize: "14px", textAlign: "center" }}>Nothing here yet.</div>
          )}
          {postsToShow.map((post) => {
            const cfg = PLATFORM_CONFIG[post.platform];
            return (
              <div
                key={post.id}
                style={{ borderBottom: "1px solid #1e1e1e", padding: "16px 40px", cursor: "pointer", transition: "background 0.1s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.background = "#0f0f0f")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.background = "transparent")}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px", color: cfg?.color ?? "#71767b" }}>
                  {cfg?.icon(14)}
                  <span style={{ fontSize: "12px", fontWeight: 500 }}>{cfg?.label}</span>
                  <span style={{ color: "#555e67", fontSize: "12px" }}>· {post.time}</span>
                </div>
                <div style={{ fontSize: "14px", color: "#c4cdd6", lineHeight: 1.6 }}>{post.content}</div>
                {post.image && (
                  <div style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid #1e1e1e", marginTop: "10px" }}>
                    <img src={post.image} alt="post media" style={{ width: "100%", display: "block", maxHeight: "260px", objectFit: "cover" }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {editOpen && (
        <EditModal
          draft={draft}
          setDraft={setDraft}
          onSave={() => { setProfile(draft); setEditOpen(false); }}
          onClose={() => setEditOpen(false)}
        />
      )}
    </div>
  );
}

// ── Add Platform Button ────────────────────────────────────────────────────
function AddPlatformButton({ connected, onAdd }: { connected: { id: string; handle: string }[]; onAdd: (id: string, handle: string) => void }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"pick" | "handle">("pick");
  const [picked, setPicked] = useState("");
  const [handle, setHandle] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const available = Object.keys(PLATFORM_CONFIG).filter((id) => !connected.find((c) => c.id === id));

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false); setStep("pick"); setPicked(""); setHandle("");
      }
    }
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  if (available.length === 0) return null;

  const cfg = picked ? PLATFORM_CONFIG[picked] : null;

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => { setOpen((v) => !v); setStep("pick"); setPicked(""); setHandle(""); }}
        title="Add platform"
        style={{ width: "30px", height: "30px", borderRadius: "50%", border: "1.5px dashed #2f3336", background: "transparent", color: "#71767b", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "border-color 0.15s, color 0.15s" }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#e7e9ea"; e.currentTarget.style.color = "#e7e9ea"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#2f3336"; e.currentTarget.style.color = "#71767b"; }}
      >
        <Plus size={14} />
      </button>

      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, background: "#161616", border: "1px solid #2f3336", borderRadius: "12px", minWidth: "200px", zIndex: 50, overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.6)" }}>
          {step === "pick" && (
            <>
              <div style={{ padding: "10px 14px 6px", fontSize: "11px", color: "#555e67", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Add platform</div>
              {available.map((id) => {
                const c = PLATFORM_CONFIG[id];
                return (
                  <button
                    key={id}
                    onClick={() => { setPicked(id); setHandle(c.prefix); setStep("handle"); }}
                    style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", background: "transparent", border: "none", color: c.color, cursor: "pointer", fontSize: "14px", fontWeight: 500 }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#1e1e1e")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    {c.icon(15)}
                    {c.label}
                  </button>
                );
              })}
            </>
          )}

          {step === "handle" && cfg && (
            <div style={{ padding: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                <button onClick={() => setStep("pick")} style={{ background: "transparent", border: "none", color: "#71767b", cursor: "pointer", padding: "2px", display: "flex" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                </button>
                <span style={{ color: cfg.color, fontSize: "13px", fontWeight: 600, display: "flex", alignItems: "center", gap: "5px" }}>{cfg.icon(13)} {cfg.label}</span>
              </div>
              <input
                autoFocus
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder={`${cfg.prefix}username`}
                style={{ width: "100%", background: "#1a1a1a", border: "1px solid #2f3336", borderRadius: "8px", padding: "8px 10px", color: "#e7e9ea", fontSize: "13px", outline: "none", marginBottom: "10px" }}
              />
              <button
                onClick={() => {
                  if (handle.trim() && handle.trim() !== cfg.prefix) {
                    onAdd(picked, handle.trim());
                    setOpen(false); setStep("pick"); setPicked(""); setHandle("");
                  }
                }}
                style={{ width: "100%", background: "#1d9bf0", border: "none", borderRadius: "8px", padding: "8px", color: "white", fontSize: "13px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
              >
                <Check size={13} /> Connect
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Edit Modal ─────────────────────────────────────────────────────────────
function EditModal({ draft, setDraft, onSave, onClose }: {
  draft: { name: string; handle: string; bio: string; banner: string; avatar: string; avatarIsImage: boolean; bannerIsImage: boolean };
  setDraft: React.Dispatch<React.SetStateAction<typeof draft>>;
  onSave: () => void;
  onClose: () => void;
}) {
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  function handleImageUpload(field: "banner" | "avatar", file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      if (field === "banner") setDraft((d) => ({ ...d, banner: url, bannerIsImage: true }));
      else setDraft((d) => ({ ...d, avatar: url, avatarIsImage: true }));
    };
    reader.readAsDataURL(file);
  }

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: "#141414", border: "1px solid #2f3336", borderRadius: "16px", width: "100%", maxWidth: "500px", overflow: "hidden", maxHeight: "90vh", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: "1px solid #1e1e1e", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <button onClick={onClose}
              style={{ background: "transparent", border: "none", cursor: "pointer", color: "#e7e9ea", display: "flex", padding: "4px", borderRadius: "50%" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#1e1e1e")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <X size={18} />
            </button>
            <span style={{ fontSize: "16px", fontWeight: 700 }}>Edit profile</span>
          </div>
          <button onClick={onSave}
            style={{ background: "#e7e9ea", border: "none", borderRadius: "20px", padding: "7px 18px", color: "#0d0d0d", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Save
          </button>
        </div>

        <div style={{ overflowY: "auto", flex: 1 }}>
          {/* Banner — click to upload */}
          <div style={{ position: "relative", cursor: "pointer" }} onClick={() => bannerInputRef.current?.click()}>
            <div style={{
              height: "110px",
              width: "100%",
              background: draft.bannerIsImage ? "none" : draft.banner,
              backgroundImage: draft.bannerIsImage ? `url(${draft.banner})` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              {/* hover overlay */}
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", color: "white", fontSize: "13px", fontWeight: 500 }}>
                <Camera size={16} />
                Change banner
              </div>
            </div>
            <input ref={bannerInputRef} type="file" accept="image/*" style={{ display: "none" }}
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload("banner", f); e.target.value = ""; }}
            />

            {/* Avatar — click to upload */}
            <div
              style={{ position: "absolute", bottom: "-28px", left: "20px", width: "60px", height: "60px", borderRadius: "50%", border: "3px solid #141414", overflow: "hidden", cursor: "pointer", flexShrink: 0 }}
              onClick={(e) => { e.stopPropagation(); avatarInputRef.current?.click(); }}
            >
              {draft.avatarIsImage ? (
                <img src={draft.avatar} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: draft.avatar, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: 700, color: "white" }}>
                  {draft.name.charAt(0)}
                </div>
              )}
              {/* overlay */}
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Camera size={14} color="white" />
              </div>
            </div>
            <input ref={avatarInputRef} type="file" accept="image/*" style={{ display: "none" }}
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload("avatar", f); e.target.value = ""; }}
            />
          </div>

          {/* Form fields */}
          <div style={{ padding: "44px 20px 20px" }}>
            <Field label="Name"   value={draft.name}   onChange={(v) => setDraft((d) => ({ ...d, name: v }))} />
            <Field label="Handle" value={draft.handle} onChange={(v) => setDraft((d) => ({ ...d, handle: v }))} prefix="@" />
            <Field label="Bio"    value={draft.bio}    onChange={(v) => setDraft((d) => ({ ...d, bio: v }))}   multiline />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Field ──────────────────────────────────────────────────────────────────
function Field({ label, value, onChange, prefix, multiline }: { label: string; value: string; onChange: (v: string) => void; prefix?: string; multiline?: boolean }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ display: "block", fontSize: "12px", color: "#71767b", marginBottom: "6px", fontWeight: 500 }}>{label}</label>
      <div style={{ display: "flex", alignItems: multiline ? "flex-start" : "center", background: "#1a1a1a", border: "1px solid #2f3336", borderRadius: "8px", padding: "10px 12px", gap: "4px" }}>
        {prefix && <span style={{ color: "#71767b", fontSize: "14px", flexShrink: 0 }}>{prefix}</span>}
        {multiline ? (
          <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3}
            style={{ background: "transparent", border: "none", outline: "none", color: "#e7e9ea", fontSize: "14px", width: "100%", resize: "none", fontFamily: "inherit", lineHeight: 1.5 }} />
        ) : (
          <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
            style={{ background: "transparent", border: "none", outline: "none", color: "#e7e9ea", fontSize: "14px", width: "100%" }} />
        )}
      </div>
    </div>
  );
}
