import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BIP",
  description: "BIP - Social Feed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full" style={{ background: "#0d0d0d", color: "#e7e9ea" }}>
        {children}
      </body>
    </html>
  );
}
