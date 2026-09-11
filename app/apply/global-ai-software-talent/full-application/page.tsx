import type { Metadata } from "next";
import { GlobalTalentFullApplicationPage } from "@/components/global-challenge-programs";

export const metadata: Metadata = {
  title: "Talent Challenge Full Application | StartupFair",
  description: "Complete the full application for StartupFair's Global AI & Software Talent Challenge.",
};

export default function Page() {
  return <GlobalTalentFullApplicationPage />;
}
