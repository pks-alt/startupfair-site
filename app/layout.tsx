import type { Metadata } from "next";
import { ReliableNavigation } from "@/components/reliable-navigation";
import "./globals.css";
import "./home-review.css";
import "./inquiry-fix.css";
import "./about-history.css";
import "./public-template.css";
import "./review-gallery.css";

export const metadata: Metadata = {
  title: "StartupFair — AI Talent & Open Innovation",
  description: "Click-through website prototype for StartupFair.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ReliableNavigation />
        {children}
      </body>
    </html>
  );
}
