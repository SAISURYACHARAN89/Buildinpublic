import Header from "../components/Header";
import { Bookmark } from "lucide-react";

export default function SavedPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--text)" }}>
      <Header />
      <div
        style={{
          marginTop: "48px",
          maxWidth: "680px",
          margin: "48px auto 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "80px",
          gap: "12px",
          color: "var(--text-dim)",
        }}
      >
        <Bookmark size={36} strokeWidth={1.5} />
        <p style={{ fontSize: "16px" }}>Nothing saved yet</p>
      </div>
    </div>
  );
}
