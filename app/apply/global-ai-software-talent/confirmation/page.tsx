import type { Metadata } from "next";
import { GlobalProgramConfirmationPage } from "@/components/global-challenge-programs";

export const metadata: Metadata = {
  title: "Talent Application Confirmation | StartupFair",
  description: "StartupFair Global AI & Software Talent Challenge application confirmation.",
};

export default function Page() {
  return <GlobalProgramConfirmationPage program="talent" />;
}
