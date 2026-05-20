"use client";

import PostCard from "./PostCard";

const posts = [
  {
    id: 1,
    avatarText: "Y",
    avatarBg: "#cc0000",
    name: "Y Combinator",
    handle: "@ycombinator",
    time: "5h",
    verified: true,
    isAd: false,
    content:
      "Clicky is the simplest interface in the world to spawn agents.\n\nIt can see your screen, answer questions, make Notion docs, check your Google Calendar, create Linear tickets, and a whole lot more.\n\n0 setup, built for consumers.\n\nTry for free, download: @heyclicky.",
    mention: "@heyclicky",
    mediaUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1280&h=720&fit=crop&q=80",
    mediaAlt: "Clicky AI agent interface demo",
    mediaAspect: "16:9" as const,
    stats: { comments: "234", reposts: "1.2K", likes: "4.8K", views: "89.2K" },
  },
  {
    id: 2,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    name: "Pulkit",
    handle: "@pulkit5D",
    time: "2h",
    verified: false,
    isAd: true,
    content:
      "Why juggle 5 apps when BuyHatke spots the cheapest deal in seconds?\n\nSame Tata Coffee: ₹130 on Flipkart Minutes vs ₹151 on Blinkit\n\n₹21 saved on just one pack. Now picture your full cart\n\nBuyHatke > endless app switching",
    productCard: {
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=200&h=200&fit=crop",
      name: "Tata Coffee Grand Instant Coffee",
      description: "50g Jar | Rich Aroma",
      price: "₹130",
      originalPrice: "₹151",
    },
    stats: { comments: "45", reposts: "128", likes: "912", views: "24.4K" },
  },
  {
    id: 3,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    name: "Sarah Chen",
    handle: "@sarahchen",
    time: "4h",
    verified: true,
    isAd: false,
    content:
      "Just shipped our new AI-powered onboarding flow. Reduced time-to-value from 3 days to 20 minutes. The secret? Letting the AI ask the right questions instead of showing a 40-step checklist.\n\nThread on what we learned 👇",
    mediaUrl: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=720&h=720&fit=crop&q=80",
    mediaAlt: "Onboarding flow",
    mediaAspect: "1:1" as const,
    stats: { comments: "312", reposts: "2.1K", likes: "8.4K", views: "142K" },
  },
  {
    id: 4,
    avatarText: "A",
    avatarBg: "#7c3aed",
    name: "Andreessen Horowitz",
    handle: "@a16z",
    time: "6h",
    verified: true,
    isAd: false,
    content:
      "The next wave of AI startups won't be building models — they'll be building the infrastructure, workflows, and distribution layers on top of them.\n\nWe're actively looking for founders working in this space.",
    mediaUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=720&h=1280&fit=crop&q=80",
    mediaAlt: "AI infrastructure",
    mediaAspect: "9:16" as const,
    stats: { comments: "891", reposts: "5.6K", likes: "22.1K", views: "310K" },
  },
  {
    id: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    name: "Rohan Mehta",
    handle: "@rohanbuilds",
    time: "8h",
    verified: false,
    isAd: false,
    content:
      "Hot take: Most B2B SaaS companies are leaving 40% of revenue on the table by not having a proper expansion motion.\n\nAcquisition is expensive. Expansion is cheap. Yet everyone obsesses over top-of-funnel.",
    stats: { comments: "156", reposts: "987", likes: "3.2K", views: "67K" },
  },
];

export default function Feed() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          avatar={post.avatar || ""}
          avatarBg={post.avatarBg}
          avatarText={post.avatarText}
          name={post.name}
          handle={post.handle}
          time={post.time}
          verified={post.verified}
          isAd={post.isAd}
          content={post.content}
          mention={post.mention}
          mediaUrl={post.mediaUrl}
          mediaAlt={post.mediaAlt}
          mediaAspect={post.mediaAspect}
          productCard={post.productCard}
          stats={post.stats}
        />
      ))}

      <div
        style={{
          padding: "32px 16px",
          textAlign: "center",
          color: "var(--text-muted)",
          fontSize: "14px",
        }}
      >
        you are all caught up
      </div>
    </div>
  );
}
