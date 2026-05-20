import Header from "./components/Header";
import RightSidebar from "./components/RightSidebar";
import Feed from "./components/Feed";

export default function Home() {
  return (
    <div style={{ background: "#0d0d0d", minHeight: "100vh", color: "#e7e9ea" }}>
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
        {/* Feed — 62% */}
        <main
          style={{
            flex: "0 0 62%",
            borderRight: "1px solid #1e1e1e",
            overflowY: "auto",
            height: "100%",
          }}
        >
          <Feed />
        </main>

        {/* Right Panel — 38% */}
        <aside
          style={{
            flex: "0 0 38%",
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
