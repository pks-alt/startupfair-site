import { headers } from "next/headers";
import { StartupFairPage } from "@/components/startupfair-page";
import { SeoStructuredData } from "@/components/seo-structured-data";
import { metadataFor } from "@/lib/seo";
export async function generateMetadata() {
  const requestHeaders = await headers();
  return metadataFor("/", requestHeaders.get("host") ?? "");
}
export default function Home() {
  return <><SeoStructuredData path="/" /><StartupFairPage page="home" /></>;
}
