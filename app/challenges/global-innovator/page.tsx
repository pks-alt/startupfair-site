import type { Metadata } from "next";
import { GlobalInnovatorChallengePage } from "@/components/global-challenge-programs";

export const metadata: Metadata = {
  title: "Global Innovator Challenge | StartupFair",
  description: "A selective 7-day global challenge for original AI-enabled and technology-driven ideas, products and startups across industries.",
};

export default function Page() {
  return <GlobalInnovatorChallengePage />;
}
