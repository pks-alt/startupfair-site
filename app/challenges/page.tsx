import type { Metadata } from "next";
import { GlobalChallengesDirectoryPage } from "@/components/global-challenge-programs";

export const metadata: Metadata = {
  title: "Global Challenges | StartupFair",
  description: "Explore StartupFair's recurring Global AI & Software Talent Challenge, Global Innovator Challenge, and specialized AI challenge programs.",
};

export default function Page() {
  return <GlobalChallengesDirectoryPage />;
}
