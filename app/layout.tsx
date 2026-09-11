import type { Metadata } from "next";
import { ReliableNavigation } from "@/components/reliable-navigation";
import "./globals.css";
import "./home-review.css";
import "./inquiry-fix.css";
import "./about-history.css";
import "./public-template.css";
import "./review-gallery.css";
import "./launch-polish.css";
import "./global-programs.css";
import "./approved-home.css";
import "./platform.css";

export const metadata: Metadata = {
  title: "StartupFair | AI Talent & Innovation Challenges",
  description: "Explore practical AI talent and innovation challenges with StartupFair.",
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ReliableNavigation />
        {children}
      </body>
    </html>
  );
}
