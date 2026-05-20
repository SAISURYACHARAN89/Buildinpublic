import Header from "./components/Header";
import RightSidebar from "./components/RightSidebar";
import Feed from "./components/Feed";

export default function Home() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--text)" }}>
      <Header />

      {/* Content area below header */}
      <div
        style={{
          marginTop: "48px",
          display: "flex",
          height: "calc(100vh - 48px)",
          overflow: "hidden",
        }}
      >
        {/* Feed — 72%, with horizontal padding for breathing room */}
        <main
          style={{
            flex: "0 0 72%",
            borderRight: "0.5px solid var(--border)",
            overflowY: "auto",
            height: "100%",
            paddingLeft: "24px",
            paddingRight: "24px",
          }}
        >
          <Feed />
        </main>

        {/* Right Panel — 28% */}
        <aside
          style={{
            flex: "0 0 28%",
            height: "100%",
            overflowY: "auto",
          }}
        >
          <RightSidebar />
        </aside>
      </div>
    </div>
  );
}
