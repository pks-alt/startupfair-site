import type { Metadata } from "next";
import { StartupFairPage } from "@/components/startupfair-page";
export const metadata: Metadata = { title: "Page Not Found | StartupFair", robots: { index: false, follow: false } };
export default function NotFound() { return <StartupFairPage page="__not-found__" />; }
