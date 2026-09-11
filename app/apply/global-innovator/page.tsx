import type { Metadata } from "next";
import { GlobalInnovatorQualificationPage } from "@/components/global-challenge-programs";

export const metadata: Metadata = {
  title: "Innovator Challenge Qualification | StartupFair",
  description: "Complete the initial qualification for StartupFair's Global Innovator Challenge.",
};

export default function Page() {
  return <GlobalInnovatorQualificationPage />;
}
