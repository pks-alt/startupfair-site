import type { Metadata } from "next";
import { GlobalProgramConfirmationPage } from "@/components/global-challenge-programs";

export const metadata: Metadata = {
  title: "Innovator Application Confirmation | StartupFair",
  description: "StartupFair Global Innovator Challenge application confirmation.",
};

export default function Page() {
  return <GlobalProgramConfirmationPage program="innovator" />;
}
