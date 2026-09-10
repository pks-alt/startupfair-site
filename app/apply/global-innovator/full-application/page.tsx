import type { Metadata } from "next";
import { GlobalInnovatorFullApplicationPage } from "@/components/global-challenge-programs";

export const metadata: Metadata = {
  title: "Innovator Challenge Full Application | StartupFair",
  description: "Complete the full application for StartupFair's Global Innovator Challenge.",
};

export default function Page() {
  return <GlobalInnovatorFullApplicationPage />;
}
