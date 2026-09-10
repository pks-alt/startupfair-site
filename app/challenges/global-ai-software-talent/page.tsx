import type { Metadata } from "next";
import { GlobalTalentChallengePage } from "@/components/global-challenge-programs";

export const metadata: Metadata = {
  title: "Global AI & Software Talent Challenge | StartupFair",
  description: "A selective 7-day global challenge for AI and software developers to demonstrate practical capability and create pathways to recognition and opportunity.",
};

export default function Page() {
  return <GlobalTalentChallengePage />;
}
