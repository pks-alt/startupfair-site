import type { Metadata } from "next";
import { GlobalTalentQualificationPage } from "@/components/global-challenge-programs";

export const metadata: Metadata = {
  title: "Talent Challenge Qualification | StartupFair",
  description: "Complete the initial qualification for StartupFair's Global AI & Software Talent Challenge.",
};

export default function Page() {
  return <GlobalTalentQualificationPage />;
}
