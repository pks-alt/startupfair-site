import { headers } from "next/headers";
import { StartupFairApprovedHome } from "@/components/startupfair-approved-home";
import { SeoStructuredData } from "@/components/seo-structured-data";
import { metadataFor } from "@/lib/seo";

export async function generateMetadata() {
  const requestHeaders = await headers();
  return metadataFor("/", requestHeaders.get("host") ?? "");
}

export default function Home() {
  return <><SeoStructuredData path="/" /><StartupFairApprovedHome /></>;
}
