"use client";

import { useRef } from "react";
import Header from "./components/Header";
import RightSidebar from "./components/RightSidebar";
import Feed from "./components/Feed";
import { HeaderProvider, useHeader } from "./context/HeaderContext";

function HomeLayout() {
  const feedRef = useRef<HTMLElement>(null);
  const { setVisible } = useHeader();
  const lastY = useRef(0);

  const handleScroll = () => {
    const el = feedRef.current;
    if (!el) return;
    const y = el.scrollTop;
    if (y <= 0) {
      setVisible(true);
    } else if (y < lastY.current) {
      // scrolling up
      setVisible(true);
    } else if (y > lastY.current + 4) {
      // scrolling down
      setVisible(false);
    }
    lastY.current = y;
  };

  return (
    <div
      style={{
        background: "var(--bg)",
        height: "100vh",
        display: "flex",
        overflow: "hidden",
        color: "var(--text)",
      }}
    >
      {/* Feed column — 72% — contains its own sticky header */}
      <main
        ref={feedRef}
        onScroll={handleScroll}
        style={{
          flex: "0 0 72%",
          borderRight: "0.5px solid var(--border)",
          overflowY: "auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header lives here — sticky inside the scroll container */}
        <Header />
        <Feed />
      </main>

      {/* Right sidebar — full height from very top of screen, no top offset */}
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
  );
}

export default function Home() {
  return (
    <HeaderProvider>
      <HomeLayout />
    </HeaderProvider>
  );
}
